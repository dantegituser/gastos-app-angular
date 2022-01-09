import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {


  constructor(
    private firestore: AngularFirestore,
    private authservice: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const uid = this.authservice.user.uid;
    delete ingresoEgreso.uid;
    return this.firestore.doc(`${uid}/ingreso-egreso`)
    .collection('items')
    .add({...ingresoEgreso})
  }

  initIngresosEgresosListener(uid: string | null){
    return this.firestore.collection(`${uid}/ingreso-egreso/items`)
    .snapshotChanges()
    .pipe(
      map(snapshot => {
        return snapshot.map(doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          })
        )
      })
    )
  }

  borrarIngresoEgreso(idItem: string){
    const uid = this.authservice.user.uid;
    return this.firestore.doc(`${uid}/ingreso-egreso/items/${idItem}`)
    .delete()
  }
}
