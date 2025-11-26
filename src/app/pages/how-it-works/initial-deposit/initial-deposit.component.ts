// deposito-inicial.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-deposit',
  templateUrl: './initial-deposit.component.html',
  styleUrls: ['./initial-deposit.component.css']
})
export class InitialDepositComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateBack(): void {
    this.router.navigate(['/como-funciona']);
  }

  startDeposit(): void {
    console.log('Iniciando processo de depósito...');
    // this.router.navigate(['/deposit']);
    alert('Redirecionando para área de depósitos...');
  }
}