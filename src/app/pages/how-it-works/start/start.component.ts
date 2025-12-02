// comece-negociar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateBack(): void {
    this.router.navigate(['/como-funciona']);
  }

  startTrading(): void {
    /* console.log('Acessando plataforma de trading...');
    // this.router.navigate(['/trading-platform']);
    alert('Redirecionando para plataforma de trading...'); */
  }

  openDemoAccount(): void {
   /*  console.log('Abrindo conta demo...');
    // this.router.navigate(['/demo-account']);
    alert('Criando conta demo gratuita...'); */
  }
}
