import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getNationalPokedex(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokedex/4`);
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${id}`);
  }
  getPokemonSpeciesByID(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon-species/${id}`);
  }
  getMoveByName(name: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/move/${name}`);
  }

  getColorMap(): Observable<any> {
    return this.http.get('/assets/pokemon-colors.json');
  }
}