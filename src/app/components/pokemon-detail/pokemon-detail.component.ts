import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  pokemonSpecies: any;
  backgroundColor: string = '#1e1f29';
  pokemonHeightFeet: any;
  pokemonWeightPounds: any;
  pokemonDataID: any;
  animateStats: boolean = false;
  levelUpMovesDetailed: any[] = [];
  pokemonDescription: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  async getLevelUpMovesWithDetails(pokemon: any): Promise<any[]> {
    const levelUpMoves = pokemon.moves
      .map((m: any) => {
        const levelUp = m.version_group_details.find(
          (d: any) => d.move_learn_method.name === 'level-up' && d.level_learned_at != '1'
        );
        return levelUp
          ? { name: m.move.name, url: m.move.url, level: levelUp.level_learned_at }
          : null;
      })
      .filter((m: any) => m !== null)
      .sort((a: any, b: any) => a.level - b.level);

    const detailedMoves = await Promise.all(
      levelUpMoves.map(async (move:any) => {
        const details = await this.pokemonService.getMoveByName(move.name).toPromise();
        return {
          name: move.name,
          level: move.level,
          type: details.type.name,
          power: details.power,
          accuracy: details.accuracy,
          pp: details.pp,
          damage_class: details.damage_class.name,
          effect: details.effect_entries?.find((e: any) => e.language.name === 'en')?.short_effect || ''
        };
      })
    );

    return detailedMoves;
  }

  getEggMovesMoves(): { name: string; level: number }[] {
    return this.pokemon.moves
      .map((m: any) => {
        const levelUp = m.version_group_details.find(
          (d: any) => d.move_learn_method.name === 'level-up' && d.level_learned_at == '1'
        );
        return levelUp
          ? { name: m.move.name, level: levelUp.level_learned_at }
          : null;
      })
      .filter((m: any) => m !== null)
      .sort((a: any, b: any) => a.level - b.level);
  }

  goToNext(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['/pokemon', id + 1]);
  }

  goToPrevious(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id > 1) {
      this.router.navigate(['/pokemon', id - 1]);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      if (!id) return;
      this.animateStats = false;
      this.pokemonDataID = id;
      this.pokemonService.getPokemonSpeciesByID(id).subscribe((speciesData) => {
        this.pokemonSpecies = speciesData;
       speciesData.flavor_text_entries.map((entry:any) => {
        if (entry.language.name === 'en' && entry.version.name === 'emerald') {
          return this.pokemonDescription = entry.flavor_text 
        }
        
       })
      });
      this.pokemonService.getPokemonById(id).subscribe(async (data) => {
        this.pokemon = data;
        setTimeout(() => {
          this.animateStats = true;
        }, 1150);
        this.pokemonHeightFeet = this.convertHeightToFeetInches(data.height);
        this.pokemonWeightPounds = this.convertWeightToPounds(data.weight);

        this.pokemonService.getColorMap().subscribe((colorMap) => {
          this.backgroundColor = this.getSafeColorFromMap(colorMap[id]);
          document.documentElement.style.setProperty(`--background-color`, `rgb(${this.backgroundColor})`);

          document.documentElement.style.setProperty(
            `--background-color-light`,
            `rgb(${parseInt(this.backgroundColor.split(',')[0]) - 50}, ${parseInt(this.backgroundColor.split(',')[1]) - 40}, ${parseInt(this.backgroundColor.split(',')[2]) + 20})`
          );
        });

        this.levelUpMovesDetailed = await this.getLevelUpMovesWithDetails(data);
      });
    });
  }

  private convertHeightToFeetInches(decimeters: number): string {
    const totalInches = decimeters * 3.93700787; // 1 dm = 3.937 inches
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}ft ${inches}in`;
  }

  private convertWeightToPounds(hectograms: number): string {
    const pounds = hectograms / 4.5359237; // 1 hg = 0.1kg → 2.20462 lb/kg
    return `${Math.round(pounds)}lbs`;
  }

  getGradientFromColor([r, g, b]: number[]): string {
    const darker = [Math.floor(r * 0.75), Math.floor(g * 0.75), Math.floor(b * 0.75)];
    return `--tw-gradient-from: rgb(${r}, ${g}, ${b}); --tw-gradient-to: rgb(${darker[0]}, ${darker[1]}, ${darker[2]});`;
  }

  private getSafeColorFromMap(color: number[] = [30, 30, 30]): string {
    const [r, g, b] = color;
    const isTooWhite = r > 235 && g > 235 && b > 235;
    const isTooBlack = r < 30 && g < 30 && b < 30;
    const [safeR, safeG, safeB] = isTooWhite || isTooBlack ? [180, 180, 180] : [r, g, b];
    return `${r}, ${g}, ${b}`;
  }
}