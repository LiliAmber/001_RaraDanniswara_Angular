import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ])
  })

  get username() {
    return this.signupForm.get('username')
  }

  get email() {
    return this.signupForm.get('email')
  }

  get password() {
    return this.signupForm.get('password')
  }

  ngOnInit(): void {
  }

  signup() {
    // console.log(this.signupForm.value)

    this.authService.signUp(this.signupForm.value)
    .subscribe((res: any) => {
      
      if(res) {
        // console.log(res)

        this.signupForm.reset()
        this.router.navigate(['/signin'])

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
          title: "you can sign in now"
        });
      }
    },
    err => {
      Swal.fire(err, 'invalid input')
    }
    )
  }
}
