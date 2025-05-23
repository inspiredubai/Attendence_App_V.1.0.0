import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { CheckoutComponent } from '../pages/checkout/checkout.component';
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
  attendanceFromGroup: any
  userDetails: any;
  receivedData: any;
  isCheckedIn: boolean = false;
  cardItems = [
  {
    label: 'Check In',
    action: () => this.onCheckIn(),
    disabled: this.isCheckedIn
  },
  {
    label: 'Check Out',
    action: () => this.onCheckOut(),
    disabled: !this.isCheckedIn
  },
  {
    label: 'Attendance Summary',
    action: () => this.onattendancesummary(),
    disabled: false
  },
  {
    label: 'Leave Entry',
    action: () => this.onleaveEntry(),
    disabled: false
  },
  {
    label: 'SMART PUNCH - ONE TO ONE',
    action: () => this.onsmartpunch(),
    disabled: false
  }
];

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
  constructor(private router: Router,
    private navCtrl: NavController
    , private fb: UntypedFormBuilder,
    private dataservice: DataService, private toastService: ToastService
  ) { }
  ngOnInit() {
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
      PunchMode: [false,],
      PunchTime: [null],
      Active: [false,],
    });
    //  this.datashow()
    this.dataservice.data$.subscribe(data => {
      this.receivedData = data;
    });
    if (this.receivedData == null) {
      this.getCurrentLocation()
    } else {
      this.attendanceFromGroup.get('Latitude')?.setValue(this.receivedData.lat.toString());
      this.attendanceFromGroup.get('Longitude')?.setValue(this.receivedData.lng.toString());
    }
  }
  onCheckIn() {
    this.getCurrentTime()
    this.dataservice.attendancedatalistpost(this.attendanceFromGroup.value).subscribe((res) => {
      if (res) {
        this.isCheckedIn = true;
        this.toastService.presentToast('Check-In sucessfully');

      } else {
        this.toastService.presentToastErrror('Something went wrong');
      }
    })


  }

  onCheckOut() {
    this.getCurrentTime()
    this.attendanceFromGroup.controls.PunchMode.setValue(true)
    this.dataservice.attendancedatalistpost(this.attendanceFromGroup.value).subscribe((res) => {
      if (res) {
        this.isCheckedIn = false;
        this.toastService.presentToast('Check-Out sucessfully');

      } else {
        this.toastService.presentToastErrror('Something went wrong');
      }
    })
  }
  onsmartpunch() {
    this.router.navigate(['/smartpunch']);
  }
  onattendancesummary() {
    this.router.navigate(['/attendancesummary']);
  }
  onleaveEntry(){
    this.router.navigate(['/leaveentry']);

  }
  //   this.router.navigate(['/attendancedetail'])
  //  }



  async getCurrentLocation() {
    try {
      if (Capacitor.isNativePlatform()) {
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.attendanceFromGroup.get('Latitude')?.setValue(this.center.lat.toString());
        this.attendanceFromGroup.get('Longitude')?.setValue(this.center.lng.toString());
        this.markerPosition = { ...this.center };
        console.log('Native Device Location:', this.center);
      }
      else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.attendanceFromGroup.get('Latitude')?.setValue(this.center.lat.toString());
            this.attendanceFromGroup.get('Longitude')?.setValue(this.center.lng.toString());
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
      this.attendanceFromGroup.get('Latitude')?.setValue(this.center.lat.toString());
      this.attendanceFromGroup.get('Longitude')?.setValue(this.center.lng.toString());
      this.dataservice.sendData(this.markerPosition);
      console.log('Updated Marker Position:', this.markerPosition);
    }
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
}
