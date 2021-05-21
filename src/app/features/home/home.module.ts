import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { HomeRoutingModule } from "./home-routing.module"
import { HomeComponent } from "./home.component"
import { IonicModule } from "@ionic/angular"
import { CartModalModule } from "../cart-modal/cart-modal.module"

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, IonicModule, CartModalModule]
})
export class HomeModule {}
