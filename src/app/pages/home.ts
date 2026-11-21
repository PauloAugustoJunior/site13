import { Component, signal } from '@angular/core';
import { Configurator } from '../components/configurator';
import { Services } from '../components/services';
import { Journey } from '../components/journey';
import { Briefing } from '../components/briefing';
import { Examples } from '../components/examples';
import { Icon } from '../components/icon';
import { About } from '../components/about';
import { Process } from '../components/process';
import { Questions } from '../components/questions';

@Component({
  selector: 'nexo-home',
  imports: [Configurator, Services, Journey, Briefing, Examples, Icon, About, Process, Questions],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly selectedServices = signal<readonly string[]>(['presenca', 'automacao']);
  addService(id: string): void {
    this.selectedServices.update((selected) =>
      selected.includes(id) ? selected : [...selected, id],
    );
  }
  addPath(ids: readonly string[]): void {
    this.selectedServices.update((selected) => [...new Set([...selected, ...ids])]);
  }
}
