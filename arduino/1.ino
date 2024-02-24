#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

WiFiClient client;

const char* ssid = "NOLA 37G";
const char* password = "12345678";
const char* serverUrl = "https://habito-api.vercel.app/"; // Sesuaikan dengan alamat server dan port Anda

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    Serial.print("Sending HTTP GET request...");
    
    // Menggunakan ::begin(WiFiClient, url) yang baru
    http.begin(client, serverUrl);
    
    int httpCode = http.GET();

    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println("Response: " + payload);
    } else {
      Serial.println("Error on HTTP request");
    }

    http.end();
  }

  delay(10000); // Tunggu 5 detik sebelum mengirim permintaan berikutnya
}
