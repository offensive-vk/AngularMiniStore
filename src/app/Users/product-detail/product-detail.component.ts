import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { from, map, Observable, pipe, tap } from "rxjs";

import { IProduct } from "../../Interfaces/Product-Interface";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./product-detail.component.html",
  styleUrl: "./product-detail.component.css",
})
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  id!: number;
  product!: IProduct[];
  product$!: Observable<IProduct[]>;

  ngOnInit() {
    this.id = this.route.snapshot.params["pId"];
    this.product$ = this.http.get<IProduct[]>("/assets/api/Products.json");

    from(this.product$).pipe(
      map((p) => p.filter((p) => p.id == this.id)),
      tap((p) => this.product = p),
    ).subscribe();
  }
}
