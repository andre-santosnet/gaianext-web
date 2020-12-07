import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../servicos/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

export class Filtro {
  nome: string = "";
  porte: string = "";
}


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public loading: boolean;
  public filtro: Filtro;
  public lista: any = [];
  public page;
  public pageSize;
  public listaPorte: any = [];

  public formfiltro: FormGroup;

  constructor(
    private _ClienteService: ClienteService,
    private route: ActivatedRoute,
    private rota: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {

    this.filtro = new Filtro();
    this.formfiltro = this.formBuilder.group({
      nome: [''],
      porte: [''],
    });

  }

  ngOnInit(): void {
    this.obterListaCliente();
    this.obterListaPorte();
    this.page = 1;
    this.pageSize = 5;
  }

  obterListaCliente() {
    this.loading = true;

    this._ClienteService.ObterListaCliente(this.filtro).subscribe(
      res => {
        console.log(res);
        if (res.situacao == 'SUCESSO') {
          this.lista = res.retorno;
        }
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }


  excluirCliente(idCliente) {
    this.loading = true;
    this._ClienteService.ExcluirCliente(idCliente).subscribe(
      res => {
        if (res.situacao == 'SUCESSO') {
          this.obterListaCliente();
        }
        this.loading = false;
        this.toastr.success('Sucesso', 'Cliente excluído!')
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  obterListaPorte(){
    this.loading = true;
    this._ClienteService.ObterPorteCliente().subscribe(
      res => {
        if (res.situacao == 'SUCESSO') {
          this.listaPorte = res.retorno;
        }
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  filtrarCliente(){
    this.loading = false;
    console.log(this.formfiltro.value);
    this._ClienteService.ObterListaCliente(this.formfiltro.value).subscribe(
      (res) => {
        this.lista = res.retorno;
        this.loading = false;
      },
      (err) => {
        console.log('erro obter lista credenciados', err);
        this.loading = false;
      });
  }

  incluirCliente(){
    this.rota.navigateByUrl('incluir');
  }

}

