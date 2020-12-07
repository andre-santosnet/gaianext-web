import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../servicos/cliente.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  public acao: string;
  public loading: boolean;
  public listaPorte: any = [];
  public id :number = 0;
  public formCliente: FormGroup;
  public alterar: any;


  constructor(private _ClienteService: ClienteService,
    private route: ActivatedRoute,
    private rota: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {

    this.formCliente = this.formBuilder.group({
      nome: [''],
      porte: [''],
      id: ['']
    });

    


  }

  ngOnInit(): void {
    this.obterListaPorte();
    this.acao = this.route.snapshot.url[0].path;
    
    if (this.acao == 'alterar') {
      this.id = parseInt(this.route.snapshot.paramMap.get("idCliente"));
    }else{
      this.id = 0;
    }

    if(this.id>0){
      this.obterCliente();
    }

    this.formCliente.patchValue({
      id: this.id
    });


  }

  obterCliente() {
    this.loading = true;
    this._ClienteService.ObterCliente(this.id).subscribe(
      res => {
        if (res.situacao == 'SUCESSO') {
          this.alterar = res.retorno;
          this.formCliente.patchValue({
            nome: this.alterar.nome,
            porte: this.alterar.porte
          });
        }
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  obterListaPorte() {
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

  salvarCliente() {
    console.log(this.formCliente.value);
    this._ClienteService.SalvarCliente(this.formCliente.value).subscribe(
      res => {
        if (res.situacao == 'SUCESSO') {
          this.toastr.success('Sucesso', 'Cliente salvo!')
          this.rota.navigateByUrl('');
        }else{
          this.toastr.error('Erro', 'Erro no salvar')
        }
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

}
