import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authservice:AuthService,
    private router: Router
  ){}
  canActivate(): Observable<boolean>{
    return this.authservice.isAuth().pipe(
      tap(isaut => {
        if(!isaut){
          this.router.navigate(['/login'])
        }
      })
    );
  }
  canLoad(): Observable<boolean>{
    return this.authservice.isAuth().pipe(
      tap(isaut => {
        if(!isaut){
          this.router.navigate(['/login'])
        }
      }),
      take(1)
    );
  }

}
