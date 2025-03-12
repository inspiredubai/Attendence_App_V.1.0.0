import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  popoverOpen = false;
  popoverEvent: any = null;
  
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
    private toastController: ToastController,private navCtrl: NavController, 
   ) {}
 ngOnInit(): void {
   
 }
 async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    color: 'success',
    position: 'middle',
   });
  toast.present();
}

onCheckIn() {
  // this.presentToast('CheckIn Successful!');
  this.router.navigate(['/attendancedetail'])

}

onCheckOut() {
  // this.presentToast('CheckOut Successful!');
  this.router.navigate(['/Check-Out'])
}
onsmartpunch() {
  this.router.navigate(['/smartpunch']);
}
 onattendancesummary() {
       this.router.navigate(['/attendancesummary']);
   }
  //  onattendancedetail(){
  //   this.router.navigate(['/attendancedetail'])
  //  }
}
