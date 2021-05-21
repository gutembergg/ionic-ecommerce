import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from "@angular/core"
import { Animation, AnimationController, ModalController } from "@ionic/angular"
import { Observable } from "rxjs"
import { IProduct } from "src/app/interfaces/IProduct"
import { ProductsService } from "src/app/services/products/products.service"
import { CartModalComponent } from "../cart-modal/cart-modal.component"

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, AfterViewInit {
	products$: Observable<IProduct[]>

	@ViewChild("btnFab", { read: ElementRef }) cartBtn: ElementRef
	cartAnimation: Animation

	cart = {}

	constructor(
		private _productsService: ProductsService,
		private _animationCtrl: AnimationController,
		private _modalCtrl: ModalController
	) {}

	ngOnInit(): void {
		this.products$ = this._productsService.getProducts()
		this._productsService.cart.subscribe((response) => {
			console.log("My Cart: ", response)
			this.cart = response[0]
		})
	}

	ngAfterViewInit() {
		this.cartAnimation = this._animationCtrl.create("btn-fab-animation")
		this.cartAnimation
			.addElement(this.cartBtn.nativeElement)
			.keyframes([
				{ offset: 0, transform: "scale(1)" },
				{ offset: 0.5, transform: "scale(1.2)" },
				{ offset: 0.8, transform: "scale(0.9)" },
				{ offset: 1, transform: "scale(1)" }
			])
			.duration(300)
			.easing("ease-out")
	}

	addToCart($event: MouseEvent, product: IProduct) {
		$event.stopPropagation()
		this._productsService.addTocart(product.id)
		this.cartAnimation.play()
	}

	removeToCart($event: MouseEvent, product: IProduct) {
		$event.stopPropagation()
		this._productsService.removeToCart(product.id)
		this.cartAnimation.play()
	}

	async openCart() {
		const modal = await this._modalCtrl.create({
			component: CartModalComponent
		})

		await modal.present()
	}
}
