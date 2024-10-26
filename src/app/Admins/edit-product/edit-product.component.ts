import { Component , OnInit , ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { pipe , map , tap , mergeAll , of , Observable } from 'rxjs';

import { IProduct } from '../../Interfaces/Product-Interface';
import { categories , subCategory } from '../../Interfaces/Category-Enum';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule ,
    FormsModule
    ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  constructor(private route:ActivatedRoute,
    private http:HttpClient,
    ){}

  pid!: number;
  product !: IProduct[];
  product$ !: Observable<IProduct[]>;

  categories = Object.values(categories);
  subCategories = Object(subCategory);

  selectedCategory !: string;
  selectedSubCategory !: string[];

  ngOnInit(){
    this.pid = this.route.snapshot.params['id'];
    this.product$ = this.http.get<IProduct[]>('/assets/api/Products.json');
    of(this.product$).pipe(
      mergeAll(),
      map(p => p.filter(p => p.id == this.pid)),
      tap(p => this.product = p)
      ).subscribe();
    
  }

  selectSub()
  {
    of(this.subCategories).pipe(
      tap(sub => this.selectedSubCategory = sub[this.selectedCategory])
      ).subscribe();
  }

}