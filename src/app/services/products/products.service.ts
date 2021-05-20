import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { Observable } from "rxjs"
import { IProduct } from "src/app/interfaces/IProduct"

import { Storage } from "@ionic/storage-angular"

/* const apiUrl = "https://fakestoreapi.com/products" */

@Injectable({
	providedIn: "root"
})
export class ProductsService {
	constructor(
		private _http: HttpClient,
		private _firestore: AngularFirestore,
		private storage: Storage
	) {
		//this.getuser()
	}

	async getuser() {
		await this.storage.create()
		await this.storage.set("Service", "Mr. test")
	}

	getProducts(): Observable<IProduct[]> {
		return this._firestore
			.collection<IProduct>("products")
			.valueChanges({ idField: "id" })
	}
}
