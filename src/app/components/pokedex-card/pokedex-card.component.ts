import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex-card',
  templateUrl: './pokedex-card.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
  styleUrls: ['./pokedex-card.component.scss'],
})
export class PokedexCardComponent implements OnInit {
  @Input() entry: any;
  @Input() spriteType: 'front' | 'front_shiny' = 'front';

  pokemonDataID: any = '';
  pokemonData: any;
  backgroundColor: string = '#1e1f29';
  spriteURL: string = '';

  constructor(private pokemonService: PokemonService) {}
  getTypeGradientClass(types: any[]): string {
    const primary = types[0]?.type?.name;
    const secondary =  types[1]?.type?.name ? 'to-type-' +  types[1]?.type?.name : 'dark:to-slate-500 to-slate-100'; // fallback to primary if only one type
  
    return `bg-gradient-to-tr from-type-${primary} ${secondary}`;
  }
  ngOnInit(): void {
    const pokemonUrlPart = this.entry.pokemon_species.url.split('/');
    this.pokemonDataID = pokemonUrlPart[pokemonUrlPart.length - 2];

    this.pokemonService.getPokemonById(this.pokemonDataID).subscribe((data) => {
      this.pokemonData = data;

      // ✅ Use spriteType to determine the image path
      const spriteFolder = this.spriteType === 'front_shiny' ? 'front/shiny' : 'front';
      this.spriteURL = `https://raw.githubusercontent.com/zitaoyu/seaglass-sprites/refs/heads/main/sprites/${spriteFolder}/${data.id}.png`;

      this.pokemonService.getColorMap().subscribe((colorMap) => {
        const [r, g, b] = colorMap[this.pokemonDataID] || [30, 30, 30];
        const isTooWhite = r > 235 && g > 235 && b > 235;
        const isTooBlack = r < 30 && g < 30 && b < 30;
        const [safeR, safeG, safeB] =
          isTooWhite || isTooBlack ? [180, 180, 180] : [r, g, b];
        this.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      });
    });
  }
}