import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-smart-punch',
  templateUrl: './smart-punch.component.html',
  styleUrls: ['./smart-punch.component.scss'],
  standalone: false,

})
export class SmartPunchComponent implements OnInit {
  ngOnInit() { }
  center = { lat: 31.5204, lng: 74.3587 }; // Default location (Lahore, Pakistan)
  markerPosition = { ...this.center };

  updateLocation(event:any ) {//google.maps.MapMouseEvent
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    }
  }
  // @ViewChild('map', { static: false }) mapElement!: ElementRef;
  // address: string = '';
  // latitude: number = 0;
  // longitude: number = 0;


  // constructor(
  //   private geolocation: Geolocation,
  //   private nativeGeocoder: NativeGeocoder) {
  // }


  // ngOnInit() {
  //   this.loadMap();
  // }

  // loadMap() {
  //   this.geolocation.getCurrentPosition().then((resp) => {

  //     this.latitude = resp.coords.latitude;
  //     this.longitude = resp.coords.longitude;

  //     let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }

  //     this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  //     this.map.addListener('dragend', () => {

  //       this.latitude = this.map.center.lat();
  //       this.longitude = this.map.center.lng();

  //       this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
  //     });

  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

  // getAddressFromCoords(lattitude, longitude) {
  //   console.log("getAddressFromCoords " + lattitude + " " + longitude);
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  //   };

  //   this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
  //     .then((result: NativeGeocoderResult[]) => {
  //       this.address = "";
  //       let responseAddress = [];
  //       for (let [key, value] of Object.entries(result[0])) {
  //         if (value.length > 0)
  //           responseAddress.push(value);

  //       }
  //       responseAddress.reverse();
  //       for (let value of responseAddress) {
  //         this.address += value + ", ";
  //       }
  //       this.address = this.address.slice(0, -2);
  //     })
  //     .catch((error: any) => {
  //       this.address = "Address Not Available!";
  //     });

  // }

  // ngOnInit() {
  //  }
  // latitude: number = 0;
  // longitude: number = 0;
  // mapVisible: boolean = false; // Hide map initially

  // constructor() {}

  // onsmartpunch() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.mapVisible = true; // Show map after getting location
  //     }, (error) => {
  //       console.error("Error getting location", error);
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }
}
