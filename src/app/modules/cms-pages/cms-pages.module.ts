import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CmsPagesRoutingModule } from './cms-pages-routing.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    AboutUsComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    CmsPagesRoutingModule,
    FormsModule
  ]
})
export class CmsPagesModule { }
