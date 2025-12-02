import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standard-account',
  templateUrl: './standard-account.component.html',
  styleUrls: ['./standard-account.component.css']
})
export class StandardAccountComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Método para abrir a conta Standard
   */
  openAccount(): void {
    console.log('Abrindo conta Standard...');
    
    // Aqui você pode implementar:
    // - Redirecionar para página de registro
    // - Abrir modal de cadastro
    // - Integrar com API de abertura de conta
    
    
    // Exemplo de redirecionamento:
    // this.router.navigate(['/register'], { 
    //   queryParams: { 
    //     accountType: 'standard',
    //     minDeposit: 500 
    //   } 
    // });
  }
}