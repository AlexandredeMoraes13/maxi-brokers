// how-it-works.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Inicia o processo de registro
   */
  startRegistration(): void {
   /*  console.log('Iniciando processo de registro...');
    // this.router.navigate(['/register']);
    alert('Redirecionando para o registro...'); */
  }

  /**
   * Abre o suporte ou chat
   */
  contactSupport(): void {
    /* console.log('Abrindo chat de suporte...');
    // this.router.navigate(['/contact']);
    alert('Conectando você com nosso especialista...'); */
  }
}