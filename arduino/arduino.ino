#define BLYNK_TEMPLATE_ID "TMPL6WcoQd7pO"
#define BLYNK_TEMPLATE_NAME "Habito Blynk"
#define BLYNK_AUTH_TOKEN "EIFbZPYxMWEzQqq9VGSlo2PrIO_ZQGHa"
#define BLYNK_PRINT Serial


#include <ESP8266WiFi.h>
//#include <BlynkSimpleEsp8266.h>
#include "Wire.h"
//#include "PN532_I2C.h"
//#include "PN532.h"
#include <EEPROM.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>


char ssid[] = "NOLA 37G";
char pass[] = "12345678";
//char auth[] = BLYNK_AUTH_TOKEN;
String idDevice = "habito_001"; //change this based on the device id
String url = "https://habito-api.vercel.app"; //this is the API url

//PN532_I2C pn532i2c(Wire);
//PN532 nfc(pn532i2c);

String userRFID = "";

int led1 = D6; 
int led2 = D7;
int led3 = D5; 
int led4 = D8;

int address1 = 0;
int address2 = 1;
int address3 = 2;
int address4 = 3;

const int BUTTON_PIN = D3; 
const int SHORT_PRESS_TIME = 1000; 

// Variables will change:
int lastState = HIGH;
int currentState;
unsigned long pressedTime  = 0;
unsigned long releasedTime = 0;




//BlynkTimer timer;



// This function is called every time the device is connected to the Blynk.Cloud


// This function sends Arduino's uptime every second to Virtual Pin 2.



int LED1 = D5;
int LED2 = D6;
int LED3 = D7;
int LED4 = D8;
int buton = D3;







void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(LED1,OUTPUT);
  pinMode(LED2,OUTPUT);
  pinMode(LED3,OUTPUT);
  pinMode(LED4,OUTPUT);
  pinMode(buton,INPUT);
  EEPROM.begin(512);
//  nfc.begin();

//  uint32_t versiondata = nfc.getFirmwareVersion();
//  if (! versiondata) {
//    Serial.print("Didn't find PN53x board");
//    while (1); // halt
//  }
  // Got ok data, print it out!
//  Serial.print("Found chip PN5"); Serial.println((versiondata >> 24) & 0xFF, HEX);
//  Serial.print("Firmware ver. "); Serial.print((versiondata >> 16) & 0xFF, DEC);
//  Serial.print('.'); Serial.println((versiondata >> 8) & 0xFF, DEC);

  //  Non-blocking procedure
//  nfc.setPassiveActivationRetries(0x01);
 
  // configure board to read RFID tags
//  nfc.SAMConfig();

//  Serial.println("Waiting for an ISO14443A Card ...");


  pinMode(LED_BUILTIN,OUTPUT);
   WiFi.begin(ssid, pass);
//  Blynk.begin(auth, ssid, pass);
 
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print("."); 
    delay(500); 
  EEPROM.write(address1, 2);
  EEPROM.write(address2, 2);
  EEPROM.write(address3, 2);
  EEPROM.write(address4, 2);
  EEPROM.commit();
  ledsign(); 
  }
    Serial.println("Wifi Connected"); 
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    regDevice();
    logs();
    EEPROM.write(address1, 0);
  EEPROM.write(address2, 0);
  EEPROM.write(address3, 0);
  EEPROM.write(address4, 0);
  EEPROM.commit();
  ledsign();

}

unsigned long previousMillis = 0;

