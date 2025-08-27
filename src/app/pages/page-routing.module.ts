import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceSummaryComponent } from './attendance-summary/attendance-summary.component';
import { SmartPunchComponent } from './smart-punch/smart-punch.component';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LeaveEntryComponent } from './leave-entry/leave-entry.component';
import { AttendanceComponent } from './attendance/attendance.component';

 
const routes: Routes = [
  {
    path: '',
    component: AttendanceSummaryComponent
  },
  {
    path: 'smartpunch',
    component:  SmartPunchComponent
  },
  {
    path: 'attendancedetail',
    component:  AttendanceDetailComponent
  },
  {
    path: 'Check-Out',
    component:  CheckoutComponent
  },
  {
    path: 'leaveentry',
    component: LeaveEntryComponent 
  },
   {
    path: 'attendance',
    component: AttendanceComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  PageRoutingModule {}
