// app.component.ts
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Trading Platform';

  constructor(private translate: TranslateService) {
    // Configura o idioma padrão
    this.translate.setDefaultLang('pt');
  }

  ngOnInit(): void {
    // Tenta usar o idioma salvo no localStorage, ou usa 'pt' como fallback
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      this.translate.use(savedLang);
    } else {
      this.translate.use('pt');
      // Salva o idioma padrão no localStorage
      localStorage.setItem('preferredLanguage', 'pt');
    }

    // Configura o atributo lang do HTML para acessibilidade
    this.updateHtmlLangAttribute();
    
    // Observa mudanças de idioma para atualizar o atributo lang
    this.translate.onLangChange.subscribe(event => {
      this.updateHtmlLangAttribute();
    });
  }

  private updateHtmlLangAttribute(): void {
    const currentLang = this.translate.currentLang;
    document.documentElement.lang = currentLang;
  }
}