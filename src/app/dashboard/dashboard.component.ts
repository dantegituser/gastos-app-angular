import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as iEActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSub!: Subscription;
  ingresosSub!: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingregrservice: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(({user}) => {
     this.ingresosSub = this.ingregrservice.initIngresosEgresosListener(user!.uid)
      .subscribe(ingresosEgresosFB => {
        this.store.dispatch(iEActions.setItems({items: ingresosEgresosFB}))

      })
    })
  }
  ngOnDestroy(): void {
    this.ingresosSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}
