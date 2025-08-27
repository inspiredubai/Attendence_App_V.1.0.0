// import { Component, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { NavController, ToastController } from '@ionic/angular';
// import { CheckoutComponent } from '../pages/checkout/checkout.component';
// import { UntypedFormBuilder, Validators } from '@angular/forms';
// import { DataService } from '../services/data.service';
// import { ToastService } from '../services/toast.service';
// import { Geolocation } from '@capacitor/geolocation';
// import { Capacitor } from '@capacitor/core';
// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
//   standalone: false,
// })
// export class HomePage {
//   center!: google.maps.LatLngLiteral;
//   markerPosition!: google.maps.LatLngLiteral;
//   popoverOpen = false;
//   popoverEvent: any = null;
//   attendanceFromGroup: any
//   userDetails: any;
//   receivedData: any;
//   isCheckedIn: boolean = false;
// //   cardItems = [
// //   {
// //     label: 'Check In',
// //     action: () => this.onCheckIn(),
// //     disabled: this.isCheckedIn
// //   },
// //   {
// //     label: 'Check Out',
// //     action: () => this.onCheckOut(),
// //     disabled: !this.isCheckedIn
// //   },
// //   {
// //     label: 'Attendance Summary',
// //     action: () => this.onattendancesummary(),
// //     disabled: false
// //   },
// //   {
// //     label: 'Leave Entry',
// //     action: () => this.onleaveEntry(),
// //     disabled: false
// //   },
// //   {
// //     label: 'SMART PUNCH - ONE TO ONE',
// //     action: () => this.onsmartpunch(),
// //     disabled: false
// //   }
// // ];

//   openPopover(event: Event) {
//     this.popoverEvent = event;
//     this.popoverOpen = true;
//   }

//   selectOption(option: string) {
//     console.log('Selected:', option);
//     this.popoverOpen = false;

//     if (option === 'logout') {
//       this.logout();
//     }
//   }

//   logout() {
//     localStorage.clear();
//     sessionStorage.clear();
//     this.router.navigate(['/login']);
//   }
//   constructor(private router: Router,
//     private navCtrl: NavController
//     , private fb: UntypedFormBuilder,
//     private dataservice: DataService, private toastService: ToastService
//   ) { }
//   ngOnInit() {
//     this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
//     this.attendanceFromGroup = this.fb.group({
//       AttendanceID: [0, [Validators.required]],
//       AttendanceEmpID: [this.userDetails.userId],
//       ProjectID: [-1, [Validators.required]],
//       PunchDate: [new Date().toISOString().split('T')[0], [Validators.required]],
//       CheckOut: [null, [Validators.required]],
//       Latitude: [null, [Validators.required]],
//       Longitude: [null, [Validators.required]],
//       LocationName: [''],
//       ImageFile: [null],
//       Remarks: [null],
//       PunchMode: [false,],
//       PunchTime: [null],
//       Active: [false,],
//     });
//     //  this.datashow()
//     this.dataservice.data$.subscribe(data => {
//       this.receivedData = data;
//     });
//     if (this.receivedData == null) {
//       this.getCurrentLocation()
//     } else {
//       this.attendanceFromGroup.get('Latitude')?.setValue(this.receivedData.lat.toString());
//       this.attendanceFromGroup.get('Longitude')?.setValue(this.receivedData.lng.toString());
//     }
//   }
//    get cardItems() {
//     return [
//       {
//         label: 'Check In',
//         action: () => this.onCheckIn(),
//         disabled: this.isCheckedIn
//       },
//       {
//         label: 'Check Out',
//         action: () => this.onCheckOut(),
//         disabled: !this.isCheckedIn
//       },
//       {
//         label: 'Attendance Summary',
//         action: () => this.onattendancesummary(),
//         disabled: false
//       },
//       {
//         label: 'Leave Entry',
//         action: () => this.onleaveEntry(),
//         disabled: false
//       },
//       {
//         label: 'SMART PUNCH - ONE TO ONE',
//         action: () => this.onsmartpunch(),
//         disabled: false
//       }
//     ];
//   }
//   onCheckIn() {
//     this.getCurrentTime()
//     this.dataservice.attendancedatalistpost(this.attendanceFromGroup.value).subscribe((res) => {
//       if (res) {
//         this.isCheckedIn = true;
//         this.toastService.presentToast('Check-In sucessfully');

