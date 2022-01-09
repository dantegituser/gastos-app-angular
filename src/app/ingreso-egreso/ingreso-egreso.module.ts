import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { NgChartsModule } from "ng2-charts";
import { DashboardRoutesModule } from "../dashboard/dashboard-routes.module";

import { DashboardComponent } from "../dashboard/dashboard.component";
import { OrdenIngresoPipe } from "../pipes/orden-ingreso.pipe";
import { SharedModule } from "../shared/shared.module";
import { DetalleComponent } from "./detalle/detalle.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { ingresoEgresoReducer } from "./ingreso-egreso.reducer";

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule
  ],
  exports:[

  ]
})
export class IngresoEgresoModule{}
