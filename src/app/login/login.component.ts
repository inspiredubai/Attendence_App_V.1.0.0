import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,

})
export class LoginComponent  implements OnInit {
  constructor(private router: Router) {}
ngOnInit(): void {
  
}
onLogin() {
    // Perform authentication logic here (if needed)
    // If successful, navigate to the dashboard
    this.router.navigate(['/home']);
  }
  
}