//       } else {
//         this.toastService.presentToastErrror('Something went wrong');
//       }
//     })


//   }

//   onCheckOut() {
//     this.getCurrentTime()
//     this.attendanceFromGroup.controls.PunchMode.setValue(true)
//     this.dataservice.attendancedatalistpost(this.attendanceFromGroup.value).subscribe((res) => {
//       if (res) {
//         this.isCheckedIn = false;
//         this.toastService.presentToast('Check-Out sucessfully');

//       } else {
//         this.toastService.presentToastErrror('Something went wrong');
//       }
//     })
//   }
//   onsmartpunch() {
//     this.router.navigate(['/smartpunch']);
//   }
//   onattendancesummary() {
//     this.router.navigate(['/attendancesummary']);
//   }
//   onleaveEntry(){
//     this.router.navigate(['/leaveentry']);

//   }
//   //   this.router.navigate(['/attendancedetail'])
//   //  }

// async getCurrentLocation() {
//   try {
//     const coordinates = await Geolocation.getCurrentPosition();
//     const latitude = coordinates.coords.latitude;
//     const longitude = coordinates.coords.longitude;

//     console.log('Latitude:', latitude);
//     console.log('Longitude:', longitude);

//     // Call your save method here
//     this.saveLocation(latitude, longitude);
//   } catch (error) {
//     console.error('Error getting location', error);
//   }
// }

//   // async getCurrentLocation() {
//   //   try {
//   //     if (Capacitor.isNativePlatform()) {
//   //       const position = await Geolocation.getCurrentPosition({
//   //         enableHighAccuracy: true,
//   //         timeout: 10000,
//   //         maximumAge: 0,
//   //       });
//   //       this.center = {
//   //         lat: position.coords.latitude,
//   //         lng: position.coords.longitude,
//   //       };
//   //       this.attendanceFromGroup.get('Latitude')?.setValue(this.center.lat.toString());
//   //       this.attendanceFromGroup.get('Longitude')?.setValue(this.center.lng.toString());
//   //       this.markerPosition = { ...this.center };
//   //       console.log('Native Device Location:', this.center);
//   //     }
//   //     else {
//   //       navigator.geolocation.getCurrentPosition(
//   //         (position) => {
//   //           this.center = {
//   //             lat: position.coords.latitude,
//   //             lng: position.coords.longitude,
//   //           };
//   //           this.attendanceFromGroup.get('Latitude')?.setValue(this.center.lat.toString());
//   //           this.attendanceFromGroup.get('Longitude')?.setValue(this.center.lng.toString());
//   //           this.markerPosition = { ...this.center };
//   //           console.log('Browser Location:', this.center);
//   //         },
//   //         (error) => {
//   //           console.error('Browser Geolocation Error:', error);
//   //           this.setDefaultLocation();
//   //         },
//   //         {
//   //           enableHighAccuracy: true,
//   //           timeout: 10000,
//   //           maximumAge: 0,
//   //         }
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error('Error getting location:', error);
//   //     this.setDefaultLocation();
//   //   }
//   // }

//   setDefaultLocation() {
//     this.center = { lat: 31.4933248, lng: 74.3079936 };
//     this.markerPosition = { ...this.center };
//   }

//   updateMarkerPosition(event: google.maps.MapMouseEvent) {
//     if (event.latLng) {
//       this.markerPosition = {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       };
//       this.attendanceFromGroup.get('Latitude')?.setValue(this.center.lat.toString());
//       this.attendanceFromGroup.get('Longitude')?.setValue(this.center.lng.toString());
//       this.dataservice.sendData(this.markerPosition);
//       console.log('Updated Marker Position:', this.markerPosition);
//     }
//   }
//   getCurrentTime() {
//     const currentTime = new Date();
//     const formattedTime = currentTime.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: false
//     });
//     this.attendanceFromGroup.get('PunchTime')?.setValue(formattedTime);
//   }
// }
// import { Component, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { NavController, ToastController } from '@ionic/angular';
// import { CheckoutComponent } from '../pages/checkout/checkout.component';
// import { UntypedFormBuilder, Validators } from '@angular/forms';
// import { DataService } from '../services/data.service';
// import { ToastService } from '../services/toast.service';
// import { Geolocation } from '@capacitor/geolocation';
// import { Capacitor } from '@capacitor/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
//   standalone: false,
// })
// export class HomePage {
//   center!: google.maps.LatLngLiteral;
//   markerPosition!: google.maps.LatLngLiteral;
//   popoverOpen = false;
//   popoverEvent: any = null;
//   attendanceFromGroup: any;
//   userDetails: any;
//   receivedData: any;
//   isCheckedIn: boolean = false;

