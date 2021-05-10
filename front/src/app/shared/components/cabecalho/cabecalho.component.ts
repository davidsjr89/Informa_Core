import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {
  @Input() Titulo!: string;
  @Input() TituloBotaoAdicionar?: string;
  @Input() TituloBotaoRetorno?: string;
  @Input() mostrarRetorno = false;
  @Input() UrlAdicionar?: string;
  @Input() UrlRetorno?: string;
  constructor() { }

  ngOnInit(): void {
  }

}
