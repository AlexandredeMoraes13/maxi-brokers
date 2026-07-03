import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-aviso',
  templateUrl: './painel-aviso.component.html',
  styleUrls: ['./painel-aviso.component.css']
})
export class PainelAvisoComponent implements OnInit {

  ngOnInit(): void {}

  scrollToSite(): void {
    const nextSection = document.querySelector('app-painel01');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
