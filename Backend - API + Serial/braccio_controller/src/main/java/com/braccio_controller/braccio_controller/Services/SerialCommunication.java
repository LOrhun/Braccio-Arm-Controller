package com.braccio_controller.braccio_controller.Services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.braccio_controller.braccio_controller.Config;
import com.fazecast.jSerialComm.SerialPort;

@Service
public class SerialCommunication {
    
    private Logger logger = LogManager.getLogger(SerialCommunication.class);

    private String serialString;
    private String baudRate;
    private SerialPort currPort;

    /**
     * This constructor initializes the serial communication service,
     * Before using this service make sure to call init() method <p>
     * check if the setting in the config class are correct before starting, serial port is connected
     * and serial port is not obstructed by any other program (like arduino IDE)
     */
    public SerialCommunication(){
        logger.info("Serial Communication Service Started");
        if (System.getProperty("os.name").toLowerCase().contains("windows")) {
            this.serialString = Config.getWindowsSerialString();
        } else {
            this.serialString = Config.getLinuxSerialString();
        }

        this.baudRate = Config.getBaudRate();
        logger.info("Current Serial Settings are Serial: " + serialString + " -> " + baudRate);
    }

    /**
     * This method initializes the serial port and opens it
     */
    public void init(){
        try {
            this.currPort = SerialPort.getCommPort(this.serialString);
            this.currPort.setBaudRate(Integer.parseInt(this.baudRate));
        } catch (Exception e) {
            logger.error("Failed to initialize serial port! ", e.getMessage());
        }

        this.currPort.openPort();
        if(this.currPort.isOpen()){
            logger.info("Selected Port is opened!");
        }
        else {
            logger.error("Failed to open selected serial port");
        }
    }

    /**
     * This method sends the message to the serial port
     * @param msg -> the message to be sent
     */
    public void sendMessage(String msg){
        SerialWriter writer = new SerialWriter(this.currPort);
        writer.run(msg);
    }

}
