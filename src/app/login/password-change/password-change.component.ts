import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  standalone: false,

})
export class PasswordChangeComponent implements OnInit {
  ChangePasswordForm: any;
  popoverOpen = false;
  popoverEvent: any = null;
  isLoading: boolean = false;
    showPassword: boolean = false;
    Password: boolean = false;
  userDetails: any;
  constructor(
    private apiLogin: LoginService,
    private fb: UntypedFormBuilder,
    private toastService: ToastService,
    private router: Router,
    private popoverController: PopoverController,
  ) { }

  openPopover(event: Event) {
    this.popoverEvent = event;
    this.popoverOpen = true;
  }
  async selectOption(option: string) {
    await this.popoverController.dismiss();
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
  //     goToChangePassword() {
  //   this.router.navigate(['/login/passwordchange']); // Adjust the route path accordingly
  // }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

    this.ChangePasswordForm = this.fb.group({
      NewPassword: [null, [Validators.required]],
      RepeatPassword: [null, [Validators.required]],
      companyId: [-1, [Validators.required]],
      Rememberme: [false, [Validators.required]],
    },
      { validators: this.passwordsMatchValidator }
    );
  }
  ResetPassword() {
    this.isLoading = true;
    let newPass = this.ChangePasswordForm.get('NewPassword')?.value;
    let UserId = Number(this.userDetails.userId)
    this.apiLogin.changePassword(UserId, newPass).subscribe((k: any) => {
      this.isLoading = false;
      if (k) {
        this.ChangePasswordForm.reset();
        this.router.navigate(['']);
        this.toastService.presentToast('Password has been changed');

      } else {
        this.toastService.presentToastErrror("SomeThing went wrong");
      }
    });
  }
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('NewPassword')?.value;
    const confirmPassword = form.get('RepeatPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
showtogglePassword() {
  this.Password = !this.Password;
}

}
