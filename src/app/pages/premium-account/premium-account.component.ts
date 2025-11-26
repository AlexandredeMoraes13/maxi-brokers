import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premium-account',
  templateUrl: './premium-account.component.html',
  styleUrls: ['./premium-account.component.css']
})
export class PremiumAccountComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Método para abrir a conta Premium
   */
  openAccount(): void {
    console.log('Abrindo conta Premium...');
    
    // Aqui você pode implementar:
    // - Redirecionar para página de registro
    // - Abrir modal de cadastro
    // - Integrar com API de abertura de conta
    
    alert('Redirecionando para abertura da Conta Premium...');
    
    // Exemplo de redirecionamento:
    // this.router.navigate(['/register'], { 
    //   queryParams: { 
    //     accountType: 'premium',
    //     minDeposit: 5000 
    //   } 
    // });
  }
}