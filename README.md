# Braccio Robotic Arm Controller

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
  - [Running with Web Interface (Three.js)](#running-with-web-interface-threejs)
  - [Controlling the Arm via Spring Boot](#controlling-the-arm-via-spring-boot)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Braccio Robotic Arm Controller is a project designed to control a robotic arm using various technologies, including Three.js for the web-based interface and Spring Boot for backend communication. It optionally supports Raspberry Pi for Wireless Control using Python and MQTT.

## Features
- Web-based control interface powered by Three.js, allowing you to visualize and control the robotic arm in a 3D environment.
- Backend server built with Spring Boot, communicating with arduino via serial connection
- (optional) Backend server built with Spring Boot, facilitating communication between the web interface and the Raspberry Pi.
- (optional) Raspberry Pi integration for controlling the physical Braccio robotic arm using Python and MQTT.
- (optional) MQTT messaging for real-time communication between components.
- A flexible and modular architecture for easy expansion and customization.

## Prerequisites
Before getting started, ensure you have the following prerequisites in place:

- A Braccio robotic arm kit
- A computer (for web interface control)
- (Optional) A Raspberry Pi (Wireless Controll)
- Java Development Kit (JDK)
- Node.js and npm
- (Optional) Python 3
- (Optional) MQTT broker (preferably Mosquitto)
 
## Setup
1. **Clone the Repository:**
   
       git clone https://github.com/your-username/braccio-robotic-arm.git
 3. **Web Interface (Three.js):**
 - Navigate to the web-interface directory.
 - Install dependencies:

        cd Frontend
        npm install

 - Start the web interface using Vite:

        npx vite

3. **Spring Boot Server:**

 - Navigate to the selected Backend (Spring Boot) directory
 - Build and run the Spring Boot application using your preferred IDE or the command line.

4. **MQTT Broker: (Optional)**
   
 - İnstall MQTT Broker (preferably Mosquitto)
 - set MQTT Broker ports in Backend and mqtpi.py files to your ports
   
5. **Raspberry pi: (Optional)**
 - Make sure you have Python installed
 - install Mosquitto to your Raspberry pi

        sudo apt install -y mosquitto mosquitto-clients
        sudo systemctl enable mosquitto.service

 - Check if Mosquitto is installed

        mosquitto -v

 - İnstall Python MQTT Client Library

        pip install paho-mqtt

 - Load mqtpi.py script to your Raspberry pi

6. **Arduino:**
 - Load Arduino.ino sketch into your Arduino (library by Stefan G is required -> https://github.com/stefangs/arduino-library-braccio-robot)
 - (Optional) Connect your Raspberry Pi to your Arduino via USB Serial Cable
 - Connect your Arduino to Braccio Shield

## Usage
### Running with Web Interface (Three.js)
1. Open a web browser and start vite
2. Start MQTT Broker on your pc with broker ip and test config. Open command prompt in main directory and execute following command

       mosquitto -h YOUR_IP -c .\test.config

3. Start Spring Boot API version
4. Run mqtpi.py on your Raspberry pi

        python control_arm.py YOUR_IP TIMEOUT_SECS

5. Use the web interface to control the robotic arm in a 3D environment. You can move, rotate, and manipulate the arm using the on-screen controls.

### Controlling the Arm via Spring Boot
1. Navigate to the selected Backend (Spring Boot) directory
2. Edit Config class for your serial settings

       protected static @Getter @Setter String windowsSerialString = "YOUR COM SETTINGS";
       protected static @Getter @Setter String linuxSerialString = " YOUR SERIAL SETTINGS";
       protected static @Getter @Setter String baudRate = "115200";

3. Build and run the Spring Boot application using your preferred IDE or the command line.
4. Spring boot api will directly send post parameters via serial connection to Arduino without parsing it. Make sure commands are proper.


## Contributing
Feel free to open issues, submit pull requests, or suggest improvements.

## License
This project is licensed under the MIT License

Thank you for your interest in the Braccio Robotic Arm Controller project. I hope this readme provides you with the necessary information to get started.