void loop() {
//  Blynk.run();
//  timer.run();
//  readRFID();


handleOnline();
handleButton();
  

}
//void readRFID(void)
//{
//  boolean success;
//  uint8_t uid[] = {0, 0, 0, 0, 0, 0, 0};
//  uint8_t uidLength;
//
//  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
//
//  if (success)
//  {
//    for (uint8_t i = 0; i < uidLength; i++)
//    {
//      if (uid[i] <= 0xF) {
//        userRFID += "0";
//      }
//      userRFID += String(uid[i] & 0xFF, HEX);
//    }
//    userRFID.toUpperCase();
//    Serial.println(userRFID);
//
//    if(userRFID == "BECE816E")
//    {
//      Blynk.virtualWrite(V0, ">:|");
//      Serial.println("kartu 1");
//      Blynk.logEvent("led","says red");
//      digitalWrite(led1,HIGH);
//      EEPROM.write(address1, 2);
//      EEPROM.commit();
//      delay(1000);
//      digitalWrite(led1,LOW);
//      //ledsign();
//    }
//    
//    if(userRFID == "BEE0806E")
//    {
//      Blynk.virtualWrite(V1, "YESSIR");
//      Serial.println("kartu 2");
//      Blynk.logEvent("led","says yellow");
//      digitalWrite(led2,HIGH);
//      EEPROM.write(address2, 2);
//       EEPROM.commit();
//      delay(1000);
//      digitalWrite(led2,LOW);
//     //ledsign(); 
//    }
//
//    if(userRFID == "6EF18B6E")
//    {
//      Blynk.virtualWrite(V2, "YESSIR");
//      Serial.println("kartu 3");
//      digitalWrite(led3,HIGH);
//      Blynk.logEvent("led","says green");
//      EEPROM.write(address3, 2);
//       EEPROM.commit();
//      delay(1000);
//      digitalWrite(led3,LOW);
//     //ledsign(); 
//    }
//
//    if(userRFID == "4E637F6E") 
//    {
//      Blynk.virtualWrite(V3, "YESSIR");
//      Blynk.logEvent("led","says blue");
//      Serial.println("kartu 4");
//      digitalWrite(led4,HIGH);
//      EEPROM.write(address4, 2);
//       EEPROM.commit();
//
//      delay(1000);
//      digitalWrite(led4,LOW);
//     //ledsign(); 
//    }
//
//    Serial.print( EEPROM.read(address1));
//    Serial.print( EEPROM.read(address2));
//    Serial.print( EEPROM.read(address3));
//    Serial.print( EEPROM.read(address4));
//    Serial.println("");
//
//    delay(400);
//    userRFID = "";
//  }
//}

void ledsign()
{
  if(EEPROM.read(address1) == 2)digitalWrite(led1,HIGH);
  if(EEPROM.read(address2) == 2)digitalWrite(led2,HIGH);
  if(EEPROM.read(address3) == 2)digitalWrite(led3,HIGH);
  if(EEPROM.read(address4) == 2)digitalWrite(led4,HIGH);

  Serial.print( EEPROM.read(address1));
  Serial.print( EEPROM.read(address2));
  Serial.print( EEPROM.read(address3));
  Serial.print( EEPROM.read(address4));
  
  Serial.println("");
  
  delay(1000);
  
  digitalWrite(led1,LOW);
  digitalWrite(led2,LOW);
  digitalWrite(led3,LOW);
  digitalWrite(led4,LOW);
  
}

String regDevice(){
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["id"] = idDevice;

  // Serialize the JSON document to a string
  String jsonString;
  serializeJson(jsonDoc, jsonString);
  
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient https;
    String endpoint = "/register";
    String query = "?id=";

    String fullUrl = url + endpoint;

    Serial.print("Requesting: ");
    Serial.println(fullUrl);

    if (https.begin(client, fullUrl)) {
      https.addHeader("Content-Type", "application/json");
        int httpCode = https.POST(jsonString);
        Serial.print("HTTP Response Code: ");
        Serial.println(httpCode);
        
          DynamicJsonDocument doc(1024);
          deserializeJson(doc, https.getString());
          String message = doc["message"];
          
        if (httpCode > 0) {
            Serial.println("Response Body: ");
            Serial.println(message);
        }
        https.end();

        return message;
    } else {
        Serial.println("[HTTPS] Unable to connect");
        return "Unable to connect";
    }
}

void logs() {
  IPAddress ipAddress = WiFi.localIP();
  String ip = ipAddress.toString();
  
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["id"] = idDevice;
  jsonDoc["ip"] = ip;
  jsonDoc["ssid"] = ssid;

  // Serialize the JSON document to a string
  String jsonString;
  serializeJson(jsonDoc, jsonString);
  
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient https;

    String endpoint = "/logs";
    String query = "?id=";

    String fullUrl = url + endpoint;
    
    Serial.print("Requesting: ");
    Serial.println(fullUrl);
    
    if (https.begin(client, fullUrl)) {
      https.addHeader("Content-Type", "application/json");
        int httpCode = https.POST(jsonString);
        Serial.print("HTTP Response Code: ");
        Serial.println(httpCode);
        if (httpCode > 0) {
          DynamicJsonDocument doc(1024);
          deserializeJson(doc, https.getString());
          String message = doc["message"];
          
            Serial.println("Response Body: ");
            Serial.println(message);
        }
        https.end();
    } else {
        Serial.println("[HTTPS] Unable to connect");
    }
}

