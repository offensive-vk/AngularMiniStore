import { Component , OnInit } from '@angular/core';
import { RouterLink , Router , NavigationEnd , ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable ,  pipe , of , mergeAll , tap , map , delay} from 'rxjs';

import { IProduct } from '../../Interfaces/Product-Interface';

@Component({
  selector: 'app-admin-product-category',
  standalone: true,
  imports: [ RouterLink ,
    CommonModule ,
    ],
  templateUrl: './admin-product-category.component.html',
  styleUrl: './admin-product-category.component.css'
})
export class AdminProductCategoryComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private http:HttpClient
    ){}
  
  catName !: string;
  products!: IProduct[];
  products$!:Observable<IProduct[]>;
  subCatName !: string;
  loader: boolean = true;
  message: boolean = false;

  ngOnInit(){
    this.route.params.subscribe(() => {
      this.catName = this.route.snapshot.params['category'];
    });
    
    this.products$ = this.http.get<IProduct[]>('/assets/api/Products.json');
    this.producer();

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
      {
        this.producer();
      }
    });
  }

  producer()
  {
    this.products = [];
    this.message = false;
    this.loader = true;

    of(this.products$).pipe(
      mergeAll(),
      map(p => p.filter(p => p.category == this.catName || p.subCategory == this.catName)),
      delay(1000),
      tap(p => {
        this.loader = false;
        p.length > 0 ? this.products = p : this.message = true;
      })
      ).subscribe();

  }
  
}
