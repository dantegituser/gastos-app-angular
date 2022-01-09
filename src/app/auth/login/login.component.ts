import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;
  constructor(
    private authservice: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading
    })
  }

  loguearUsuario(){
    if(this.loginForm.invalid){return;}
    this.store.dispatch(uiActions.isLoading())
  //   Swal.fire({
  // title: 'Loading',
  // didOpen: () => {
  //   Swal.showLoading()
  // }});

    const {email, password} = this.loginForm.value;
    this.authservice.loginUsuario(email, password)
    .then(usuario => {
      // Swal.close();
      this.store.dispatch(uiActions.stopLoading())
      this.router.navigate(['/'])

    }).catch(err => {
      this.store.dispatch(uiActions.stopLoading())
      Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: err.message
})
    })

  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();

  }

}
