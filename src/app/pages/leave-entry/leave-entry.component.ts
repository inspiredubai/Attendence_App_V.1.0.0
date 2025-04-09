import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
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
  leaveEntryFromGroup:any;
  leaveTypes = [
    { label: 'Casual Leave', value: 'casual' },
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Earned Leave', value: 'earned' },
    { label: 'Maternity Leave', value: 'maternity' },
    { label: 'Paternity Leave', value: 'paternity' }
  ];
  
  constructor(  
     private router: Router,
     private fb: UntypedFormBuilder,
     

  ) { }
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
     this.leaveEntryFromGroup = this.fb.group({
      fromDate : [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      remarks: [null],
      leaveType: [null,],
            })
  }
  submit(){
    console.log("formvalue",this.leaveEntryFromGroup.value)
  }
          

}
