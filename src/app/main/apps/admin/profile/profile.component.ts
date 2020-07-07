import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  perfilForm: FormGroup;
  passwordChangeForm: FormGroup;

  constructor(
    private perfilFormBuilder: FormBuilder,
    private passwordFormBuilder: FormBuilder,
  ) {
    this.inicializarForms();
    this.iniPasswordForm();
   }

  inicializarForms() {
    this.perfilForm = this.perfilFormBuilder.group({
      apellidos: ['', []],
      nombres: ['', []],
      email: ['', []]
    });
  }

  iniPasswordForm(){
    this.passwordChangeForm = this.passwordFormBuilder.group({
      nuevaPassword: ['', []],
      confirmaNuevaPassword: ['', []]
    })
  }


  ngOnInit(): void {
  }

}
