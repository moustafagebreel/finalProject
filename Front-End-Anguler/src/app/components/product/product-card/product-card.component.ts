import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

	@Input() product: Product;
	@Input() buttonCart?: boolean;
	@Input() completeName?: boolean;
	@Input() completePrice?: boolean;
	mousePosition = {
		x: 0,
		y: 0
	};

	constructor(
		public productService: ProductService,
		private router: Router
	) { }

	ngOnInit() {
	}

	onClick($event) {
		// Avoids click event when dragging;
		if (Math.abs(this.mousePosition.x - $event.screenX) <= 30 && Math.abs(this.mousePosition.y - $event.screenY) <= 30) {
			this.router.navigate(['p', this.product.id, this.product.slug]);
		}
	}

	onMouseDown($event) {
		this.mousePosition.x = $event.screenX;
		this.mousePosition.y = $event.screenY;
	}

	getDiscountPrice() {
		let discount = this.product.price * (this.product.offerDiscount / 100);
		return this.product.price - discount;
	}

}