//   constructor(
//     private router: Router,
//     private navCtrl: NavController,
//     private fb: UntypedFormBuilder,
//     private dataservice: DataService,
//     private toastService: ToastService
//   ) {}

//   ngOnInit() {
//     this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
//     this.attendanceFromGroup = this.fb.group({
//       AttendanceID: [0, [Validators.required]],
//       AttendanceEmpID: [this.userDetails.userId],
//       ProjectID: [-1, [Validators.required]],
//       PunchDate: [new Date().toISOString().split('T')[0], [Validators.required]],
//       CheckOut: [null, [Validators.required]],
//       Latitude: [null, [Validators.required]],
//       Longitude: [null, [Validators.required]],
//       LocationName: [''],
//       ImageFile: [null],
//       Remarks: [null],
//       PunchMode: [false],
//       PunchTime: [null],
//       Active: [false],
//     });

//     this.dataservice.data$.subscribe(data => {
//       this.receivedData = data;
//     });

//     if (this.receivedData == null) {
//       this.getCurrentLocation();
//     } else {
//       this.attendanceFromGroup.get('Latitude')?.setValue(this.receivedData.lat.toString());
//       this.attendanceFromGroup.get('Longitude')?.setValue(this.receivedData.lng.toString());
//     }
//   }

//   get cardItems() {
//     return [
//       {
//         label: 'Check In',
//         action: () => this.onCheckIn(),
//         disabled: this.isCheckedIn
//       },
//       {
//         label: 'Check Out',
//         action: () => this.onCheckOut(),
//         disabled: !this.isCheckedIn
//       },
//       {
//         label: 'Attendance Summary',
//         action: () => this.onattendancesummary(),
//         disabled: false
//       },
//       {
//         label: 'Leave Entry',
//         action: () => this.onleaveEntry(),
//         disabled: false
//       },
//       {
//         label: 'SMART PUNCH - ONE TO ONE',
//         action: () => this.onsmartpunch(),
//         disabled: false
//       }
//     ];
//   }

//   openPopover(event: Event) {
//     this.popoverEvent = event;
//     this.popoverOpen = true;
//   }

//   selectOption(option: string) {
//     console.log('Selected:', option);
//     this.popoverOpen = false;

//     if (option === 'logout') {
//       this.logout();
//     }
//   }

//   logout() {
//     localStorage.clear();
//     sessionStorage.clear();
//     this.router.navigate(['/login']);
//   }

//   async getCurrentLocation() {
//     try {
//       const coordinates = await Geolocation.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0
//       });

//       const latitude = coordinates.coords.latitude;
//       const longitude = coordinates.coords.longitude;

//       console.log('Latitude:', latitude);
//       console.log('Longitude:', longitude);

//       this.attendanceFromGroup.get('Latitude')?.setValue(latitude.toString());
//       this.attendanceFromGroup.get('Longitude')?.setValue(longitude.toString());

//       this.center = { lat: latitude, lng: longitude };
//       this.markerPosition = { ...this.center };

//       this.saveLocation(latitude, longitude);

//     } catch (error) {
//       console.error('Error getting location', error);
//       this.setDefaultLocation();
//     }
//   }

//   updateMarkerPosition(event: google.maps.MapMouseEvent) {
//     if (event.latLng) {
//       const newLat = event.latLng.lat();
//       const newLng = event.latLng.lng();

//       this.markerPosition = {
//         lat: newLat,
//         lng: newLng,
//       };

//       this.attendanceFromGroup.get('Latitude')?.setValue(newLat.toString());
//       this.attendanceFromGroup.get('Longitude')?.setValue(newLng.toString());

//       this.dataservice.sendData(this.markerPosition);

//       console.log('Updated Marker Position:', this.markerPosition);
//     }
//   }

//   setDefaultLocation() {
//     this.center = { lat: 31.4933248, lng: 74.3079936 };
//     this.markerPosition = { ...this.center };
//   }

