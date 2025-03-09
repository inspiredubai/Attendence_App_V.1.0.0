import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
 
})
export class LoginComponent implements OnInit {
  loginForm: any;


  constructor(private router: Router, private toastController: ToastController, private navCtrl: NavController,   
    private apiLogin: LoginService
,    private fb: UntypedFormBuilder,
  ) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Username: [null, [Validators.required]],
      Password: [null, [Validators.required]],
      companyId: [-1, [Validators.required]],
      Rememberme: [false, [Validators.required]],
    });
  }
  // onLogin() {
  //     // Perform authentication logic here (if needed)
  //     // If successful, navigate to the dashboard
  //     this.router.navigate(['/home']);
  //   }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
      position: 'middle',
    });
    toast.present();
    // const formvalues = this.loginForm.value as User;
    // formvalues.companyId=1;
    // this.apiLogin.loginRequest(formvalues).subscribe((k: any) => {
    //   if (k.valid) {

    //     this.router.navigate(['/dashboard']);
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Alert',
    //       detail: k.message,
    //     });
    //   }else{
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Alert',
    //       detail: k.message,
    //     });
    //   }
    // });

  }
  onLogin(){
    this.apiLogin.loginRequest(this.loginForm.value).subscribe((k: any) => {
        if (k.valid) {
          this.router.navigate(['/home']);
          this.presentToast(k.message);

        }else{
          this.presentToast(k.message);

        }

      });
 
  }
  
}
