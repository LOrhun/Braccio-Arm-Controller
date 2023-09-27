package com.braccio_controller.braccio_controller.controller;

import org.springframework.web.bind.annotation.RestController;

import com.braccio_controller.braccio_controller.components.MQTT_Publish;

import jakarta.annotation.PostConstruct;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@RestController
@RequestMapping("/")
public class MainController {
    
    private Logger logger = org.slf4j.LoggerFactory.getLogger(MainController.class);

    @Autowired
    private MQTT_Publish publisher;

    @PostConstruct
    private void init(){
        publisher = MQTT_Publish.getInstance();
    }

    @PostMapping(value="/customsend/")
    @ResponseBody
    public ResponseEntity<String> getMethodName(@RequestParam("message") String message, @RequestParam("topic") String topic) {
        try {
            logger.info(topic + " \n" + message);
            publisher.publishMessage(topic, message);
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/start")
    @ResponseBody
    public ResponseEntity<String> start(@RequestParam("topic") String topic) {
        try {
            logger.info("Start");
            publisher.publishMessage(topic, "1111");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/stop")
    @ResponseBody
    public ResponseEntity<String> stop(@RequestParam("topic") String topic) {
        try {
            logger.info("Stop");
            publisher.publishMessage(topic, "0000");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }


    @PostMapping(value="/api/robotic-arm/move/base/80")
    @ResponseBody
    public ResponseEntity<String> moveBase80(@RequestParam("topic") String topic) {
        try {
            logger.info("Move Base 80");
            publisher.publishMessage(topic, "bb80");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/move/shoulder/80")
    @ResponseBody
    public ResponseEntity<String> moveShoulder80(@RequestParam("topic") String topic) {
        try {
            logger.info("Move Shoulder 80");
            publisher.publishMessage(topic, "sh80");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/move/elbow/80")
    @ResponseBody
    public ResponseEntity<String> moveElbow80(@RequestParam("topic") String topic) {
        try {
            logger.info("Move Elbow 80");
            publisher.publishMessage(topic, "el80");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/move/wristv/80")
    @ResponseBody
    public ResponseEntity<String> moveWristv80(@RequestParam("topic") String topic) {
        try {
            logger.info("Move Wristv 80");
            publisher.publishMessage(topic, "wv80");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/move/wristr/80")
    @ResponseBody
    public ResponseEntity<String> moveWristr80(@RequestParam("topic") String topic) {
        try {
            logger.info("Move Wristr 80");
            publisher.publishMessage(topic, "wr80");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/move/gripper/80")
    @ResponseBody
    public ResponseEntity<String> moveGripper80(@RequestParam("topic") String topic) {
        try {
            logger.info("Move Gripper 80");
            publisher.publishMessage(topic, "gr80");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/combined-move/initial-position")
    @ResponseBody
    public ResponseEntity<String> combinedMoveInitialPosition(@RequestParam("topic") String topic) {
        try {
            logger.info("Combined Move Initial Position");
            publisher.publishMessage(topic, "home");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/combined-move/take-object")
    @ResponseBody
    public ResponseEntity<String> combinedMoveTakeObject(@RequestParam("topic") String topic) {
        try {
            logger.info("Combined Move Take Object");
            publisher.publishMessage(topic, "take");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/combined-move/put-object")
    @ResponseBody
    public ResponseEntity<String> combinedMovePutObject(@RequestParam("topic") String topic) {
        try {
            logger.info("Combined Move Put Object");
            publisher.publishMessage(topic, "put");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }

    @PostMapping(value="/api/robotic-arm/combined-move/take-object-and-put")
    @ResponseBody
    public ResponseEntity<String> combinedMoveTakeObjectAndPut(@RequestParam("topic") String topic) {
        try {
            logger.info("Combined Move Take Object And Put");
            publisher.publishMessage(topic, "takeput");
            return ResponseEntity.ok("Message Sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Message Not Sent");
        }
    }
       
}
