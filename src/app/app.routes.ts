import { Routes } from '@angular/router';
import { PokedexListComponent } from './components/pokedex-list/pokedex-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: '', component: PokedexListComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent, data: { injectShiny: true } }
  ,
];