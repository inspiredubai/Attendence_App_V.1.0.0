import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { AttendanceSummaryComponent } from './attendance-summary/attendance-summary.component';
import { PageRoutingModule } from './page-routing.module';
import { SmartPunchComponent } from './smart-punch/smart-punch.component';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { CheckoutComponent } from './checkout/checkout.component';
import { LeaveEntryComponent } from './leave-entry/leave-entry.component';
import { AttendanceComponent } from './attendance/attendance.component';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageRoutingModule,
     ReactiveFormsModule,
        HttpClientModule,
        GoogleMapsModule,
        IonicModule.forRoot(),

    ],
  declarations: [AttendanceSummaryComponent,SmartPunchComponent,AttendanceDetailComponent,CheckoutComponent,LeaveEntryComponent,AttendanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule {}
