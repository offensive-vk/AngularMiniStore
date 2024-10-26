import { Component, DoCheck } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AdminService } from "../../Services/admin.service";
import { subCategory } from "../../Interfaces/Category-Enum";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements DoCheck {
  constructor(private admin: AdminService, private router: Router) {}

  loggedIn: boolean = false;
  categories = Object(subCategory);

  keys(c: string): string[] {
    return Object.keys(c);
  }

  values(s: string): string[] {
    return Object.values(this.categories[s]);
  }

  ngDoCheck() {
    let loggedIn: boolean = this.admin.checkAdmin();
    loggedIn == true ? this.loggedIn = true : this.loggedIn = false;
  }

  logout() {
    this.admin.logout();
    this.loggedIn = false;
    this.router.navigate([""]);
  }
}
