#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

const char* SSID = "NOLA 37G";
const char* PASS = "12345678";
String url = "https://habito-api.vercel.app";
void setup() {
  
  Serial.begin(115200);
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
void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    if(checkStatus() == false){
      logs();
    }
  }
  delay(10000);
}

int logs() {
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient https;
    String dataset = "habito_001";
    dataset.replace(" ", "%20");

    String endpoint = "/logs";
    String query = "?id=";

    String fullUrl = url + endpoint + query + dataset;
    
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
    return 0;
}

bool checkStatus() {
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient https;
    String idDevice = "habito_001";
    String endpoint = "/cek";
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

