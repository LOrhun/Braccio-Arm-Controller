package com.braccio_controller.braccio_controller.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.braccio_controller.braccio_controller.Services.SerialCommunication;

import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/api")
public class Controller {
    
    private SerialCommunication serialCommunication;

    @PostConstruct
    private void init(){    //
        serialCommunication = new SerialCommunication();
        serialCommunication.init();
    }

    @PostMapping("/send")
    @ResponseBody
    public String move(@RequestParam("msg") String msg) {
        serialCommunication.sendMessage(msg);
        return "sent";
    }
}
