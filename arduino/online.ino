#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

const char* SSID = "NOLA 37G";
const char* PASS = "12345678";
String idDevice = "habito_001";
String url = "https://habito-api.vercel.app";

void setup() {  
  Serial.begin(115200);
  connectWiFi();
  regDevice();
  logs();
}
void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    online();
  } else {
     connectWiFi(); 
    }
  delay(1000);
}

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

void logs() {
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient https;
    //dataset.replace(" ", "%20");

    String endpoint = "/logs";
    String query = "?id=";

    String fullUrl = url + endpoint + query + idDevice;
    
    Serial.print("Requesting: ");
    Serial.println(fullUrl);
    
    if (https.begin(client, fullUrl)) {
        int httpCode = https.GET();
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
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient https;
    String endpoint = "/keep-online";
    String query = "?id=";

    String fullUrl = url + endpoint + query + idDevice;

    Serial.print("Requesting: ");
    Serial.println(fullUrl);

    if (https.begin(client, fullUrl)) {
        int httpCode = https.GET();
        Serial.print("HTTP Response Code: ");
        Serial.println(httpCode);
        
          DynamicJsonDocument doc(1024);
          deserializeJson(doc, https.getString());
          bool deviceStatus = doc["message"];
          
        if (httpCode > 0) {
            Serial.println("Response Body: ");
            Serial.println(deviceStatus);
        }
        https.end();

        return deviceStatus;
    } else {
        Serial.println("[HTTPS] Unable to connect");

        // Return a value to indicate an error, for example, -1
        return "Unable to connect";
    }
}

String regDevice(){
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient https;
    String endpoint = "/register";
    String query = "?id=";

    String fullUrl = url + endpoint + query + idDevice;

    Serial.print("Requesting: ");
    Serial.println(fullUrl);

    if (https.begin(client, fullUrl)) {
        int httpCode = https.GET();
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

        // Return a value to indicate an error, for example, -1
        return "Unable to connect";
    }
}