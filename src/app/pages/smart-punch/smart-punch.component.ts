import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-smart-punch',
  templateUrl: './smart-punch.component.html',
  styleUrls: ['./smart-punch.component.scss'],
  standalone: false,

})
export class SmartPunchComponent implements OnInit {

  // ngOnInit(): void {
  //     }
  // center!: google.maps.LatLngLiteral;
  // markerPosition!: google.maps.LatLngLiteral;
  // zoom = 15;

  // constructor(private dataservice:DataService) {}

  // ngOnInit(): void {
  //   this.getCurrentLocation();
  // }
  // async getCurrentLocation() {
  //   try {
  //     // Check if running on a device (Capacitor) or browser
  //     if (Capacitor.isNativePlatform()) {
  //       // Native device (using Capacitor Geolocation)
  //       const position = await Geolocation.getCurrentPosition();
  //       this.center = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       this.markerPosition = { ...this.center };
  //       console.log('Native Device Location:', this.center);
  //     } else {
  //       // Browser-based geolocation
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           this.center = {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           };
  //           this.markerPosition = { ...this.center };
  //           console.log('Browser Location:', this.center);
  //         },
  //         (error) => {
  //           console.error('Browser Geolocation Error:', error);
  //           this.center = { lat: 31.4933248, lng: 74.3079936 };  
  //           this.markerPosition = { ...this.center };
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error getting location:', error);
  //     this.center = { lat: 31.4933248, lng: 74.3079936 };  
  //     this.markerPosition = { ...this.center };
  //   }
  // }


  // updateMarkerPosition(event: google.maps.MapMouseEvent) {
  //   if (event.latLng) {
  //     this.markerPosition = {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //     };
  //       this.dataservice.sendData(this.markerPosition);
  //     console.log('Updated Marker Position:', this.markerPosition);
  //   }
  // }
  // center!: google.maps.LatLngLiteral;
  // markerPosition!: google.maps.LatLngLiteral;
  // zoom = 15;

  // constructor(private dataservice: DataService) { }

  // ngOnInit(): void {
  //   this.getCurrentLocation();
  // }

  // async getCurrentLocation() {
  //   try {
  //     if (Capacitor.isNativePlatform()) {
  //       const position = await Geolocation.getCurrentPosition({
  //         enableHighAccuracy: true,
  //         timeout: 10000,
  //         maximumAge: 0,
  //       });
  //       this.center = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       this.markerPosition = { ...this.center };
  //       console.log('Native Device Location:', this.center);
  //     }
  //     else {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           this.center = {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           };
  //           this.markerPosition = { ...this.center };
  //           console.log('Browser Location:', this.center);
  //         },
  //         (error) => {
  //           console.error('Browser Geolocation Error:', error);
  //           this.setDefaultLocation();
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 10000,
  //           maximumAge: 0,
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error getting location:', error);
  //     this.setDefaultLocation();
  //   }
  // }

  // setDefaultLocation() {
  //   this.center = { lat: 31.4933248, lng: 74.3079936 };
  //   this.markerPosition = { ...this.center };
  // }

  // updateMarkerPosition(event: google.maps.MapMouseEvent) {
  //   if (event.latLng) {
  //     this.markerPosition = {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //     };
  //     this.dataservice.sendData(this.markerPosition);
  //     console.log('Updated Marker Position:', this.markerPosition);
  //   }
  // }
  center!: google.maps.LatLngLiteral;
  markerPosition!: google.maps.LatLngLiteral;
  zoom = 15;
  errorMessage = '';

  constructor(private dataservice: DataService) {}

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  // Get Current Location (Mobile and Desktop Support)
  async getCurrentLocation() {
    try {
      if (Capacitor.isNativePlatform()) {
        // Native GPS Location
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0,
        });
        this.setLocation(position.coords.latitude, position.coords.longitude);
        console.log('Native Device Location:', this.center);
      } else {
        // Browser Geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Check if the accuracy is acceptable
              if (position.coords.accuracy && position.coords.accuracy > 100) {
                console.warn('Low accuracy, falling back to IP-based location');
                this.getIPBasedLocation();
              } else {
                this.setLocation(latitude, longitude);
                console.log('Browser Location:', this.center);
              }
            },
            (error) => {
              console.error('Geolocation Error:', error);
              this.getIPBasedLocation();
            },
            {
              enableHighAccuracy: true,
              timeout: 30000,
              maximumAge: 0,
            }
          );
        } else {
          console.error('Geolocation not supported by this browser.');
          this.getIPBasedLocation();
        }
      }
    } catch (error) {
      console.error('Error getting location:', error);
      this.getIPBasedLocation();
    }
  }

  // Fallback to IP-Based Location
  async getIPBasedLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      if (data.latitude && data.longitude) {
        this.setLocation(parseFloat(data.latitude), parseFloat(data.longitude));
        console.log('IP-Based Location:', this.center);
      } else {
        this.setDefaultLocation();
        console.error('Failed to get IP-based location');
      }
    } catch (error) {
      console.error('Error fetching IP-based location:', error);
      this.setDefaultLocation();
    }
  }

  // Set Location on Map
  setLocation(lat: number, lng: number) {
    this.center = { lat, lng };
    this.markerPosition = { lat, lng };
    this.zoom = 15;
  }

  // Set Default Location (if location fails)
  setDefaultLocation() {
    this.setLocation(31.4933248, 74.3079936); // Lahore, Pakistan (example)
    console.warn('Using default location');
  }

  // Update Marker Position on Click
  updateMarkerPosition(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.dataservice.sendData(this.markerPosition);
      console.log('Updated Marker Position:', this.markerPosition);
    }
  }
}