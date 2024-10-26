import { Component , OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { pipe , tap , map, from , Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { IProduct } from '../../Interfaces/Product-Interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ RouterLink ,
    CarouselModule,
    CommonModule
    ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private http:HttpClient){}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 3 }
    },
    nav: true
  };

  products !: IProduct[];
  digitals !: IProduct[];
  products$ !: Observable<IProduct[]>;

  ngOnInit(){
    this.products$ = this.http.get<IProduct[]>('/assets/api/Products.json');
    from(this.products$).pipe(
      tap(i => this.products = i),
      map(digitals => digitals.filter(d => d.category == "Digital")),
      tap(d => this.digitals = d)
      ).subscribe();
  }
}