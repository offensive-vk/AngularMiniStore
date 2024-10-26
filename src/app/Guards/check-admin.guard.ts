import { inject } from '@angular/core';
import { CanActivateFn , Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';

export const checkAdminGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);
  let isAdmin: boolean = adminService.checkAdmin();
  if(isAdmin)
    return true;
  else
    return router.createUrlTree(['login']);
};
