import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { IonicModule } from "@ionic/angular"
import { AngularFireModule } from "@angular/fire"
import { environment } from "src/environments/environment"
import { AngularFirestoreModule } from "@angular/fire/firestore"
import { HttpClientModule } from "@angular/common/http"
import { IonicStorageModule } from "@ionic/storage-angular"

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		IonicModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		IonicStorageModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
