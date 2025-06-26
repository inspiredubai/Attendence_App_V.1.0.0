import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePage } from './home/home.page';
import { AttendanceSummaryComponent } from './pages/attendance-summary/attendance-summary.component';
import { SmartPunchComponent } from './pages/smart-punch/smart-punch.component';
import { AttendanceDetailComponent } from './pages/attendance-detail/attendance-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LeaveEntryComponent } from './pages/leave-entry/leave-entry.component';
import { PasswordChangeComponent } from './login/password-change/password-change.component';

const routes: Routes = [
   
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./view-message/view-message.module').then( m => m.ViewMessagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'page',
    loadChildren: () => import('./pages/page.module').then(m => m.PageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
   
     {
      path: 'attendancesummary',
      component: AttendanceSummaryComponent
    },
      {
        path: 'Check-Out',
        component:  CheckoutComponent
      }
    ,  {
      path: 'smartpunch',
      component: SmartPunchComponent
    },
      {
        path: 'leaveentry',
        component:  LeaveEntryComponent
      },
      {
        path: 'attendancedetail',
        component:  AttendanceDetailComponent
      }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
