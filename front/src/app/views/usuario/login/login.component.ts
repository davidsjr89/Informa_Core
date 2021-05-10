import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { UsuarioService } from './../../../services/usuario.service';
import { ValidarCamposService } from 'src/app/services/validar-campos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private validacao: ValidarCamposService,
    private usuarioService: UsuarioService
  ) {}
  get f() {
    return this.formulario.controls;
  }
  ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }
  Submit() {
    this.usuarioService.login(this.formulario.value).subscribe((user) => {
      const usuario = user as any;
      localStorage.setItem('token', user.token);
      localStorage.setItem('nome', usuario.user.nome);
      localStorage.setItem('roles', usuario.user.roles);
      this.router.navigateByUrl('/');
    });
  }
}
