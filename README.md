# Braccio Robotic Arm Controller

![Braccio Robotic Arm](images/braccio.png)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
  - [Running the Web Interface (Three.js)](#running-the-web-interface-threejs)
  - [Controlling the Arm via Spring Boot](#controlling-the-arm-via-raspberry-pi-optional)
  - [Controlling the Arm via Raspberry Pi (Optional)](#controlling-the-arm-via-raspberry-pi-optional)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Braccio Robotic Arm Controller is a project designed to control a robotic arm using various technologies, including Three.js for the web-based interface and Spring Boot for backend communication. It optionally supports Raspberry Pi for Wireless Control using Python and MQTT.

![Braccio Robotic Arm](images/braccio.gif)

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
   ```bash
   git clone https://github.com/your-username/braccio-robotic-arm.git
 2. **Web Interface (Three.js):**
 - Navigate to the web-interface directory.
 - Install dependencies:
```bash
  cd Frontend
  npm install
```
 - Start the web interface using Vite:
```bash
npx vite
```
3. **Spring Boot Server:**

 - Navigate to the selected Backend (Spring Boot) directory
 - Build and run the Spring Boot application using your preferred IDE or the command line.

4. **MQTT Broker: (Optional)**
   
 - İnstall MQTT Broker (preferably Mosquitto)
 - set MQTT Broker ports in Backend and mqtpi.py files to your ports
   
5. **Raspberry pi: (Optional)**
 - Make sure you have Python installed
 - install Mosquitto to your Raspberry pi
 ```bash
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl enable mosquitto.service
```
 - Check if Mosquitto is installed
 ```bash
mosquitto -v
```
 - Load mqtpi.py script to your Raspberry pi

6. **Arduino:**
 - Load #TBD sketch into your Arduino (library by Stefan G is required -> https://github.com/stefangs/arduino-library-braccio-robot)
 - (Optional) Connect your Raspberry Pi to your Arduino via USB Serial Cable
 - Connect your Arduino to Braccio Shield

## Usage
### Running the Web Interface (Three.js)
1. Open a web browser and access the web interface 
2. Use the web interface to control the robotic arm in a 3D environment. You can move, rotate, and manipulate the arm using the on-screen controls.

### Controlling the Arm via Spring Boot
1. Navigate to the selected Backend (Spring Boot) directory
2. Edit Config class for your serial settings

       protected static @Getter @Setter String windowsSerialString = "YOUR COM SETTINGS";
       protected static @Getter @Setter String linuxSerialString = " YOUR SERIAL SETTINGS";
       protected static @Getter @Setter String baudRate = "115200";

4. Build and run the Spring Boot application using your preferred IDE or the command line.

### Controlling the Arm via Raspberry Pi (Optional)
1. (Optional) Ensure your Raspberry Pi, Arduino and Braccio robotic arm are properly connected.
2. (Optional) SSH into your Raspberry Pi.
3. (Optional) Navigate to the raspberry-pi directory.
4. (Optional) Run the Python script to control the robotic arm:

```bash
python control_arm.py BROKER_IP_ADRESS TIMEOUT_SECS
```

## Contributing
Feel free to open issues, submit pull requests, or suggest improvements.

## License
This project is licensed under the Do What The F*ck You Want To Public License

Thank you for your interest in the Braccio Robotic Arm Controller project. I hope this readme provides you with the necessary information to get started.
