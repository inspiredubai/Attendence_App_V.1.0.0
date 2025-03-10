import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.scss'],
  standalone: false,

})
export class AttendanceDetailComponent  implements OnInit {
  attendanceFromGroup:any;
  popoverOpen = false;
   popoverEvent: any = null;
   formattedDate: string = '';
   showPicker: boolean = false;
  url: any;
  userDetails: any;
 
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
console.log("Retrieved User:", this.userDetails);

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
      PunchMode:[false, ],
      Active:[false,],
      });
      this.datashow()
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
  
}
 