//   getCurrentTime() {
//     const currentTime = new Date();
//     const formattedTime = currentTime.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: false
//     });
//     this.attendanceFromGroup.get('PunchTime')?.setValue(formattedTime);
//   }

//   onCheckIn() {
//     this.getCurrentTime();
//     this.dataservice.attendancedatalistpost(this.attendanceFromGroup.value).subscribe((res) => {
//       if (res) {
//         this.isCheckedIn = true;
//         this.toastService.presentToast('Check-In successfully');
//       } else {
//         this.toastService.presentToastErrror('Something went wrong');
//       }
//     });
//   }

//   onCheckOut() {
//     this.getCurrentTime();
//     this.attendanceFromGroup.controls.PunchMode.setValue(true);
//     this.dataservice.attendancedatalistpost(this.attendanceFromGroup.value).subscribe((res) => {
//       if (res) {
//         this.isCheckedIn = false;
//         this.toastService.presentToast('Check-Out successfully');
//       } else {
//         this.toastService.presentToastErrror('Something went wrong');
//       }
//     });
//   }

//   onsmartpunch() {
//     this.router.navigate(['/smartpunch']);
//   }

//   onattendancesummary() {
//     this.router.navigate(['/attendancesummary']);
//   }

//   onleaveEntry() {
//     this.router.navigate(['/leaveentry']);
//   }

//   saveLocation(lat: number, lng: number) {
//     const locationData = {
//       userId: this.userDetails?.userId || 0,
//       latitude: lat,
//       longitude: lng,
//       date: new Date().toISOString()
//     };

