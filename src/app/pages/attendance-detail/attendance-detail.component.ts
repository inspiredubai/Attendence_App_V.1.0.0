import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.scss'],
  standalone: false,

})
export class AttendanceDetailComponent  implements OnInit {

  popoverOpen = false;
   popoverEvent: any = null;
 
   constructor(private navCtrl: NavController, private router: Router) {}
 
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
     // Perform logout actions like clearing session storage, etc.
     localStorage.clear(); // Example: Clear user session
     sessionStorage.clear();
     
     // Navigate to the login page
     this.router.navigate(['/login']); // OR this.navCtrl.navigateRoot('/login');
   }
 
  ngOnInit() {}

}
// {
//   public int AttendanceID { get; set; }
//   public long AttendanceEmpID { get; set; }
//   public long ProjectID { get; set; }
//   public DateTime? PunchDate { get; set; }
//   public string CheckOut { get; set; }
//   public string Latitude { get; set; }
//   public string Longitude { get; set; }
//   public string LocationName { get; set; }
//   public string ImageFile { get; set; }
//   public string Remarks { get; set; }
//   public bool? PunchMode { get; set; }
//   public bool? Active { get; set; }
// }