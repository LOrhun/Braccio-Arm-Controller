package com.braccio_controller.braccio_controller.Services;

import org.apache.logging.log4j.Logger;

import com.fazecast.jSerialComm.SerialPort;
import org.apache.logging.log4j.LogManager;

public class SerialWriter implements Runnable {

    private byte[] buffer;
    private SerialPort port;
    private Logger logger = LogManager.getLogger(SerialWriter.class);

    public SerialWriter(SerialPort port){
        this.port = port;
    }


    /**
     * This method should not be used instead use run(String msg)obstructed
     */
    @Deprecated
    public void run(){
        return;
    }

    /**
     * This method is used to send data to the serial port and should be used instead of run(),
     * this method works on a different thread to prevent blocking the main thread with sleep() calls
     * @param msg
     */
    public void run(String msg){
        sendData(msg);
        return;
    }

    private void sendData(String msg){
        if (this.port.isOpen()) {
            try {
                buffer = msg.getBytes();
                this.port.writeBytes(buffer, buffer.length);
                logger.info("Sent: " + msg);

                // This is a test code to check if the data is sent correctly
                // Reads the data from the serial port and prints it
                // Use arduino serial read/write code to test this
                // Arduino code: https://www.javatpoint.com/arduino-serial-read-and-serial-write
                // Second paragraph under 

                // this.port.readBytes(buffer, 0, 0);
                // String received = new String(buffer);
                // logger.info("Received: " + received);

            } catch (Exception e) {
                logger.error("Failed to send data! ", e.getMessage());
                return;
            }

            try {
                Thread.sleep(200);
            } catch (Exception e) {
                logger.error("Failed to sleep thread! ", e.getMessage());
            }
        } else {
            logger.error("Port is not open!");
        }
    }
    
}
