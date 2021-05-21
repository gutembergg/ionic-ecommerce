import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { BehaviorSubject, Observable } from "rxjs"
import { IProduct } from "src/app/interfaces/IProduct"

import { Storage } from "@ionic/storage-angular"
import firebase from "firebase/app"

/* const apiUrl = "https://fakestoreapi.com/products" */

const CART_STORAGE_KEY = "MY_CART"

const INCREMENT = firebase.firestore.FieldValue.increment(1)
const DECREMENT = firebase.firestore.FieldValue.increment(-1)

@Injectable({
	providedIn: "root"
})
export class ProductsService {
	cart: BehaviorSubject<any> = new BehaviorSubject({})
	cartKey = null

	constructor(
		private _http: HttpClient,
		private _firestore: AngularFirestore,
		private storage: Storage
	) {
		this.createStorage()
		this.loadCart()
	}

	async createStorage() {
		await this.storage.create()
	}

	getProducts(): Observable<IProduct[]> {
		return this._firestore
			.collection<IProduct>("products")
			.valueChanges({ idField: "id" })
	}

	async loadCart() {
		const result = await this.storage.get(CART_STORAGE_KEY)

		if (result) {
			this.cartKey = result

			this._firestore
				.collection("carts")
				.valueChanges()
				.subscribe((response) => {
					delete response[0]["lastUpdate"]
					console.log("cart Changed: ", response)

					this.cart.next(response || {})
				})
		} else {
			const fbDocument = await this._firestore.collection("carts").add({
				lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
			})
			console.log("fbDocument: ", fbDocument)
			this.cartKey = fbDocument.id
			await this.storage.set(CART_STORAGE_KEY, this.cartKey)
		}
	}

	addTocart(id: string) {
		this._firestore
			.collection("carts")
			.doc(this.cartKey)
			.update({
				[id]: INCREMENT,
				lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
			})

		this._firestore.collection("products").doc(id).update({
			stock: DECREMENT
		})
	}

	removeToCart(id: string) {
		this._firestore
			.collection("carts")
			.doc(this.cartKey)
			.update({
				[id]: DECREMENT,
				lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
			})

		this._firestore.collection("products").doc(id).update({
			stock: INCREMENT
		})
	}

	async checkoutCart() {
		await this._firestore.collection("orders").add(this.cart.value)

		this._firestore.collection("carts").doc(this.cartKey).set({
			lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
		})
	}
}
