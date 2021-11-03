import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  signinForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ])
  })

  get email() {
    return this.signinForm.get('email')
  }

  get password() {
    return this.signinForm.get('password')
  }

  ngOnInit(): void {
  }

  signin() {
    console.log(this.signinForm, '<<< signin form')

    this.authService.signIn(this.signinForm.value)
    .subscribe((res: any) => {
      if(res) {
        console.log(res, '<<res login')

        this.authService.setAuthorizationToken(res.token)
        this.signinForm.reset()
        this.router.navigate(['/home'])

        //==alert==
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
      } 
    },
    err => {
      // console.log("ke trigger")
      // alert(err)
      Swal.fire(err, 'invalid input')
    }
    )
  }
}
