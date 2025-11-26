// about-us.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  startRegistration(): void {
    // Implementar lógica para iniciar o registro
    console.log('Iniciando processo de registro...');
    // Exemplo: this.router.navigate(['/register']);
  }

  learnMore(): void {
    // Implementar lógica para saber mais
    console.log('Navegando para mais informações...');
    // Exemplo: this.router.navigate(['/services']);
  }

  contactSupport(): void {
    // Implementar lógica para contatar suporte
    console.log('Entrando em contato com suporte...');
    // Exemplo: window.open('https://wa.me/5511999999999', '_blank');
  }
}