import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { mergeAll, of, pipe, tap, toArray } from "rxjs";

import { IProduct } from "../../Interfaces/Product-Interface";
import { categories } from "../../Interfaces/Category-Enum";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) {}

  productLength!: number;
  maxCategory!: string;
  maxCategoryLength: number = 1;
  categories = Object.values(categories);

  ngOnInit() {
    let product$ = this.http.get("/assets/api/Products.json");
    of(product$).pipe(
      mergeAll(),
      tap((i) => {
        this.productLength = Object.keys(i).length;

        let myProduct = Object.values(i);
        for (let c in this.categories) {
          let counter = 0;
          for (let pCategory in myProduct) {
            if (this.categories[c] == myProduct[pCategory].category) {
              counter++;
            }
          }
          if (counter > this.maxCategoryLength) {
            this.maxCategory = this.categories[c];
          }
        }
      }),
    ).subscribe();
  }
}
