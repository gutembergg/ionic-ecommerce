import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { IProduct } from "src/app/interfaces/IProduct"
import { ProductsService } from "src/app/services/products/products.service"

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
	products$: Observable<IProduct[]>

	constructor(private _productsService: ProductsService) {}

	ngOnInit(): void {
		this.products$ = this._productsService.getProducts()
	}
}
