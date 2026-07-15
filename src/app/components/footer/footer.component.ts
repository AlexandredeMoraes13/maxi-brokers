import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  newsletterEmail = '';

  // URL da Central de Atendimento com o e-mail já preenchido.
  // Usada num link nativo (target="_blank") para abrir em nova guia
  // sem risco de bloqueio de popup.
  get supportUrl(): string {
    const email = this.newsletterEmail.trim();
    return email
      ? `/atendimento?email=${encodeURIComponent(email)}`
      : '/atendimento';
  }
}