import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	cartItems: Product[] = null;
	finalTotalPrice: number = 0;
	realTotalPrice: number = 0;
	totalDiscounts: number = 0;
	cartIsLoading: boolean = true;
	isUpdatingTotal: boolean = true;


	constructor(
		private cartService: CartService,
		public productService: ProductService,
	) { }

	ngOnInit() {
		this.cartService.getCartItems().subscribe(
			(res) => {
				res.forEach(item => {
					this.setTotalPurchase(item, true);
					item.isLoading = {
						'removing': false
					}
				});

				this.cartItems = res;
				this.updateCheckoutPrices();
				this.cartIsLoading = false;
			},
			(err) => {
				console.log(err)
				this.cartIsLoading = false;
			}
		);
	}


	getDiscountPrice(product) {
		let discount = product.price * (product.offerDiscount / 100);
		return product.price - discount;
	}

	setRealPriceAndDiscounts() {

		for (let item of this.cartItems) {
			this.realTotalPrice = this.realTotalPrice + (item.quantityPurchase * item.price);
		}

		//FinalPrice must've been set before.
		this.totalDiscounts = this.realTotalPrice - this.finalTotalPrice;

	}

	setFinalPrice() {
		for (let item of this.cartItems) {
			this.finalTotalPrice = this.finalTotalPrice + item.totalPurchase;
		}

	}

	setTotalPurchase(item, first?) {
		//first: Boolean value used only in the foreach on ngInit. This method is later only called from
		// child component app-cart-quantity-button
		if (item.offerDiscount) {
			item.totalPurchase = item.quantityPurchase * this.getDiscountPrice(item);
		}
		else {
			item.totalPurchase = item.quantityPurchase * item.price;
		}
		if (!first) {
			this.updateCheckoutPrices();
		}
	}

	updateCheckoutPrices() {
		this.isUpdatingTotal = true;
		this.finalTotalPrice = 0;
		this.realTotalPrice = 0;
		this.totalDiscounts = 0
		this.setFinalPrice();
		this.setRealPriceAndDiscounts();
		setTimeout(() => {
			this.isUpdatingTotal = false;
		}, 1000)
	}

	removeItemFromCart(e, item) {
		e.preventDefault();
		item.isLoading.removing = true;
		this.cartService.removeCartItem(item.id).subscribe(
			(res) => {
				this.cartItems = this.cartItems.filter(element => element.id != item.id)
				item.isLoading.removing = false;
				this.cartService.updateNumberItemsCart();
				this.updateCheckoutPrices();
			},
			err => item.isLoading.removing = false
		)
	}

}
