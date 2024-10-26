import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { delay, map, mergeAll, Observable, of, tap } from "rxjs";

import { IProduct } from "../../Interfaces/Product-Interface";

@Component({
  selector: "app-admin-product-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./admin-product-details.component.html",
  styleUrl: "./admin-product-details.component.css",
})
export class AdminProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  prouctId!: number;
  product!: IProduct[];
  product$!: Observable<IProduct[]>;
  loader: boolean = true;
  message: boolean = false;

  ngOnInit() {
    this.prouctId = this.route.snapshot.params["id"];
    this.product$ = this.http.get<IProduct[]>("/assets/api/Products.json");
    of(this.product$).pipe(
      mergeAll(),
      map((p) => p.filter((p) => p.id == this.prouctId)),
      delay(1000),
      tap((p) => {
        this.loader = false;
        p.length > 0 ? this.product = p : this.message = true;
      }),
    ).subscribe();
  }
}
