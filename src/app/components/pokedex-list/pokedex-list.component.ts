
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexCardComponent } from '../pokedex-card/pokedex-card.component';
import { PokemonService } from '../../services/pokemon.service';
import { ShinyService } from '../../services/shiny.service';
@Component({
  selector: 'app-pokedex-list',
  standalone: true,
  imports: [CommonModule, PokedexCardComponent],
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss']
})
export class PokedexListComponent implements OnInit {
  pokemonEntries: any[] = [];
  shinyURL: 'front' | 'front_shiny' = 'front';

  constructor(private pokemonService: PokemonService, private shinyService: ShinyService) {}

  ngOnInit(): void {
    this.shinyService.shiny$.subscribe((value) => {
      this.shinyURL = value;
    });
    this.pokemonService.getNationalPokedex().subscribe((data) => {
      this.pokemonEntries = data.pokemon_entries;
    });
  }
}