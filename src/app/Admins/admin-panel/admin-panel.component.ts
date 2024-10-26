import { AfterViewInit, Component } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { of, pipe, tap } from "rxjs";

import { categories, subCategory } from "../../Interfaces/Category-Enum";

@Component({
  selector: "app-admin-panel",
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: "./admin-panel.component.html",
  styleUrl: "./admin-panel.component.css",
})
export class AdminPanelComponent {
  constructor(private router: Router) {}

  categories = Object.values(categories);
  subCategory = Object(subCategory);
  subCategories: string[] = [];
  subCatHovered: boolean = false;

  getSubCategory(categoryName: string) {
    let sub = of(subCategory).pipe(
      tap((data) => this.subCategories = data[categoryName]),
    ).subscribe();
    this.subCatHovered = true;
  }

  closeSubCategory() {
    this.subCatHovered = false;
  }

  gotoCategory(category: string) {
    this.router.navigate(["admin-panel/category", category]);
  }
}
