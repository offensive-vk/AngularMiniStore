import { Routes } from "@angular/router";

// All Users Section
import { AppComponent } from "./app.component";
import { IndexComponent } from "./Users/index/index.component";
import { ProductDetailComponent } from "./Users/product-detail/product-detail.component";
import { CategoryComponent } from "./Users/category/category.component";

//Admin Section
import { LoginComponent } from "./Admins/login/login.component";
import { AdminPanelComponent } from "./Admins/admin-panel/admin-panel.component";
import { DashboardComponent } from "./Admins/dashboard/dashboard.component";
import { AddProductComponent } from "./Admins/add-product/add-product.component";
import { AdminProductCategoryComponent } from "./Admins/admin-product-category/admin-product-category.component";
import { EditProductComponent } from "./Admins/edit-product/edit-product.component";
import { AdminProductDetailsComponent } from "./Admins/admin-product-details/admin-product-details.component";
import { AdminSearchProductComponent } from "./Admins/admin-search-product/admin-search-product.component";

//Guards
import { checkAdminGuard } from "./Guards/check-admin.guard";

export const routes: Routes = [
  // All Users Sections Routes
  { path: "", component: IndexComponent },
  { path: "product-detail/:pId/:pName", component: ProductDetailComponent },
  { path: "category/:category", component: CategoryComponent },
  { path: "category/:category/:subCategory", component: CategoryComponent },

  //Admin Sections Routes
  { path: "login", component: LoginComponent },
  {
    path: "admin-panel",
    component: AdminPanelComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "add-product", component: AddProductComponent },
      { path: "search", component: AdminSearchProductComponent },
      { path: "category/:category", component: AdminProductCategoryComponent },
      { path: "edit-product/:id", component: EditProductComponent },
      { path: "product-detail/:id", component: AdminProductDetailsComponent },
    ],
    canActivate: [checkAdminGuard],
  },
];
