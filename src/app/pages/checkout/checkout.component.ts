import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false,

})
export class CheckoutComponent  implements OnInit {
  center!: google.maps.LatLngLiteral;
markerPosition!: google.maps.LatLngLiteral;
zoom = 15;
 attendanceFromGroup:any;
   popoverOpen = false;
    popoverEvent: any = null;
    formattedDate: string = '';
    showPicker: boolean = false;
   url: any;
   userDetails: any;
  receivedData: any;
  
    openDatePicker() {
      this.showPicker = true;
    }
  
    closeDatePicker() {
      this.showPicker = false;
    }
  
    onDateChange(event: any) {
      const selectedDate = new Date(event.detail.value);
      this.formattedDate = selectedDate.toLocaleDateString();
      this.closeDatePicker();
    }
    constructor(private navCtrl: NavController, private router: Router,private fb: UntypedFormBuilder,
     private dataservice: DataService,private toastService: ToastService
    ) {}
  
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
  
   ngOnInit() {
   this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}'); 
     this.attendanceFromGroup = this.fb.group({
       AttendanceID: [0, [Validators.required]],
       AttendanceEmpID: [this.userDetails.userId],
       ProjectID: [-1, [Validators.required]],
       PunchDate: [null, [Validators.required]],
       CheckOut:[null, [Validators.required]],
       Latitude:[null, [Validators.required]],
       Longitude:[null, [Validators.required]],
       LocationName:[null, [Validators.required]],
       ImageFile:[null],
       Remarks:[null],
       PunchMode:[false,],
       Active:[false,],
       });
      //  this.datashow()
      this.dataservice.data$.subscribe(data => {
        this.receivedData = data;
      });
      if(this.receivedData==null){
       this.getCurrentLocation()
      }else{

        this.attendanceFromGroup.get('Latitude')?.setValue(this.receivedData.lat.toString());
        this.attendanceFromGroup.get('Longitude')?.setValue(this.receivedData.lng.toString());
      }
   }
   saveform(){
     this.dataservice.attendancedatalistpost(this.attendanceFromGroup.value).subscribe((res)=>{
       if (res) {
          this.toastService.presentToast('Data Save sucessfully');
 
       }else{
         this.toastService.presentToastErrror('Something went wrong');
       }
     })
   }
   datashow(){
  this.dataservice.attendancedatalist().subscribe((res)=>{
   console.log("list",res);
 })
   }
   onSelectFile(event: any) {
     if (event.target.files && event.target.files.length > 0) {
       const file = event.target.files[0];
       const reader = new FileReader();
       
       reader.onload = () => {
         this.url = reader.result as string;
         this.attendanceFromGroup.controls['ImageFile'].setValue(this.url);
       };
   
       reader.readAsDataURL(file);
     }
   }
   async getCurrentLocation() {
    try {
      if (Capacitor.isNativePlatform()) {
        const position = await Geolocation.getCurrentPosition();
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.attendanceFromGroup.get('Latitude')?.setValue(this.center.lat.toString());
        this.attendanceFromGroup.get('Longitude')?.setValue(this.center.lng.toString());
  
        this.markerPosition = { ...this.center };
        
        // Get location name
        this.getAddressFromCoordinates(this.center.lat, this.center.lng);
      } else {
        // Browser-based geolocation
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
  
            this.getAddressFromCoordinates(this.center.lat, this.center.lng);
          },
          (error) => {
            console.error('Browser Geolocation Error:', error);
            this.setDefaultLocation();
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
    this.attendanceFromGroup.get('Latitude')?.setValue(this.center.lat.toString());
    this.attendanceFromGroup.get('Longitude')?.setValue(this.center.lng.toString());
  
    this.getAddressFromCoordinates(this.center.lat, this.center.lng);
  }  
  getAddressFromCoordinates(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };
  
    geocoder.geocode({ location: latlng }, (results:any, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const address = results[0].formatted_address;          
          this.attendanceFromGroup.get('LocationName')?.setValue(address);
        } else {
          console.log('No address found for this location.');
        }
      } else {
        console.error('Geocoder failed due to:', status);
      }
    });
  }   

}
