// components/painel03/painel03.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, timer, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

export interface AssetData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  imageUrl: string;
  isUpdating?: boolean;
}

// Serviço movido para o mesmo arquivo para simplificar
export class MarketDataService {
  private cryptoApiUrl = 'https://api.coingecko.com/api/v3/simple/price';
  
  private simulatedAssets: AssetData[] = [
    {
      symbol: 'BTC/USD',
      name: 'Bitcoin',
      price: 67234,
      change: 1567,
      changePercent: 2.34,
      imageUrl: 'https://i.imgur.com/mo2B2wT.png'
    },
    /* {
      symbol: 'NVDA',
      name: 'Nvidia',
      price: 1245.67,
      change: 15.42,
      changePercent: 1.25,
      imageUrl: 'https://i.imgur.com/BEodkGr.png'
    }, */
    {
      symbol: 'TSLA',
      name: 'Tesla',
      price: 245.50,
      change: 2.18,
      changePercent: 0.89,
      imageUrl: 'https://i.imgur.com/Q1dYAlU.png'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      price: 1.00,
      change: -0.0045,
      changePercent: -0.45,
      imageUrl: 'https://i.imgur.com/aFIPdmM.png'
    },
    {
      symbol: 'XAU/USD',
      name: 'Gold',
      price: 2034.50,
      change: 13.65,
      changePercent: 0.67,
      imageUrl: 'https://i.imgur.com/ozb26S3.png'
    }
  ];

  constructor(private http: HttpClient) {}

  getRealTimeAssets() {
    return this.http.get<any>(
      `${this.cryptoApiUrl}?ids=bitcoin,tether&vs_currencies=usd&include_24hr_change=true`
    ).pipe(
      map(response => {
        const updatedAssets = [...this.simulatedAssets];
        
        if (response.bitcoin) {
          const btcIndex = updatedAssets.findIndex(a => a.symbol === 'BTC/USD');
          if (btcIndex !== -1) {
            updatedAssets[btcIndex] = {
              ...updatedAssets[btcIndex],
              price: response.bitcoin.usd,
              changePercent: response.bitcoin.usd_24h_change,
              change: (response.bitcoin.usd * response.bitcoin.usd_24h_change) / 100
            };
          }
        }
        
        if (response.tether) {
          const usdtIndex = updatedAssets.findIndex(a => a.symbol === 'USDT');
          if (usdtIndex !== -1) {
            updatedAssets[usdtIndex] = {
              ...updatedAssets[usdtIndex],
              price: response.tether.usd,
              changePercent: response.tether.usd_24h_change || 0,
              change: response.tether.usd_24h_change ? 
                (response.tether.usd * response.tether.usd_24h_change) / 100 : 0
            };
          }
        }
        
        return updatedAssets;
      }),
      catchError(error => {
        console.error('Erro ao buscar dados reais:', error);
        return of(this.simulatePriceChanges());
      })
    );
  }

  private simulatePriceChanges(): AssetData[] {
    return this.simulatedAssets.map(asset => {
      const randomChange = (Math.random() - 0.5) * 4;
      const newPrice = asset.price * (1 + randomChange / 100);
      const change = newPrice - asset.price;
      const changePercent = (change / asset.price) * 100;
      
      return {
        ...asset,
        price: Number(newPrice.toFixed(2)),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2))
      };
    });
  }
}

@Component({
  selector: 'app-painel03',
  templateUrl: './painel03.component.html',
  styleUrls: ['./painel03.component.css']
})
export class Painel03Component implements OnInit, OnDestroy {
  
  assets: AssetData[] = [];
  private updateSubscription!: Subscription;
  
  metrics = {
    avgSpread: 0.34,
    avgFee: 0.07,
    executionSpeed: 0.45,
    liquidity: 1.23,
    avgReturn: 6.67
  };

  private marketDataService: MarketDataService;

  constructor(private http: HttpClient) {
    this.marketDataService = new MarketDataService(http);
  }

  ngOnInit(): void {
    this.updateSubscription = timer(0, 30000).pipe(
      switchMap(() => this.marketDataService.getRealTimeAssets())
    ).subscribe({
      next: (assets) => {
        this.assets = assets;
      },
      error: (error) => {
        console.error('Erro ao atualizar dados:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  getChangeClass(changePercent: number): string {
    return changePercent >= 0 ? 'positive' : 'negative';
  }

  formatChange(changePercent: number): string {
    const symbol = changePercent >= 0 ? '+' : '';
    return `${symbol}${changePercent.toFixed(2)}%`;
  }

  formatPrice(price: number): string {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  }


  startInvesting(): void {
  console.log('Start Investing clicked - Painel03');
  // Adicione aqui a lógica para navegação ou ação do botão
  // Exemplo: this.router.navigate(['/investing']);
}

discoverWeb3(): void {
  console.log('Discover Web3 clicked - Painel03');
  // Adicione aqui a lógica para navegação ou ação do botão
  // Exemplo: this.router.navigate(['/web3']);
}
}