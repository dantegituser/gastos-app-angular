import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingSub!: Subscription;
  constructor(
    private store: Store<AppStateWithIngreso>,
    private ieservice: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.ingSub = this.store.select('ingresosEgresos')
    .subscribe(({items}) => {
      this.ingresosEgresos = items;
    })
  }

  borrar(uid: string){
    this.ieservice.borrarIngresoEgreso(uid)
    .then(() => {
      Swal.fire('Borrado', 'Item borrado', 'success')
    }).catch(err => {
      Swal.fire('Error', err.message, 'error')

    })

  }

  ngOnDestroy(): void {
    this.ingSub.unsubscribe()
  }
}
