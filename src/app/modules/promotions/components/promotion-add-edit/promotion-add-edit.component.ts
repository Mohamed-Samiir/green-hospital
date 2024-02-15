import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IpromotionAddEdit } from 'src/app/core/interfaces/promotions/ipromotion-add-edit';

@Component({
  selector: 'app-promotion-add-edit',
  templateUrl: './promotion-add-edit.component.html',
  styleUrls: ['./promotion-add-edit.component.css']
})
export class PromotionAddEditComponent implements OnInit {

  isEdit: boolean = false
  promoId: string = ""
  promoCode: IpromotionAddEdit = {
    codeNameAr: "",
    codeNameEn: "",
    code: "",
    noUsers: 0,
    discount: 0,
    expDate: "",
    classification: "",
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.promoId = param.get("id") || ""
      this.isEdit = param.get("id") ? true : false
      console.log(param.get("id"));

      if (this.isEdit) {
        //get promotion by id
      }
    })
  }

  onSubmit() {
    if (this.isEdit) {
      //edit promo
    }
    else {
      //add promo
    }
  }

}
