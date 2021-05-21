import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartModalRoutingModule } from './cart-modal-routing.module';
import { CartModalComponent } from './cart-modal.component';


@NgModule({
  declarations: [
    CartModalComponent
  ],
  imports: [
    CommonModule,
    CartModalRoutingModule
  ]
})
export class CartModalModule { }
