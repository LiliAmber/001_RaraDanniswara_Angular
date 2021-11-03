import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { AuthService } from '../services/auth.service';
import { Card } from '../Models/Card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent implements OnInit {
  cardId: number
  cards: Card[] = []

  constructor(private cardService: CardService, private activatedRoute: ActivatedRoute, private authService: AuthService, public router: Router) { 
    this.cardId = this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    this.getCards()
  }

  getCards() {
    this.cardService
    .getCard()
    .subscribe(c=> this.cards = c)
  }

  deleteCard(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        console.log(id, '<<<id del')
        this.cardService
        .deleteCard(id)
        .subscribe((res: any) => {
          if(res) {
            console.log(res, '<<<res delete')
    
            this.getCards()
          }
        })
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }

  logOut() {
    this.authService
    .clearToken()

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
      title: "Signed out successfully"
    });
  }
}
