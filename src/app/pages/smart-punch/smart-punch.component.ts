import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';
import * as L from 'leaflet';
import { Router } from '@angular/router';

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
  popoverOpen = false;
  popoverEvent: any = null;

  constructor(
    private dataservice: DataService,
    private router: Router,) { }

  openPopover(event: Event) {
    this.popoverEvent = event;
    this.popoverOpen = true;
  }
   selectOption(option: string) {
    console.log('Selected:', option);
    this.popoverOpen = false;

    if (option === 'logout') {
      this.logout();
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
        goToChangePassword() {
    this.router.navigate(['/login/passwordchange']); // Adjust the route path accordingly
  }

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
  // async getCurrentLocation() {
  //   try {
  //     if (Capacitor.isNativePlatform()) {
  //       await Geolocation.requestPermissions(); 
  
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
  //     } else {
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
  async getCurrentLocation() {
  try {
    if (Capacitor.isNativePlatform()) {
      // 📱 Native app (Android/iOS)
      const perm = await Geolocation.requestPermissions();
      if (perm.location !== 'granted') {
        console.warn('Native location permission not granted, using fallback');
        await this.setDefaultLocation();
        return;
      }

      // 👇 Use watchPosition instead of single getCurrentPosition
      const watchId = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        },
        (position, error) => {
          if (error) {
            console.error('Watch error:', error);
            return;
          }

          if (position) {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.markerPosition = { ...this.center };
            console.log('Refined Native Location:', this.center);
          }
        }
      );

    } else {
      // 🌐 Browser
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.markerPosition = { ...this.center };
          console.log('Browser Location:', this.center);
        },
        async (error) => {
          console.error('Browser Geolocation Error:', error);
          await this.setDefaultLocation(); // fallback if blocked/denied
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
    await this.setDefaultLocation();
  }
}


async setDefaultLocation() {
  try {
    // 🌍 IP-based fallback
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    this.center = { lat: data.latitude, lng: data.longitude };
    this.markerPosition = { ...this.center };
    console.log('IP-based fallback location:', this.center);
  } catch (e) {
    // 📌 If IP fails, fallback to Lahore
    console.error('IP lookup failed, using hardcoded fallback');
    this.center = { lat: 31.4933248, lng: 74.3079936 };
    this.markerPosition = { ...this.center };
  }
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