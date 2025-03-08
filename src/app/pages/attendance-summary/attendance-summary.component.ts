import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSelect, NavController } from '@ionic/angular';

@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styleUrls: ['./attendance-summary.component.scss'],
  standalone: false,

})
export class AttendanceSummaryComponent  implements OnInit {
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
