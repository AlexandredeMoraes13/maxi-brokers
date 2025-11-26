// cadastro-rapido.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateBack(): void {
    this.router.navigate(['/como-funciona']);
  }

  startRegistration(): void {
    console.log('Iniciando cadastro rápido...');
    // this.router.navigate(['/register']);
    alert('Iniciando processo de cadastro...');
  }
}
