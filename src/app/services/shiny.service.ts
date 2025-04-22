import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShinyService {
  private shinyState = new BehaviorSubject<'front' | 'front_shiny'>('front');
  shiny$ = this.shinyState.asObservable();

  toggle(): void {
    this.shinyState.next(this.shinyState.value === 'front' ? 'front_shiny' : 'front');
  }

  get current(): 'front' | 'front_shiny' {
    return this.shinyState.value;
  }
}