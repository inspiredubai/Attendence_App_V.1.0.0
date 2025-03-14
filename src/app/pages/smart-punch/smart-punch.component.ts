import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-smart-punch',
  templateUrl: './smart-punch.component.html',
  styleUrls: ['./smart-punch.component.scss'],
  standalone: false,

})
export class SmartPunchComponent implements OnInit {
  // ngOnInit(): void {}
  // center!: google.maps.LatLngLiteral;
  // markerPosition!: google.maps.LatLngLiteral;
  // zoom = 15;

  // constructor(private dataservice: DataService) { }

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
  //     this.dataservice.sendData(this.markerPosition);
  //     console.log('Updated Marker Position:', this.markerPosition);
  //   }
  // }
  loading = false;
  zoom = 18; // High zoom for precise pin location
  center = { lat: 0, lng: 0 }; // Default center
  markerPosition = { lat: 0, lng: 0 }; // Default marker position

  // Method to get the current location
  getCurrentLocation() {
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.loading = false;
          // Update the marker position and center of the map
          this.markerPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.center = { ...this.markerPosition };
          console.log('Current Position:', this.markerPosition);
        },
        (error) => {
          this.loading = false;
          console.error('Error getting location:', error);
          alert('Unable to retrieve location. Please enable location services.');
        },
        {
          enableHighAccuracy: true, // Use GPS for accuracy
          timeout: 10000, // Max time to get location
          maximumAge: 0, // Always get the latest location
        }
      );
    } else {
      this.loading = false;
      alert('Geolocation is not supported by your browser.');
    }
  }

  // Initialize the map with the current location
  ngOnInit() {
    this.getCurrentLocation();
  }
}