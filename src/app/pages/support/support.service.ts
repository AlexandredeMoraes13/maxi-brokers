import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SupportRequest {
  email: string;
  reason: string;
  platform: string;
  subject: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class SupportService {

  // Endereço público do backend. NENHUMA credencial é usada aqui.
  // O envio real do e-mail (com login/senha) acontece somente no servidor.
  private endpoint = environment.supportEndpoint;

  constructor(private http: HttpClient) { }

  // true quando o backend já foi configurado (URL preenchida no environment)
  get isConfigured(): boolean {
    return !!this.endpoint;
  }

  // Envia a solicitação do cliente para o backend, que encaminha por e-mail
  send(data: SupportRequest): Observable<any> {
    return this.http.post(this.endpoint, {
      ...data,
      source: 'site-fique-atualizado',
      sentAt: new Date().toISOString()
    });
  }
}
