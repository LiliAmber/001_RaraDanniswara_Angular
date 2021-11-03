import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Card } from '../Models/Card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-edit-card-form',
  templateUrl: './edit-card-form.component.html',
  styleUrls: ['./edit-card-form.component.css']
})
export class EditCardFormComponent implements OnInit {

  cardId: number
  card: Card = {} as Card

  constructor(private activatedRoute: ActivatedRoute, private cardService: CardService, public router: Router) { 
    this.cardId = this.activatedRoute.snapshot.params.id
  }

  editCardForm = new FormGroup({
    paymentDetailId: new FormControl(''),
    cardOwnerName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ]),
    cardNumber: new FormControl('', [
      Validators.minLength(16),
      Validators.required
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    expirationDate: new FormControl('', [
      Validators.required
    ]),
  })

  get cardOwnerName() {
    return this.editCardForm.get('cardOwnerName')
  }

  get cardNumber() {
    return this.editCardForm.get('cardNumber')
  }

  get securityCode() {
    return this.editCardForm.get('securityCode')
  }

  get expirationDate() {
    return this.editCardForm.get('expirationDate')
  }

  ngOnInit(): void {
    this.getCardById(this.cardId)
  }

  getCardById(id: number) {
    this.cardService
    .getCardById(id)
    .subscribe(s => {
      this.card = s

      this.editCardForm.controls['paymentDetailId'].setValue(s.paymentDetailId)
      this.editCardForm.controls['cardOwnerName'].setValue(s.cardOwnerName)
      this.editCardForm.controls['cardNumber'].setValue(s.cardNumber)
      this.editCardForm.controls['securityCode'].setValue(s.securityCode)
      this.editCardForm.controls['expirationDate'].setValue(s.expirationDate)
    })
  }

  updateCard(id: number) {
    console.log(this.editCardForm.value, '<<<form edit')

    this.cardService
    .updateCard(id, this.editCardForm.value)
    .subscribe((res: any) => {
      console.log(res, '<<<res')
      if(res) {
        this.editCardForm.reset()
        this.router.navigate(['/home'])
      }
    })
  }
}