//     // Optional: Save to server
//   //   this.dataservice.saveLocation(locationData).subscribe(
//   //     (      res: any) => console.log('Location saved:', res),
//   //     (      err: any) => console.error('Error saving location:', err)
//   //   );
//   // }
// }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  center!: google.maps.LatLngLiteral;
  markerPosition!: google.maps.LatLngLiteral;
  popoverOpen = false;
  popoverEvent: any = null;
  attendanceFromGroup: any;
  userDetails: any;
  receivedData: any;
  isCheckedIn: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private fb: UntypedFormBuilder,
    private dataservice: DataService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.attendanceFromGroup = this.fb.group({
      AttendanceID: [0, [Validators.required]],
      AttendanceEmpID: [this.userDetails.userId],
      ProjectID: [-1, [Validators.required]],
      PunchDate: [new Date().toISOString().split('T')[0], [Validators.required]],
      CheckOut: [null, [Validators.required]],
      Latitude: [null, [Validators.required]],
      Longitude: [null, [Validators.required]],
      LocationName: [''],
      ImageFile: [null],
      Remarks: [null],
      PunchMode: [false],
      PunchTime: [null],
      Active: [false],
    });

    await this.requestLocationPermission(); // ✅ Request permission first

    this.dataservice.data$.subscribe(data => {
      this.receivedData = data;
    });

    if (this.receivedData == null) {
      this.getCurrentLocation();
    } else {
      this.attendanceFromGroup.get('Latitude')?.setValue(this.receivedData.lat.toString());
      this.attendanceFromGroup.get('Longitude')?.setValue(this.receivedData.lng.toString());
    }
  }

  goToChangePassword() {
    this.router.navigate(['/login/passwordchange']); // Adjust the route path accordingly
  }

  async requestLocationPermission() {
    try {
      const permission = await Geolocation.requestPermissions();
      console.log('Permission status:', permission);
    } catch (error) {
      console.error('Permission request error:', error);
    }
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });

      const latitude = coordinates.coords.latitude;
      const longitude = coordinates.coords.longitude;

      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);

      this.attendanceFromGroup.get('Latitude')?.setValue(latitude.toString());
      this.attendanceFromGroup.get('Longitude')?.setValue(longitude.toString());

      this.center = { lat: latitude, lng: longitude };
      this.markerPosition = { ...this.center };

      this.saveLocation(latitude, longitude);
    } catch (error) {
      console.error('Error getting location:', JSON.stringify(error));
      this.setDefaultLocation();
    }
  }

  updateMarkerPosition(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();

      this.markerPosition = {
        lat: newLat,
        lng: newLng,
      };

      this.attendanceFromGroup.get('Latitude')?.setValue(newLat.toString());
      this.attendanceFromGroup.get('Longitude')?.setValue(newLng.toString());

      this.dataservice.sendData(this.markerPosition);

      console.log('Updated Marker Position:', this.markerPosition);
    }
  }

  setDefaultLocation() {
    console.warn('Using default location');
    this.center = { lat: 31.4933248, lng: 74.3079936 };
    this.markerPosition = { ...this.center };

    this.attendanceFromGroup.get('Latitude')?.setValue(this.center.lat.toString());
    this.attendanceFromGroup.get('Longitude')?.setValue(this.center.lng.toString());
  }

  getCurrentTime() {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    this.attendanceFromGroup.get('PunchTime')?.setValue(formattedTime);
  }

  onCheckIn() {
    this.getCurrentTime();
    console.log('Check-In Data:', this.attendanceFromGroup.value);

    this.dataservice.attendancedatalistpost(this.attendanceFromGroup.value).subscribe((res) => {
      if (res) {
        this.isCheckedIn = true;
        this.toastService.presentToast('Check-In successfully');
      } else {
        this.toastService.presentToastErrror('Something went wrong');
      }
    });
  }

  onCheckOut() {
    this.getCurrentTime();
    this.attendanceFromGroup.controls.PunchMode.setValue(true);
    console.log('Check-Out Data:', this.attendanceFromGroup.value);

    this.dataservice.attendancedatalistpost(this.attendanceFromGroup.value).subscribe((res) => {
      if (res) {
        this.isCheckedIn = false;
        this.toastService.presentToast('Check-Out successfully');
      } else {
        this.toastService.presentToastErrror('Something went wrong');
      }
    });
  }

  onsmartpunch() {
    this.router.navigate(['/smartpunch']);
  }

  onattendancesummary() {
    this.router.navigate(['/attendancesummary']);
  }

  onleaveEntry() {
    this.router.navigate(['/leaveentry']);
  }

  saveLocation(lat: number, lng: number) {
    const locationData = {
      userId: this.userDetails?.userId || 0,
      latitude: lat,
      longitude: lng,
      date: new Date().toISOString()
    };

    // Optional: send to backend
    // this.dataservice.saveLocation(locationData).subscribe(
    //   res => console.log('Location saved:', res),
    //   err => console.error('Error saving location:', err)
    // );
  }

  // get cardItems() {
  //   return [
  //     {
  //       label: 'Check In',
  //       action: () => this.onCheckIn(),
  //       disabled: this.isCheckedIn
  //     },
  //     {
  //       label: 'Check Out',
  //       action: () => this.onCheckOut(),
  //       disabled: !this.isCheckedIn
  //     },
  //     {
  //       label: 'Attendance Summary',
  //       action: () => this.onattendancesummary(),
  //       disabled: false
  //     },
  //     {
  //       label: 'Leave Entry',
  //       action: () => this.onleaveEntry(),
  //       disabled: false
  //     },
  //     {
  //       label: 'SMART PUNCH - ONE TO ONE',
  //       action: () => this.onsmartpunch(),
  //       disabled: false
  //     }
  //   ];
  // }
get cardItems() {
  return [
    {
      label: 'Check In',
      icon: 'log-in-outline',
      action: () => this.onCheckIn(),
      disabled: this.isCheckedIn
    },
    {
      label: 'Check Out',
      icon: 'log-out-outline',
      action: () => this.onCheckOut(),
      disabled: !this.isCheckedIn
    },
    {
      label: 'Attendance Summary',
      icon: 'calendar-outline',
      action: () => this.onattendancesummary(),
      disabled: false
    },
    {
      label: 'Leave Entry',
      icon: 'document-text-outline',
      action: () => this.onleaveEntry(),
      disabled: false
    },
    {
      label: 'SMART PUNCH - ONE TO ONE',
      icon: 'finger-print-outline',
      action: () => this.onsmartpunch(),
      disabled: false
    }
  ];
}

  openPopover(event: Event) {
    this.popoverEvent = event;
    this.popoverOpen = true;
  }

  selectOption(option: string) {
    this.popoverOpen = false; // Close the popover

    if (option === 'logout') {
      this.logout();
    } else if (option === 'changePassword') {
      this.goToChangePassword();
    }
  }


  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
