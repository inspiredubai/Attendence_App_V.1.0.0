import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

 
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
   {
      path: 'passwordchange',
      component: PasswordChangeComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
