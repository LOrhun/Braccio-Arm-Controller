package com.braccio_controller.braccio_controller.controller;

public abstract class MQTT_Config {
    public String broker = "192.168.1.110";
    public Integer port = 1883;
    protected final Integer qos = 1;
    protected Boolean hasSSL = false; /*By default SSL is disabled */
    protected final String TCP = "tcp://";
    protected final String SSL = "ssl://";

    protected abstract void config(String broker, Integer port);
    protected abstract void config();
}
