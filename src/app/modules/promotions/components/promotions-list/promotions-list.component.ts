import { Component, OnInit } from '@angular/core';
import { Ipromotion } from 'src/app/core/interfaces/promotions/ipromotion';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.css']
})
export class PromotionsListComponent implements OnInit {

  tableData: Ipromotion[] = [
    {
      id: "1",
      codeNameAr: "string",
      codeNameEn: "string",
      promoCode: "string",
      noUsers: 10,
      used: 2,
      discount: 20,
      expDate: "20-9-2022",
      classification: "string",
    },
    {
      id: "2",
      codeNameAr: "string",
      codeNameEn: "string",
      promoCode: "string",
      noUsers: 10,
      used: 2,
      discount: 20,
      expDate: "20-9-2022",
      classification: "string",
    },
    {
      id: "3",
      codeNameAr: "string",
      codeNameEn: "string",
      promoCode: "string",
      noUsers: 10,
      used: 2,
      discount: 20,
      expDate: "20-9-2022",
      classification: "string",
    },
    {
      id: "4",
      codeNameAr: "string",
      codeNameEn: "string",
      promoCode: "string",
      noUsers: 10,
      used: 2,
      discount: 20,
      expDate: "20-9-2022",
      classification: "string",
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
