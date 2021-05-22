import { Component, OnInit } from "@angular/core"
import { ProductsService } from "src/app/services/products/products.service"
import { take } from "rxjs/operators"
import { AlertController, ModalController } from "@ionic/angular"

@Component({
	selector: "app-cart-modal",
	templateUrl: "./cart-modal.component.html",
	styleUrls: ["./cart-modal.component.scss"]
})
export class CartModalComponent implements OnInit {
	products = []

	constructor(
		private _productService: ProductsService,
		private _modalCtrl: ModalController,
		public alertCtrl: AlertController
	) {}

	ngOnInit(): void {
		const cartItems = this._productService.cart.value[0]

		console.log("cartItems: ", cartItems)
		this._productService
			.getProducts()
			.pipe(take(1))
			.subscribe((allProducts) => {
				this.products = allProducts
					.filter((prod) => cartItems[prod.id])
					.map((product) => {
						return { ...product, count: cartItems[product.id] }
					})
			})
	}

	close() {
		this._modalCtrl.dismiss()
	}

	async checkOut() {
		const alert = await this.alertCtrl.create({
			cssClass: "my-custom-class",
			header: "Success",
			subHeader: "Subtitle",
			message: "This is an alert message.",
			buttons: ["OK"]
		})

		await alert.present()
		await this._productService.checkoutCart()
		this._modalCtrl.dismiss()
	}
}
