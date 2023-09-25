import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-quantity-button',
  templateUrl: './cart-quantity-button.component.html',
  styleUrls: ['./cart-quantity-button.component.scss']
})
export class CartQuantityButtonComponent implements OnInit {

  @Input() product: Product;
  @Input() canNotify?: boolean = false;
  @Input() canRemoveFromCart?: boolean = false;
  @Output() setTotalPurchase = new EventEmitter<Product>();

  isClicked: boolean = false;
  isLoading: boolean = false;
  
  constructor(private cartService: CartService, 
    private tokenService: TokenService, 
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  addToCart(){
    this.isClicked = true;
    this.isLoading = true;
    this.product.quantityPurchase = 1;
    //Only if user is auth can add to cart
    if(this.tokenService.isLoggedIn.value){
      this.cartService.addItemToCart(this.product.id , this.product.quantityPurchase).subscribe(
        (res) => {
          this.product.quantityPurchase = 1;
          this.isClicked = false;
          this.isLoading = false;
          if(this.canNotify){
            this.toastr.success('Product added to cart!', '', {
              timeOut: 1500
            });
          }
          this.cartService.updateNumberItemsCart();
        },
        (err) => {
          console.log(err);
          this.isClicked = false;
          this.isLoading = false;
        }
      )
    }
    //Otherwise should log ing
    else{
      let url = this.router.url
      this.authService.redirectUrl = url;
      this.router.navigate([this.authService.loginUrl]);
    }
  }


  removeItemFromCart(){
    this.isLoading = true;
    this.cartService.removeCartItem(this.product.id).subscribe(
      (res) => {
        this.isClicked = false;
        this.product.quantityPurchase = 0;
        this.isLoading = false;
        this.cartService.updateNumberItemsCart();
        if(this.canNotify){
          this.toastr.info('Product removed.','', {
            timeOut: 1500
          });
        }
      }
    )
  }

  addQuantityPurchase(e) {
    e.preventDefault();
    this.isLoading = true;
    if (this.product.quantity > this.product.quantityPurchase) {
      this.product.quantityPurchase++;
      this.modifyQuantityPurchaseOfItem();
    }
  }

  substractQuantityPurchase(e) {
    e.preventDefault();
    this.isLoading = true;
    if (!(this.product.quantityPurchase == 1)) {
      this.product.quantityPurchase--;
      this.modifyQuantityPurchaseOfItem();
    }
    else if(this.canRemoveFromCart){
      this.removeItemFromCart();
    }
    else{
      this.isLoading = false;
    }
  }

  modifyQuantityPurchaseOfItem(){
    this.cartService.modifyQuantityPurchaseItem(this.product.id, this.product.quantityPurchase).subscribe(
      (res) => {
        this.isLoading = false;
        this.cartService.updateNumberItemsCart();
        this.setTotalPurchase.emit(this.product);
      },
      (err) => {
        console.log(err)
        this.isLoading = false;
      }
    );
  }

}
