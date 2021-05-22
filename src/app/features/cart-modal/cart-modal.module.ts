import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { CartModalRoutingModule } from "./cart-modal-routing.module"
import { CartModalComponent } from "./cart-modal.component"
import { IonicModule } from "@ionic/angular"

@NgModule({
	declarations: [CartModalComponent],
	imports: [CommonModule, CartModalRoutingModule, IonicModule]
})
export class CartModalModule {}
