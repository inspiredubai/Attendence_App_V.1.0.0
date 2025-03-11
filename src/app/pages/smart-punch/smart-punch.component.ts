import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-smart-punch',
  templateUrl: './smart-punch.component.html',
  styleUrls: ['./smart-punch.component.scss'],
  standalone: false,

})
export class SmartPunchComponent implements OnInit {
//   center!: google.maps.LatLngLiteral;
//   markerPosition!: google.maps.LatLngLiteral;
//   zoom = 12;

//   constructor() { }

//   ngOnInit(): void {
//      this.center = {
//       lat: 31.5204,   
//       lng: 74.3587,  
//     };

//     this.markerPosition = { ...this.center };  
//   }

//    updateMarkerPosition(event: google.maps.MapMouseEvent) {
//     if (event.latLng) {
//       this.markerPosition = {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       };
//     }
//   }
// }
center!: google.maps.LatLngLiteral;
markerPosition!: google.maps.LatLngLiteral;
zoom = 15;

constructor() {}

ngOnInit(): void {
  this.getCurrentLocation();
}

async getCurrentLocation() {
  try {
    // Get the current position from Capacitor Geolocation
    const position = await Geolocation.getCurrentPosition();
    this.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    this.markerPosition = { ...this.center };
    console.log('Current Location:', this.center);
  } catch (error) {
    console.error('Error getting location:', error);
    // Fallback to a default location (e.g., New Delhi)
    this.center = { lat: 28.7041, lng: 77.1025 };
    this.markerPosition = { ...this.center };
  }
}

// Method to update the marker position when clicking on the map
updateMarkerPosition(event: google.maps.MapMouseEvent) {
  if (event.latLng) {
    this.markerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
  }
}
}