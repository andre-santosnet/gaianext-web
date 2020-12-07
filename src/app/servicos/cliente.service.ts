import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  SERVER_API_URL = environment.urlApi;

  constructor(private httpClient: HttpClient) { }
  
  public SalvarCliente(cliente){
    return this.httpClient.post<any>(`${this.SERVER_API_URL}Cliente/SalvarCliente`, cliente);
  }
  public ObterListaCliente(filtro){
    return this.httpClient.post<any>(`${this.SERVER_API_URL}Cliente/ObterListaCliente`, filtro);
  }
  public ObterCliente(idCliente){
    return this.httpClient.get<any>(`${this.SERVER_API_URL}Cliente/ObterCliente/` + idCliente);
  }
  public ExcluirCliente(idCliente){
    return this.httpClient.get<any>(`${this.SERVER_API_URL}Cliente/ExcluirCliente/` + idCliente);
  }
  public ObterPorteCliente(){
    return this.httpClient.get<any>(`${this.SERVER_API_URL}Cliente/ObterPorteCliente`);
  }


}
