import sys
import serial

from paho.mqtt import client as MQTTClient
from multiprocessing import Process, Pipe
from time import sleep

#MQTT Settings
MQTT_Broker = sys.argv[1]
MQTT_Port = 1883
MQTT_Topic = "test"
MQTT_Client_ID = "10"

#Serial Globals
serial_connection = serial.Serial('/dev/ttyUSB0', 115200, timeout=int(sys.argv[2]))
orderqueue = []

class sendableData:
    m1 = int
    m2 = int
    m3 = int
    m4 = int
    m5 = int
    gripper = False

datatosend = sendableData
for arg in sys.argv:
    if arg == "-d" or arg == "-debug":
        debugFlag = True
        break
    debugFlag = False


#Connect to MQTT Broker
def mqtt_connect() -> MQTTClient:
    def on_connect(client, userdata, flags, rc):
        if rc == 0: #MQTT Connected
            if debugFlag: print("MAIN: Connected to MQTT Broker")
        else:       #MQTT Connection Failed
            if debugFlag: print("Failed to connect, return code %d\n"%(rc))

    client = MQTTClient.Client(MQTT_Client_ID)
    client.on_connect = on_connect
    client.connect(MQTT_Broker, MQTT_Port)
    return client

#Subscribe to MQTT Broker
def mqtt_subscribe(client:MQTTClient, pipe:Pipe):
    def on_message(client, userdata, msg):
        if debugFlag: print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        orderqueue = msg.payload.decode().split('\n')
        pipe.send(orderqueue)

    client.subscribe(MQTT_Topic)
    client.on_message = on_message


#sends data to arduino in another process
def childProcess_sendSerial(pipe:Pipe, debugFlag:bool, serial_connection:serial.Serial):
    childProcess_continue = True
    setSpeed = int
    if debugFlag: print("CHILD:Waiting for Pipe")
    while childProcess_continue:
        while pipe.poll() is False:
            sleep(0.25)
        
        recived = pipe.recv()
        if debugFlag: print("CHILD:Recived data %s"%(recived))
        
        if type(recived) is bool and recived is False:  #Recived a kill Request, kill the child
            childProcess_continue = False
            if debugFlag: print("CHILD:Child Recived kill request, killing the child")
        
        if type(recived) is list:   #Recived orderqueue, parsing it as data
            for element in recived:
                if "pre_speed" in element:  #set speed
                    setSpeed = 100 if element.split()[1] == "3" else (66 if element.split()[1] == "2" else 33)
    
                if "m" in element:
                    if element[slice(1,2)] == "1":
                        datatosend.m1 = element.split()[1]
                    if element[slice(1,2)] == "2":
                        datatosend.m2 = element.split()[1]
                    if element[slice(1,2)] == "3":
                        datatosend.m3 = element.split()[1]
                    if element[slice(1,2)] == "4":
                        datatosend.m4 = element.split()[1]
                    if element[slice(1,2)] == "5":
                        datatosend.m5 = element.split()[1]
            
                if "grip" in element:   #Someone wants to hold something
                    datatosend.gripper = True if element.split()[1] == "1" else False
                if "END" in element:    #End of Order, send it
                    strsendit = (("m %s,%s,%s,%s,%s,%d,%d")%(datatosend.m1, datatosend.m2, datatosend.m3, datatosend.m4, datatosend.m5, (10 if datatosend.gripper else 73), setSpeed))
                    if debugFlag: print("CHILD:Sent Data to Arduino, Sent data is %s, Wish Arduino Luck!"%(strsendit))
                    serial_connection.write(bytes(strsendit, 'utf-8'))
                    answer = serial_connection.readline().decode('utf-8').rstrip()
                    if debugFlag: print("Arduino sent response %s"%(answer))
                    if "E" in answer:
                        print("ALERT: Error in Arduino side: %s"%(answer))
			#TODO Add preprogrammed orders to just be send by special serial command

                def altfunction(text:str):
                    serial_connection.write(bytes(text, 'utf-8'))
                    if debugFlag: print("CHILD:Sent Data to Arduino, Sent data is %s, Wish Arduino Luck!"%(text))
                    answer = serial_connection.readline().decode('utf-8').rstrip()
                    if debugFlag: print("Arduino sent response %s"%(answer))
                    if "E" in answer:
                        print("ALERT: Error in Arduino side: %s"%(answer))

                if "11111111" in element:   altfunction("1XXX")    #Start Braccio Arm
                if "00000000" in element:   altfunction("0XXX")    #Stop Braccio Arm
                if "home" in element:       altfunction("home")     #Set Braccio Arm to home position
                if "take" in element:       altfunction("take")     #Take the object
                if "put" in element:        altfunction("put")       #Drop the object
                if "and" in element:        altfunction("and")       #Grip the object

if __name__ == "__main__":
    if MQTT_Broker is None:
        print("ALERT: MQTT Broker is required. Correct usage is Broker, Topic, cliend_id and debug flag")
        exit()
    elif serial_connection is None:
        print("ALERT: Cannot establish serial connection")
        exit()
    
    parrent_pipe, child_pipe = Pipe()

    if debugFlag: print("MAIN: Creating Child Process for serial comminication!")

    childProcess = Process(target=childProcess_sendSerial, args=(child_pipe, debugFlag, serial_connection))
    childProcess.daemon = True
    childProcess.start()
    
    if debugFlag: print("MAIN: Connecting to MQTT Broker/Publisher, Damn")
    client = mqtt_connect()
    mqtt_subscribe(client, parrent_pipe)

    if debugFlag: print("MAIN: Entered MQTT client infinite loop, its all automated from now on")
    client.loop_forever()
