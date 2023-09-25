import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
    offersList: Product[] = []; // قائمة العروض
    currentPage: number = 1; // الصفحة الحالية
    itemsPerPage: number = 9; // عدد العناصر في كل صفحة
    totalPages: number = 1; // إجمالي عدد الصفحات
    displayedOffers: Product[] = []; // العروض المعروضة حاليًا على الصفحة
    totalPagesArray: number[] = []; // مصفوفة تحتوي على أرقام الصفحات

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getOffers().subscribe(
            (res) => {
                this.offersList = res;
                this.totalPages = Math.ceil(this.offersList.length / this.itemsPerPage);
                this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
                this.changePage(1); // عرض الصفحة الأولى عند التحميل
            },
            (err) => {
                console.log(err);
            }
        );
    }

    // تغيير الصفحة
    changePage(pageNumber: number) {
        if (pageNumber < 1 || pageNumber > this.totalPages) {
            return; // تجنب الأخطاء عند الصفحات الغير موجودة
        }

        this.currentPage = pageNumber;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.displayedOffers = this.offersList.slice(startIndex, endIndex);
    }
}
