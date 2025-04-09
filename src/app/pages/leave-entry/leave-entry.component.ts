import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-entry',
  templateUrl: './leave-entry.component.html',
  styleUrls: ['./leave-entry.component.scss'],
  standalone: false,

})
export class LeaveEntryComponent  implements OnInit {
  popoverOpen = false;
  popoverEvent: any = null;
  constructor(   private router: Router,) { }
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
  ngOnInit() {}

}
