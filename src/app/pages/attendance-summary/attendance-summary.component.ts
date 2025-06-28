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
export class AttendanceSummaryComponent implements OnInit {
  popoverOpen = false;
  popoverEvent: any = null;
  SummeryFromGroup: any;
  ListData: any;
  fromdate: Date | undefined;
  enddate: Date | undefined;
  constructor(private navCtrl: NavController,
    private router: Router,
    private fb: UntypedFormBuilder,
    private dataservice: DataService, private toastService: ToastService
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

    this.SummeryFromGroup = this.fb.group({
      FromDate: [this.getTodayDateString()],
      ToDate: [this.getTodayDateString()],


    });
  }

    goToChangePassword() {
    this.router.navigate(['/login/passwordchange']); // Adjust the route path accordingly
  }
  getTodayDateString(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  
  getReport() {
    const fromDate = this.SummeryFromGroup.get('FromDate')?.value || "01-01-1900";
    const toDate = this.SummeryFromGroup.get('ToDate')?.value || "01-01-1900";

    let payload = {
      FromDate: fromDate,
      ToDate: toDate
    };

    this.dataservice.Reportattendancedatal(payload).subscribe((res) => {
      this.ListData = res;
    });
  }

}
