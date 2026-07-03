import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

export type MarketCategory = 'forex' | 'indices' | 'commodities' | 'crypto' | 'stocks';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://backend-symbols-5111a39b4a17.herokuapp.com/api/v1/market';
  private newsBaseUrl = 'https://backend-symbols-5111a39b4a17.herokuapp.com/api/v1/news';
  private fmpBase = 'https://financialmodelingprep.com';
  private logoCache = new Map<string, string>();

  constructor(private http: HttpClient) { }

  getMeta(): Observable<any> { return this.http.get<any>(`${this.baseUrl}/meta`); }
  getAll(): Observable<any> { return this.http.get<any>(`${this.baseUrl}/all`); }
  getCategoryRaw(cat: MarketCategory): Observable<any> { return this.http.get<any>(`${this.baseUrl}/${cat}`); }

  getCategoryList(cat: MarketCategory): Observable<any[]> {
    return this.getCategoryRaw(cat).pipe(map((resp: any) => {
      if (Array.isArray(resp)) return resp;
      if (resp?.symbolsList && Array.isArray(resp.symbolsList)) return resp.symbolsList;
      if (resp && resp[cat] && Array.isArray(resp[cat])) return resp[cat];
      return [];
    }));
  }

  getLogoUrlForItem(cat: MarketCategory, item: any): Observable<string | null> {
    const symbol: string = item?.symbol || item?.ticker;
    if (!symbol) return of(null);
    const pre = item?.image || item?.logo || item?.profile?.image;
    if (pre) { this.logoCache.set(symbol, pre); return of(pre); }
    if (this.logoCache.has(symbol)) return of(this.logoCache.get(symbol)!);
    if (cat !== 'stocks') return of(null);
    const fallback = `${this.fmpBase}/image-stock/${encodeURIComponent(symbol)}.png`;
    this.logoCache.set(symbol, fallback);
    return of(fallback);
  }

  getUsdBrl(): Observable<{ pair: string; price: number; lastUpdate: string; raw: any } | null> {
    return this.http.get<any>(`${this.baseUrl}/forex/usdbrl`).pipe(map(res => res ?? null));
  }
  getUsdBrlPrice(): Observable<number | null> {
    return this.getUsdBrl().pipe(map(res => (res && typeof res.price === 'number' ? res.price : null)));
  }
  getNews(): Observable<any> { return this.http.get<any>(`${this.newsBaseUrl}`); }
  getNewsMeta(): Observable<{ lastNewsUpdate: string | null; ttlMs: number; hasCache: boolean }> {
    return this.http.get<any>(`${this.newsBaseUrl}/meta`);
  }

  private toQs(params: Record<string, any>): string {
    const q = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
    return q ? `?${q}` : '';
  }

  getNewsArticles(page = 0, limit = 20) { return this.http.get<any>(`${this.newsBaseUrl}/articles${this.toQs({ page, limit })}`); }
  getNewsGeneralLatest(opts: { from?: string; to?: string; page?: number; limit?: number } = {}) {
    const { from, to, page = 0, limit = 20 } = opts;
    return this.http.get<any>(`${this.newsBaseUrl}/general-latest${this.toQs({ from, to, page, limit })}`);
  }
  getNewsPressReleasesLatest(opts: { from?: string; to?: string; page?: number; limit?: number } = {}) {
    const { from, to, page = 0, limit = 20 } = opts;
    return this.http.get<any>(`${this.newsBaseUrl}/press-releases-latest${this.toQs({ from, to, page, limit })}`);
  }
  getNewsStockLatest(opts: { from?: string; to?: string; page?: number; limit?: number } = {}) {
    const { from, to, page = 0, limit = 20 } = opts;
    return this.http.get<any>(`${this.newsBaseUrl}/stock-latest${this.toQs({ from, to, page, limit })}`);
  }
  getNewsCryptoLatest(opts: { from?: string; to?: string; page?: number; limit?: number } = {}) {
    const { from, to, page = 0, limit = 20 } = opts;
    return this.http.get<any>(`${this.newsBaseUrl}/crypto-latest${this.toQs({ from, to, page, limit })}`);
  }
  getNewsForexLatest(opts: { from?: string; to?: string; page?: number; limit?: number } = {}) {
    const { from, to, page = 0, limit = 20 } = opts;
    return this.http.get<any>(`${this.newsBaseUrl}/forex-latest${this.toQs({ from, to, page, limit })}`);
  }
  searchPressReleases(symbols: string, opts: { from?: string; to?: string; page?: number; limit?: number } = {}) {
    const { from, to, page = 0, limit = 20 } = opts;
    return this.http.get<any>(`${this.newsBaseUrl}/press-releases${this.toQs({ symbols, from, to, page, limit })}`);
  }
  searchStockNews(symbols: string, opts: { from?: string; to?: string; page?: number; limit?: number } = {}) {
    const { from, to, page = 0, limit = 20 } = opts;
    return this.http.get<any>(`${this.newsBaseUrl}/stock${this.toQs({ symbols, from, to, page, limit })}`);
  }
  searchCryptoNews(symbols: string, opts: { from?: string; to?: string; page?: number; limit?: number } = {}) {
    const { from, to, page = 0, limit = 20 } = opts;
    return this.http.get<any>(`${this.newsBaseUrl}/crypto${this.toQs({ symbols, from, to, page, limit })}`);
  }
  searchForexNews(symbols: string, opts: { from?: string; to?: string; page?: number; limit?: number } = {}) {
    const { from, to, page = 0, limit = 20 } = opts;
    return this.http.get<any>(`${this.newsBaseUrl}/forex${this.toQs({ symbols, from, to, page, limit })}`);
  }
  getCotacaoDolar(): Observable<{ cotacaoDolar: string; valor: number; lastUpdate: string } | null> {
    return this.http.get<any>(`${this.baseUrl}/dolar`).pipe(map(res => res ?? null));
  }
  getCotacaoDolarValor(): Observable<number | null> {
    return this.getCotacaoDolar().pipe(map(res => (res && typeof res.valor === 'number') ? res.valor : null));
  }
}