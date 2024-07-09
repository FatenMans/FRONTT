import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  selectedRole: string = 'admin';  // Default to admin

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  formModel = this.formBuilder.group({
    username: '',
    userPassword: ''
  })

  ngOnInit(): void { }

  login() {
    console.log(this.formModel.value);
    this.userService.login(this.formModel.value).subscribe({
      next: (response: any) => {
        console.log(response.jwtToken);
        console.log(response.user.role[0].roleName);
        console.log(response)

        this.userAuthService.setRoles(response.user.role[0].roleName);
        this.userAuthService.setToken(response.jwtToken);


        // Navigate based on the user's role
        this.router.navigate(['/home']); // Example route for admin


      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  signUp() {
    this.router.navigate(['/register']);
  }
}