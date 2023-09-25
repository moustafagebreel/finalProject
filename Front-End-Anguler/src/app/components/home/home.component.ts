import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoriesList: Category[];

  constructor(
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.categoryService.getCategories().subscribe( 
      (res) =>{
        this.categoriesList = res;
        this.spinner.hide();
      },
      (err) => {
        console.log(err)
        this.spinner.hide();
      })
  }

}
