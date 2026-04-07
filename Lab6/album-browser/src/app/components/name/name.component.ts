import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'name-component',
  imports: [RouterLink],
  standalone: true,
  template: `<h2>Ali</h2>`
})
export class GreetingComponent {
  @Input() name = 'Гость';
}
