import { Component } from "@angular/core";

import { ProductsComponent } from "../products/products.component";

@Component({
  selector: "app-index",
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: "./index.component.html",
  styleUrl: "./index.component.css",
})
export class IndexComponent {
}
