import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { delay, map, mergeAll, Observable, of, pipe, tap } from "rxjs";

import { IProduct } from "../../Interfaces/Product-Interface";

@Component({
  selector: "app-admin-search-product",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./admin-search-product.component.html",
  styleUrl: "./admin-search-product.component.css",
})
export class AdminSearchProductComponent {
  constructor(private http: HttpClient) {}

  result!: string;
  sProducts$!: Observable<IProduct[]>;
  products?: IProduct[];
  loader: boolean = false;

  Search(s: string) {
    if (s.length != 0) {
      this.result = "";
      this.loader = true;
      this.products = [];
      const pattern = new RegExp(s, "gi");
      this.sProducts$ = this.http.get<IProduct[]>("/assets/api/Products.json");
      of(this.sProducts$).pipe(
        mergeAll(),
        map((p) =>
          p.filter((product) =>
            pattern.test(product.name) ||
            pattern.test(product.brand) ||
            pattern.test(product.category)
          )
        ),
        delay(1000),
        tap((p) => {
          if (p.length > 0) {
            this.loader = false;
            this.products = p;
            this.result = "";
          } else {
            this.loader = false;
            this.result = "No such products yet...";
            this.products = [];
          }
        }),
      ).subscribe();
    } else {
      this.result = "Enter something to search!";
    }
  }
}
