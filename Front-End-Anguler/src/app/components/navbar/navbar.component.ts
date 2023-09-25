import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import {
	debounceTime,
	map,
	distinctUntilChanged,
	filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

	@ViewChild('queryInpunt', { static: false }) queryInpunt: ElementRef;
	foundProducts: Product[];
	_isLoggedIn: boolean;
	_numberItemsCart: number;
	isSearching: boolean = false;
	hideSearchPanel: boolean = true;
	showMessageSearch: boolean = false;
	messageSearch: string = "";
	query: string;
	canRepeatSearchRequest: boolean = false;

	constructor(
		private tokenService: TokenService,
		private authService: AuthService,
		private cartService: CartService,
		public productService: ProductService,
		private router: Router) { }

	@HostListener('document:click', ['$event'])
	handleOutsideClick(event) {
		this.closePanel();
	}

	ngOnInit() {
		this.tokenService.isLoggedIn.subscribe(
			next => { this._isLoggedIn = next }
		)
		this.cartService.numberItemsCart.subscribe(
			next => this._numberItemsCart = next
		)
	}

	ngAfterViewInit() {
		//Observable for Event KeyUp of element queryInpunt
		fromEvent(this.queryInpunt.nativeElement, 'keyup').pipe(
			//Gets value
			map((event: any) => {
				return event.target.value;
			}),
			//Minimum 3 for query
			filter(res => {
				if (res.length <= 2) {
					this.messageSearch = "Search must be at least 3 characters long."
					this.showMessageSearch = true;
					this.hideSearchPanel = false;
				}
				if (res.length <= 0) {
					this.closePanel();
				}

				return res.length >= 3
			}),
			// Time in milliseconds between events
			debounceTime(600),
			// Value must be different from previous
			distinctUntilChanged((valueOne: any, valueTwo: any) => {
				if (valueOne === valueTwo && !this.canRepeatSearchRequest) {
					return true;// This means values are equal, it will not emit the current value
					// Also it can't repeat the search
				}
				else {
					return false;// This means the values are different or it can repeat, so it will emit
				}
			}),
			// subscription for response
		).subscribe(query => this.searchProducts(query));
	}

	onLogOut(event: MouseEvent) {
		event.preventDefault();
		this.authService.logout().subscribe(
			() => {
				this.tokenService.removeToken();
				this.router.navigate(['/']);
			},
			(err) => {
				console.log(err)
				this.tokenService.removeToken();
				this.router.navigate(['/']);
			}
		);
	}

	closePanel() {
		this.hideSearchPanel = true;
		this.query = "";
		this.foundProducts = null;
		this.canRepeatSearchRequest = true;
	}

	searchProducts(query) {
		this.isSearching = true;
		this.hideSearchPanel = false;
		this.foundProducts = null;
		this.canRepeatSearchRequest = false;
		this.showMessageSearch = false;
		this.productService.searchProducts(query).subscribe(
			(res) => {
				this.foundProducts = res;
				this.isSearching = false;
				if (this.foundProducts.length <= 0) {
					this.messageSearch = "No results."
					this.showMessageSearch = true;
				}
			},
			(err) => {
				console.log(err)
				this.isSearching = false;
				this.messageSearch = "No results."
				this.showMessageSearch = true;
			}
		)
	}



}
