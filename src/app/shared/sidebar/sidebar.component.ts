import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  userName: string | undefined = '';
  userSubs!: Subscription;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
    .pipe(
      filter(({user}) => user != null)
    )
    .subscribe(({user}) => this.userName = user?.nombre)
  }

  logout(){
    this.authservice.logout()
    .then(() => {
      this.router.navigate(['/login'])
    })

  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe()
  }

}
