import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  // Variáveis de controle para cada FAQ (agora 20)
  faq1Open = false; faq2Open = false; faq3Open = false; faq4Open = false; faq5Open = false;
  faq6Open = false; faq7Open = false; faq8Open = false; faq9Open = false; faq10Open = false;
  faq11Open = false; faq12Open = false; faq13Open = false; faq14Open = false; faq15Open = false;
  faq16Open = false; faq17Open = false; faq18Open = false; faq19Open = false; faq20Open = false;

  searchTerm: string = '';
  selectedCategory: string = 'all';

  constructor() { }

  ngOnInit(): void {
    // Inicialização se necessário
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filterFAQs();
  }

  filterFAQs(): void {
    // Implementação básica de filtro
    console.log('Filtrando FAQs...', this.selectedCategory, this.searchTerm);
  }

  // Métodos auxiliares para o template
  hasVisibleFAQs(): boolean {
    return true;
  }

  getVisibleFAQsCount(): number {
    return 20; // Agora temos 20 FAQs
  }

  getCategoryLabel(categoryKey: string): string {
    const categoryLabels: { [key: string]: string } = {
      'account': 'Conta',
      'trading': 'Trading', 
      'deposits': 'Depósitos',
      'withdrawals': 'Saques',
      'fees': 'Taxas',
      'platform': 'Plataforma',
      'security': 'Segurança'
    };
    return categoryLabels[categoryKey] || categoryKey;
  }

  resetFilters(): void {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    // Resetar todos os 20 FAQs para fechados
    this.faq1Open = false; this.faq2Open = false; this.faq3Open = false; this.faq4Open = false; this.faq5Open = false;
    this.faq6Open = false; this.faq7Open = false; this.faq8Open = false; this.faq9Open = false; this.faq10Open = false;
    this.faq11Open = false; this.faq12Open = false; this.faq13Open = false; this.faq14Open = false; this.faq15Open = false;
    this.faq16Open = false; this.faq17Open = false; this.faq18Open = false; this.faq19Open = false; this.faq20Open = false;
  }

  // Support Methods (mantenha os mesmos)
  openSupport(): void {
    alert('Redirecionando para o suporte...');
  }

  openChat(): void {
    alert('Iniciando chat com suporte...');
  }

  openPhone(): void {
    alert('Ligando para suporte: +55 (11) 4004-2000');
  }

  openEmail(): void {
    alert('Abrindo cliente de e-mail para: suporte@corretora.com');
  }

  openTicket(): void {
    alert('Abrindo formulário de ticket...');
  }

  openHelpCenter(): void {
    alert('Acessando centro de ajuda...');
  }

  openVideos(): void {
    alert('Abrindo videoaulas...');
  }

  openDocumentation(): void {
    alert('Abrindo documentação...');
  }
}