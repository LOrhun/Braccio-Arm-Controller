package com.braccio_controller.braccio_controller;

import lombok.Getter;
import lombok.Setter;

public class Config {
    protected static @Getter @Setter String windowsSerialString = "COM3";
    protected static @Getter @Setter String linuxSerialString = "/dev/tty.usbmodem14101";
    protected static @Getter @Setter String baudRate = "9600";
}
