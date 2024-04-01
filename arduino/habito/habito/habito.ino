#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

const char* SSID = "Bukan WiFi Gratis";
const char* PASS = "langsungconnect";
String idDevice = "habito_001"; //change this based on the device id
//String url = "https://habito-api.vercel.app"; //this is the API url
const char* url = "http://192.168.219.98:80/habito-api/index.php";

void setup() {  
  Serial.begin(115200);
  delay(5000);
  connectWiFi(); //function to connect WiFi
//  regDevice(); //function to register device when device start
//  logs(); //function to change device status (online)
}
void loop() {
//  if (WiFi.status() == WL_CONNECTED) {
//    
//    online(); //this function makes device always online, it called heartbeat function
//
//    //start to change light status
//    String color = "green"; //change the color
//    light(color);
//    //end
//    
//  } else {
//     connectWiFi(); //if device disconnected from interner, it will reconnect
//    }
//  delay(1000);

if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure();
    HTTPClient http;
    http.begin(client, url);

    int httpCode = http.GET();
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload);
    } else {
      Serial.println("Error on HTTP request");
    }
    
    http.end();
  }

  delay(5000);
}


//just copy paste all functions below and you just call the function that you need
void connectWiFi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(SSID);
  WiFi.begin(SSID, PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP()); 
}
//
//void logs() {
//  IPAddress ipAddress = WiFi.localIP();
//  String ip = ipAddress.toString();
//  
//  StaticJsonDocument<200> jsonDoc;
//  jsonDoc["id"] = idDevice;
//  jsonDoc["ip"] = ip;
//  jsonDoc["ssid"] = SSID;
//
//  // Serialize the JSON document to a string
//  String jsonString;
//  serializeJson(jsonDoc, jsonString);
//  
//    WiFiClientSecure client;
//    client.setInsecure();
//
//    HTTPClient https;
//
//    String endpoint = "/logs";
//    String query = "?id=";
//
//    String fullUrl = url + endpoint;
//    
//    Serial.print("Requesting: ");
//    Serial.println(fullUrl);
//    
//    if (https.begin(client, fullUrl)) {
//      https.addHeader("Content-Type", "application/json");
//        int httpCode = https.POST(jsonString);
//        Serial.print("HTTP Response Code: ");
//        Serial.println(httpCode);
//        if (httpCode > 0) {
//          DynamicJsonDocument doc(1024);
//          deserializeJson(doc, https.getString());
//          String message = doc["message"];
//          
//            Serial.println("Response Body: ");
//            Serial.println(message);
//        }
//        https.end();
//    } else {
//        Serial.println("[HTTPS] Unable to connect");
//    }
//}
//
//bool online() {
//  IPAddress ipAddress = WiFi.localIP();
//  String ip = ipAddress.toString();
//  
//  StaticJsonDocument<200> jsonDoc;
//  jsonDoc["id"] = idDevice;
//  jsonDoc["ip"] = ip;
//  jsonDoc["ssid"] = SSID;
//
//  // Serialize the JSON document to a string
//  String jsonString;
//  serializeJson(jsonDoc, jsonString);
//  
//    WiFiClientSecure client;
//    client.setInsecure();
//
//    HTTPClient https;
//    String endpoint = "/keep-online";
//
//    String fullUrl = url + endpoint;
//
//    Serial.print("Requesting: ");
//    Serial.println(fullUrl);
//
//    if (https.begin(client, fullUrl)) {
//      https.addHeader("Content-Type", "application/json");
//        int httpCode = https.POST(jsonString);
//        Serial.print("HTTP Response Code: ");
//        Serial.println(httpCode);
//        
//          DynamicJsonDocument doc(1024);
//          deserializeJson(doc, https.getString());
//          bool deviceStatus = doc["message"];
//          
//        if (httpCode > 0) {
//            Serial.println("Response Body: ");
//            Serial.println(deviceStatus);
//        }
//        https.end();
//
//        return deviceStatus;
//    } else {
//        Serial.println("[HTTPS] Unable to connect");
//        return "Unable to connect";
//    }
//}
//
//String regDevice(){
//  StaticJsonDocument<200> jsonDoc;
//  jsonDoc["id"] = idDevice;
//
//  // Serialize the JSON document to a string
//  String jsonString;
//  serializeJson(jsonDoc, jsonString);
//  
//    WiFiClientSecure client;
//    client.setInsecure();
//
//    HTTPClient https;
//    String endpoint = "/register";
//    String query = "?id=";
//
//    String fullUrl = url + endpoint;
//
//    Serial.print("Requesting: ");
//    Serial.println(fullUrl);
//
//    if (https.begin(client, fullUrl)) {
//      https.addHeader("Content-Type", "application/json");
//        int httpCode = https.POST(jsonString);
//        Serial.print("HTTP Response Code: ");
//        Serial.println(httpCode);
//        
//          DynamicJsonDocument doc(1024);
//          deserializeJson(doc, https.getString());
//          String message = doc["message"];
//          
//        if (httpCode > 0) {
//            Serial.println("Response Body: ");
//            Serial.println(message);
//        }
//        https.end();
//
//        return message;
//    } else {
//        Serial.println("[HTTPS] Unable to connect");
//        return "Unable to connect";
//    }
//}
//
//void light(String color){
//  WiFiClientSecure client;
//  client.setInsecure();
//
//  HTTPClient https;
//  String endpoint = "/light";
//  String light = "&light=";
//  String query = "?id=";
//  
//  String fullUrl = url + endpoint + query + idDevice + light + color;
//   
//  Serial.print("Requesting: ");
//  Serial.println(fullUrl);
//  
//  if (https.begin(client, fullUrl)) {
//    int httpCode = https.GET();
//    Serial.print("HTTP Response Code: ");
//    Serial.println(httpCode);
//    if (httpCode > 0) {
//      DynamicJsonDocument doc(1024);
//      deserializeJson(doc, https.getString());
//      String message = doc["message"];
//        Serial.println("Response Body: ");
//        Serial.println(message);
//    }
//    https.end();
//  } else {
//      Serial.println("[HTTPS] Unable to connect");
//  }
//}