bool online() {
  char ip[16]; // Menyimpan alamat IP sebagai string
  WiFi.localIP().toString().toCharArray(ip, 16); // Mendapatkan alamat IP dan mengonversinya menjadi string
  
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["id"] = idDevice;
  jsonDoc["ip"] = ip;
  jsonDoc["ssid"] = ssid;

  char jsonString[200]; // Buffer untuk menyimpan string JSON
  serializeJson(jsonDoc, jsonString, sizeof(jsonString)); // Serialisasi JSON

  WiFiClientSecure client;
  client.setInsecure();

  HTTPClient https;
  String endpoint = "/keep-online";

  String fullUrl = url + endpoint;

  Serial.print("Requesting: ");
  Serial.println(fullUrl);

  if (https.begin(client, fullUrl)) {
    https.addHeader("Content-Type", "application/json");
    int httpCode = https.POST(jsonString);
    Serial.print("HTTP Response Code: ");
    Serial.println(httpCode);
    
    bool deviceStatus = false; // Default status perangkat adalah false

    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_OK) {
        DynamicJsonDocument doc(1024);
        deserializeJson(doc, https.getString());
        deviceStatus = doc["message"];// Ambil status perangkat dari respons JSON
         EEPROM.write(address3, 2);
        EEPROM.commit();
        ledsign();
      }
    } else {
      EEPROM.write(address1, 2);
        EEPROM.commit();
         ledsign();
      Serial.println("Error: No response from server");
    }
    https.end();
        EEPROM.write(address3, 0);
        EEPROM.write(address1, 0);
        EEPROM.commit();
    return deviceStatus;
  } else {
    
    Serial.println("[HTTPS] Unable to connect");
    return false; // Kembalikan false jika tidak dapat terhubung
  }
}

void filterLight(){
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["id"] = idDevice;

  // Serialize the JSON document to a string
  String jsonString;
  serializeJson(jsonDoc, jsonString);
  
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient https;

    String endpoint = "/light-status";
    String query = "?id=";

    String fullUrl = url + endpoint;
    
    Serial.print("Requesting: ");
    Serial.println(fullUrl);
    
    if (https.begin(client, fullUrl)) {
      https.addHeader("Content-Type", "application/json");
        int httpCode = https.POST(jsonString);
        Serial.print("HTTP Response Code: ");
        Serial.println(httpCode);
        if (httpCode > 0) {
          DynamicJsonDocument doc(1024);
          deserializeJson(doc, https.getString());
            int redStatus = doc["red"]["status"].as<int>();
            int greenStatus = doc["green"]["status"].as<int>();
            int blueStatus = doc["blue"]["status"].as<int>();
            int yellowStatus = doc["yellow"]["status"].as<int>();
            Serial.print(redStatus);
            Serial.print(greenStatus);
            Serial.print(blueStatus);
            Serial.print(yellowStatus);
            if(redStatus == 1){
              EEPROM.write(address1, 2);
              EEPROM.commit();
            }
            if(yellowStatus == 1){
              EEPROM.write(address2, 2);
              EEPROM.commit();
            }
            if(greenStatus == 1){
              EEPROM.write(address3, 2);
              EEPROM.commit();
            }
            if(blueStatus == 1){
              EEPROM.write(address4, 2);
              EEPROM.commit();
            }
            Serial.println();
        }
        https.end();
    } else {
        Serial.println("[HTTPS] Unable to connect");
    }
}

void handleOnline(){
  unsigned long currentMillis = millis();
  if(currentMillis - previousMillis >= 10000){
    previousMillis = currentMillis;
    online();
  }
}

void handleButton(){
  currentState = digitalRead(BUTTON_PIN);
  if(lastState == HIGH && currentState == LOW)        // button is pressed
    pressedTime = millis();
  else if(lastState == LOW && currentState == HIGH) { // button is released
    releasedTime = millis();

    long pressDuration = releasedTime - pressedTime;

    if( pressDuration < SHORT_PRESS_TIME )
      { 
        EEPROM.write(address1, 2);
        EEPROM.write(address2, 2);
        EEPROM.write(address3, 2);
        EEPROM.write(address4, 2);
        EEPROM.commit();
        ledsign();
        EEPROM.write(address1, 0);
        EEPROM.write(address2, 0);
        EEPROM.write(address3, 0);
        EEPROM.write(address4, 0);
        EEPROM.commit();
        filterLight();
        Serial.println("A short press is detected");
        Serial.println("read Eeprom");
        ledsign();
        EEPROM.write(address1, 0);
        EEPROM.write(address2, 0);
        EEPROM.write(address3, 0);
        EEPROM.write(address4, 0);
        EEPROM.commit();
      }
    if( pressDuration > SHORT_PRESS_TIME )
      {
//        Blynk.virtualWrite(V0, "--");
//        Blynk.virtualWrite(V1, "--");
//        Blynk.virtualWrite(V2, "--");
//        Blynk.virtualWrite(V3, "--");
        Serial.println("A Long press is detected");
        Serial.println("Clear Eeprom");
        EEPROM.write(address1, 0);
        EEPROM.write(address2, 0);
        EEPROM.write(address3, 0);
        EEPROM.write(address4, 0);
         EEPROM.commit();
      }
  }

  // save the the last state
  lastState = currentState;

}
