import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSelect, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styleUrls: ['./attendance-summary.component.scss'],
  standalone: false,

})
export class AttendanceSummaryComponent  implements OnInit {
  popoverOpen = false;
  popoverEvent: any = null;
  SummeryFromGroup:any;
  ListData: any;
  constructor(private navCtrl: NavController,
              private router: Router,
              private fb: UntypedFormBuilder, 
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

  this.SummeryFromGroup = this.fb.group({
    
    FromDate: [new Date()],
    ToDate: [new Date()],

      
         });
  }

  getReport(){
 let payload={
  FromDate:this.SummeryFromGroup.get('FromDate').value!=null?this.SummeryFromGroup.get('FromDate').value:null,
  ToDate:this.SummeryFromGroup.get('ToDate').value!=null?this.SummeryFromGroup.get('ToDate').value:null,
 }

    this.dataservice.Reportattendancedatal(payload).subscribe((res)=>{
      this.ListData=res
    })
  }
}
