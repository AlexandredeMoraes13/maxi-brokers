import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api.service';


interface NewsArticle {
  title: string;
  description?: string;
  text?: string;
  image?: string;
  url: string;
  publishedDate?: string;
  date?: string;
  site?: string;
  source?: string;
  tickers?: string[];
  category?: string;
}

interface NewsFilter {
  key: string;
  label: string;
  endpoint: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  news: NewsArticle[] = [];
  loading = false;
  loadingMore = false;
  error: string | null = null;
  currentPage = 0;
  hasMore = true;
  usdBrlPrice: number | null = null;
  lastUpdate: string | null = null;

  newsFilters: NewsFilter[] = [
    { key: 'general', label: 'Geral', endpoint: 'general-latest' },
    { key: 'stocks', label: 'Ações', endpoint: 'stock-latest' },
    { key: 'crypto', label: 'Cripto', endpoint: 'crypto-latest' },
    { key: 'forex', label: 'Forex', endpoint: 'forex-latest' },
    { key: 'press', label: 'Comunicados', endpoint: 'press-releases-latest' }
  ];

  currentFilter = 'general';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadNews();
    this.loadMarketData();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  loadNews(): void {
    this.loading = true;
    this.error = null;
    this.currentPage = 0;
    
    this.getNewsByFilter(this.currentFilter).subscribe({
      next: (response) => {
        this.news = this.processNewsResponse(response);
        this.loading = false;
        this.hasMore = this.news.length >= 20; // Assuming 20 items per page
      },
      error: (err) => {
        this.error = 'Erro ao carregar notícias. Tente novamente.';
        this.loading = false;
        console.error('Error loading news:', err);
      }
    });
  }

  loadMore(): void {
    if (this.loadingMore || !this.hasMore) return;

    this.loadingMore = true;
    const nextPage = this.currentPage + 1;

    this.getNewsByFilter(this.currentFilter, nextPage).subscribe({
      next: (response) => {
        const newArticles = this.processNewsResponse(response);
        this.news = [...this.news, ...newArticles];
        this.currentPage = nextPage;
        this.loadingMore = false;
        this.hasMore = newArticles.length >= 20;
      },
      error: (err) => {
        this.error = 'Erro ao carregar mais notícias.';
        this.loadingMore = false;
        console.error('Error loading more news:', err);
      }
    });
  }

  private getNewsByFilter(filter: string, page = 0) {
    const filterConfig = this.newsFilters.find(f => f.key === filter);
    if (!filterConfig) return this.apiService.getNewsGeneralLatest({ page });

    switch (filterConfig.endpoint) {
      case 'general-latest':
        return this.apiService.getNewsGeneralLatest({ page, limit: 20 });
      case 'stock-latest':
        return this.apiService.getNewsStockLatest({ page, limit: 20 });
      case 'crypto-latest':
        return this.apiService.getNewsCryptoLatest({ page, limit: 20 });
      case 'forex-latest':
        return this.apiService.getNewsForexLatest({ page, limit: 20 });
      case 'press-releases-latest':
        return this.apiService.getNewsPressReleasesLatest({ page, limit: 20 });
      default:
        return this.apiService.getNewsGeneralLatest({ page, limit: 20 });
    }
  }

  private processNewsResponse(response: any): NewsArticle[] {
    if (!response) return [];
    
    // Handle different response formats
    if (Array.isArray(response)) {
      return response.map(item => this.mapNewsItem(item));
    }
    
    if (response.articles && Array.isArray(response.articles)) {
      return response.articles.map((item: any) => this.mapNewsItem(item));
    }
    
    if (response.data && Array.isArray(response.data)) {
      return response.data.map((item: any) => this.mapNewsItem(item));
    }
    
    return [];
  }

  private mapNewsItem(item: any): NewsArticle {
    return {
      title: item.title || item.headline || 'Sem título',
      description: item.description || item.summary,
      text: item.text || item.content,
      image: item.image || item.urlToImage,
      url: item.url || item.link || '#',
      publishedDate: item.publishedDate || item.publishedAt || item.date,
      site: item.site || item.source?.name || item.publisher,
      source: item.source,
      tickers: item.tickers || item.symbols || [],
      category: item.category || this.currentFilter
    };
  }

  setFilter(filter: string): void {
    if (this.currentFilter === filter) return;
    
    this.currentFilter = filter;
    this.loadNews();
  }

  getCategoryLabel(category: string | undefined): string {
    const filter = this.newsFilters.find(f => f.key === category);
    return filter?.label || 'Notícia';
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Data não disponível';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Data inválida';
    }
  }

  openArticle(article: NewsArticle): void {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank');
    }
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/default-news.jpg';
  }

  loadMarketData(): void {
    this.apiService.getUsdBrlPrice().subscribe({
      next: (price) => {
        this.usdBrlPrice = price;
      },
      error: (err) => {
        console.error('Error loading USD/BRL price:', err);
      }
    });

    this.apiService.getNewsMeta().subscribe({
      next: (meta) => {
        this.lastUpdate = meta.lastNewsUpdate;
      },
      error: (err) => {
        console.error('Error loading news meta:', err);
      }
    });
  }
}