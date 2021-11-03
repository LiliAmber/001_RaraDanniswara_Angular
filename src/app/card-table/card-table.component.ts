import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { Card } from '../Models/Card';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent implements OnInit {
  cardId: number
  cards: Card[] = []

  constructor(private cardService: CardService, private activatedRoute: ActivatedRoute) { 
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
    console.log(id, '<<<id del')
    this.cardService
    .deleteCard(id)
    .subscribe((res: any) => {
      if(res) {
        console.log(res, '<<<res delete')

        this.getCards()
      }
    })
  }
}
