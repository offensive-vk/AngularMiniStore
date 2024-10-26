import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor() {}

  isAdmin: boolean = false;

  login() {
    this.isAdmin = true;
  }

  logout() {
    this.isAdmin = false;
  }

  checkAdmin(): boolean {
    return this.isAdmin;
  }
}
