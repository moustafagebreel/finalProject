import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private baseURL = environment.apiUrl + 'categories';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]>{
    let headers = this.authService.setHeaders();
    return this.http.get<Category[]>(`${this.baseURL}`,  { headers: headers })
    .pipe(map( data => {
      return data['categories'];
    }));
  }

  getCategoryProducts(idCategory): Observable<Product[]>{
    let headers = this.authService.setHeaders();
    return this.http.get<Category[]>(`${this.baseURL}/${idCategory}`,  { headers: headers })
    .pipe(map( data => {

      data['categoryProducts'].map( d => {
        d.imgUrl = d.images.url+"-500-auto?width=500&height=auto&aspect=true";
        delete d.images;
      })


      return data['categoryProducts'];
    }));
  }
}
