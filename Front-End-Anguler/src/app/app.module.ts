import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/accounts/login/login.component';
import { SignupComponent } from './components/accounts/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { OffersComponent } from './components/home/offers/offers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoryComponent } from './components/category/category.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';

// Externals
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { CartQuantityButtonComponent } from './components/cart/cart-quantity-button/cart-quantity-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImageLoaderDirective } from './shared/directives/image-loader.directive';
import { DatePipe } from '@angular/common';

export const MY_FORMATS = {
	parse: {
		dateInput: 'DD/MM/YYYY',
	},
	display: {
		dateInput: 'DD/MM/YYYY',
		monthYearLabel: 'MM YYYY',
		dateA11yLabel: 'DD/MM/YYYY',
		monthYearA11yLabel: 'MM YYYY',
	},
};

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LoginComponent,
		SignupComponent,
		HomeComponent,
		ProfileComponent,
		CarouselComponent,
		OffersComponent,
		ProductComponent,
		ProductCardComponent,
		CategoryComponent,
		NotfoundComponent,
		CartComponent,
		CartItemComponent,
		CartQuantityButtonComponent,
		FooterComponent,
		ImageLoaderDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		// Externals
		BrowserAnimationsModule,
		MatNativeDateModule,
		MatDatepickerModule,
		ToastrModule.forRoot(),
		NgxSpinnerModule
	],
	providers: [
		MatDatepickerModule,
		DatePipe,
		{ provide: MAT_DATE_LOCALE, useValue: 'es_CO' }, //you can change useValue
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
