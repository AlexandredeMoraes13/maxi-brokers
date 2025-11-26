import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vip-account',
  templateUrl: './vip-account.component.html',
  styleUrls: ['./vip-account.component.css']
})
export class VipAccountComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Método para abrir a conta VIP
   */
  openAccount(): void {
    console.log('Abrindo conta VIP...');
    
    // Aqui você pode implementar:
    // - Redirecionar para página de registro
    // - Abrir modal de cadastro
    // - Integrar com API de abertura de conta
    
    alert('Redirecionando para abertura da Conta VIP...');
    
    // Exemplo de redirecionamento:
    // this.router.navigate(['/register'], { 
    //   queryParams: { 
    //     accountType: 'vip',
    //     minDeposit: 10000 
    //   } 
    // });
  }
}