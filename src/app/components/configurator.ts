import { Component, computed, input, output } from '@angular/core';
import { SERVICES } from '../data/site-content';
import { Icon } from './icon';

@Component({
  selector: 'nexo-configurator',
  imports: [Icon],
  template: `<div class="configurator">
    <div class="config-heading">
      <div class="config-symbol" aria-hidden="true"><nexo-icon name="connect" /></div>
      <h2>O que você quer conectar?</h2>
      <span class="live-label">Explore</span>
    </div>
    <p class="config-intro" id="config-help">Selecione as frentes que fazem sentido agora.</p>
    <div
      class="solution-grid"
      role="group"
      aria-label="Frentes do seu projeto"
      aria-describedby="config-help"
    >
      @for (service of services; track service.id) {
        <button
          type="button"
          [class.selected]="selected().includes(service.id)"
          [attr.aria-pressed]="selected().includes(service.id)"
          (click)="toggle(service.id)"
        >
          <nexo-icon [name]="service.icon" /><span>{{ service.name }}</span
          ><span class="selection-mark" aria-hidden="true">
            @if (selected().includes(service.id)) {
              <nexo-icon name="check" />
            } @else {
              <nexo-icon name="plus" />
            }
          </span>
        </button>
      }
    </div>
    <div class="project-summary" aria-live="polite">
      <div class="summary-label">
        <span class="status-dot"></span>Seu projeto começa a ganhar forma
      </div>
      @if (selectedNames().length) {
        <p>{{ selectedNames().join(' + ') }}</p>
      } @else {
        <p>Uma necessidade. Muitas possibilidades.</p>
      }
      <span>Uma seleção inicial, sem compromisso ou envio.</span>
    </div>
    <a href="#briefing" class="config-continue"
      >Levar minhas escolhas para o briefing <nexo-icon name="arrow"
    /></a>
  </div>`,
  styleUrl: './configurator.scss',
})
export class Configurator {
  readonly services = SERVICES;
  readonly selected = input<readonly string[]>([]);
  readonly selectedChange = output<readonly string[]>();
  readonly selectedNames = computed(() =>
    SERVICES.filter((service) => this.selected().includes(service.id)).map(
      (service) => service.name,
    ),
  );
  toggle(id: string): void {
    this.selectedChange.emit(
      this.selected().includes(id)
        ? this.selected().filter((item) => item !== id)
        : [...this.selected(), id],
    );
  }
}
