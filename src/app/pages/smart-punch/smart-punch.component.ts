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
  center!: google.maps.LatLngLiteral;
  markerPosition!: google.maps.LatLngLiteral;
  zoom = 15;

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

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
  async getCurrentLocation() {
    try {
      if (Capacitor.isNativePlatform()) {
        await Geolocation.requestPermissions(); 
  
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
  
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.markerPosition = { ...this.center };
        console.log('Native Device Location:', this.center);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.markerPosition = { ...this.center };
            console.log('Browser Location:', this.center);
          },
          (error) => {
            console.error('Browser Geolocation Error:', error);
            this.setDefaultLocation();
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      }
    } catch (error) {
      console.error('Error getting location:', error);
      this.setDefaultLocation();
    }
  }
  

  setDefaultLocation() {
    this.center = { lat: 31.4933248, lng: 74.3079936 };
    this.markerPosition = { ...this.center };
  }

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