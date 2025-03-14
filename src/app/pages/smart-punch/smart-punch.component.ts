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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
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
map: L.Map | undefined;
  latitude: number | null = null;
  longitude: number | null = null;

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    this.map = L.map('map').setView([0, 0], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  async showLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;

      if (this.map) {
        this.map.setView([this.latitude, this.longitude], 15);

        L.marker([this.latitude, this.longitude])
          .addTo(this.map)
          .bindPopup(`Latitude: ${this.latitude}<br>Longitude: ${this.longitude}`)
          .openPopup();
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }
}