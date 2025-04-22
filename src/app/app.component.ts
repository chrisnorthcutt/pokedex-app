import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokedexListComponent } from "./components/pokedex-list/pokedex-list.component";
import { filter } from 'rxjs';
import { ShinyService } from './services/shiny.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokedex-app';
  timeout:any;
  loading = false
  isDarkMode = true;
  shinyURL: 'front' | 'front_shiny' = 'front'; // ⬅️ moved here
  isOnListView = true;

  constructor(public shinyService: ShinyService, private router: Router) {
    this.router.events
      .subscribe((e: any) => {
        console.log(e)
        this.navigationInterceptor(e);
        this.isOnListView = e.url === '/' || e.urlAfterRedirects === '/';
      });
      
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
       this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.loading = false;
      }, 1000);
    }}

  toggleShiny(): void {
    this.shinyService.toggle();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const root = document.documentElement.classList;
    this.isDarkMode ? root.add('dark') : root.remove('dark');
  }
}
