#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
const char* SSID = "NOLA 37G";
const char* PASS = "12345678";
String url = "https://habito-api.vercel.app";
//String url = "https://habito-api.vercel.app/newpost?data=new%20data%20from%20arduino";
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
    WiFiClientSecure client;
    
    client.setInsecure();
    
    HTTPClient https;

    String dataset = "habito_001";
    dataset.replace(" ", "%20");

    String endpoint = "/logs";
    String queryID = "?id=";
    
    String param = "?data=";
    
    String fullUrl = url + endpoint + queryID + dataset;
    Serial.println(" ");
    Serial.println("Requesting " + fullUrl);
    if (https.begin(client, fullUrl)) {
      int httpCode = https.GET();
      Serial.println("Respon : " + String(httpCode));
      if (httpCode > 0) {
        Serial.println(https.getString());
      }
      https.end();
    } else {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
  }
  delay(10000);
}