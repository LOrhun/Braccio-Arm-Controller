package com.braccio_controller.braccio_controller.components;


import org.slf4j.Logger;

import java.util.UUID;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.braccio_controller.braccio_controller.controller.MQTT_Config;

@Component
public class MQTT_Publish extends MQTT_Config implements MqttCallback{

    protected Logger logger = LoggerFactory.getLogger(MQTT_Publish.class);

    private String broker_URL = null;
    final private String client_ID = UUID.randomUUID().toString();

    private MqttClient MQTT_Client = null;
    private MqttConnectOptions connectionOptions = null;
    private MemoryPersistence persistence = null;
    
    private MQTT_Publish() {
        this.config();
    }
    private MQTT_Publish(String broker, Integer port) {
        this.config(broker, port);
    }
    public static MQTT_Publish getInstance() {
        return new MQTT_Publish();
    }
    public static MQTT_Publish getInstance(String broker, Integer port) {
        return new MQTT_Publish(broker, port);
    }

    @Override
    public void connectionLost(Throwable cause) {
        logger.error("Connection Lost", cause);
        this.config();
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        logger.error("Message Arrived? HOW");
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {
        logger.info("Delivered Message");
    }

    @Override
    protected void config(String broker, Integer port) {
        this.broker = broker;
        this.port = port;

        this.config();
    }

    @Override
    protected void config() {
        logger.debug("Inside default config");
        this.broker_URL = this.TCP + this.broker + ":" + this.port;
        this.persistence = new MemoryPersistence();
        this.connectionOptions = new MqttConnectOptions();

        try {
            this.MQTT_Client = new MqttClient(broker_URL, client_ID, persistence);
            this.connectionOptions.setCleanSession(true);

            this.MQTT_Client.connect(connectionOptions);
            this.MQTT_Client.setCallback(this);
        } catch (Exception e) {
            logger.error("MQTT Failled to connect to broker", e);
        }
    }

    public void publishMessage(String topic, String message) {

        try {
            MqttMessage mqttmessage = new MqttMessage(message.getBytes());
            mqttmessage.setQos(this.qos);
            mqttmessage.setRetained(false);
            this.MQTT_Client.publish(topic, mqttmessage);
        } catch (MqttException me) {
            logger.error("ERROR", me);
        }
        return;
    }

    public void disconnect() {
        try {
            this.MQTT_Client.disconnect();
        } catch (MqttException me) {
            logger.error("ERROR", me);
        }
    }
    
}
