import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { delay, map, mergeAll, Observable, of, pipe, tap } from "rxjs";

import { NgxPaginationModule } from "ngx-pagination";

import { IProduct } from "../../Interfaces/Product-Interface";

@Component({
  selector: "app-category",
  standalone: true,
  imports: [RouterLink, CommonModule, NgxPaginationModule],
  templateUrl: "./category.component.html",
  styleUrl: "./category.component.css",
})
export class CategoryComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  category!: string;
  subCategory?: string;
  products$!: Observable<IProduct[]>;
  products!: IProduct[];
  empty: boolean = false;
  loader: boolean = true;

  currentPage: number = 1;
  itemsPerPage: number = 4;

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.category = this.route.snapshot.params["category"];
      this.subCategory = this.route.snapshot.params["subCategory"];
    });

    this.products$ = this.http.get<IProduct[]>("/assets/api/Products.json");
    this.producer(this.category, this.subCategory);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.producer(this.category, this.subCategory);
      }
    });
  }

  producer(cat: string, sub: string | undefined) {
    this.products = [];
    this.loader = true;
    this.empty = false;
    if (cat != "All" && sub == undefined) {
      of(this.products$).pipe(
        mergeAll(),
        delay(1000),
        map((p) => p.filter((product) => product.category == cat)),
        tap((p) => {
          if (p.length > 0) {
            this.loader = false;
            this.empty = false;
            this.products = p;
          } else {
            this.loader = false;
            this.empty = true;
          }
        }),
      ).subscribe();
    } else if (cat == "All") {
      of(this.products$).pipe(
        mergeAll(),
        delay(1000),
        tap((p) => {
          if (p.length > 0) {
            this.loader = false;
            this.empty = false;
            this.products = p;
          } else {
            this.loader = false;
            this.empty = true;
          }
        }),
      ).subscribe();
    } else {
      of(this.products$).pipe(
        mergeAll(),
        delay(1000),
        map((p) =>
          p.filter((product) =>
            product.category == cat && product.subCategory == sub
          )
        ),
        tap((p) => {
          if (p.length > 0) {
            this.loader = false;
            this.empty = false;
            this.products = p;
          } else {
            this.empty = true;
            this.loader = false;
          }
        }),
      ).subscribe();
    }
  }
}
