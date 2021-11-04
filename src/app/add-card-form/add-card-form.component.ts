import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-add-card-form',
  templateUrl: './add-card-form.component.html',
  styleUrls: ['./add-card-form.component.css']
})
export class AddCardFormComponent implements OnInit {

  constructor(public cardService: CardService, public router: Router) { }

  newCardForm = new FormGroup({
    cardOwnerName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(5)
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16)
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]),
    expirationDate: new FormControl('', [
      Validators.required
    ]),
  })

  get cardOwnerName() {
    return this.newCardForm.get('cardOwnerName')
  }

  get cardNumber() {
    return this.newCardForm.get('cardNumber')
  }

  get securityCode() {
    return this.newCardForm.get('securityCode')
  }

  get expirationDate() {
    return this.newCardForm.get('expirationDate')
  }

  ngOnInit(): void {
  }

  createCard() {
    // console.log(this.newCardForm.value, '<<<<form add')
    this.cardService.createCard(this.newCardForm.value)
    .subscribe((res: any) => {
      if(res) {
        // console.log(res, '<<<res')

        this.newCardForm.reset()
        this.router.navigate(['/home'])

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
          title: res.message
        });
      }
    },
    err => {
      Swal.fire(err, 'invalid input')
    }
    )
  }
}
