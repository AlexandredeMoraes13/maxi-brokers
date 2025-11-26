import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-types',
  templateUrl: './account-types.component.html',
  styleUrls: ['./account-types.component.css']
})
export class AccountTypesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Método para quando o usuário clicar em "NEGOCIE AGORA"
  openAccount(accountType: string): void {
    console.log(`Iniciando negociação para conta: ${accountType}`);
    // Aqui você pode implementar a lógica para:
    // - Redirecionar para a página de registro
    // - Abrir um modal de contato
    // - Iniciar processo de abertura de conta
    alert(`Iniciando processo para conta ${accountType}`);
    
    // Exemplo de redirecionamento:
    // this.router.navigate(['/register'], { queryParams: { type: accountType.toLowerCase() } });
  }
}