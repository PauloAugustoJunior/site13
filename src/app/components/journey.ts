import { Component, computed, output, signal } from '@angular/core';
import { JOURNEYS } from '../data/site-content';
import { Icon } from './icon';

@Component({
  selector: 'nexo-journey',
  imports: [Icon],
  template: `<section class="journey section" id="conexoes" aria-labelledby="journey-title">
    <div class="container">
      <div class="journey-top">
        <h2 id="journey-title">O próximo passo<br />pode se conectar a outros.</h2>
        <p>
          A tecnologia não precisa chegar toda de uma vez.<br />Explore caminhos possíveis para o
          seu negócio.
        </p>
      </div>
      <div class="journey-options" role="group" aria-label="Explore um caminho de evolução">
        @for (journey of journeys; track journey.id) {
          <button
            type="button"
            [attr.aria-pressed]="activeId() === journey.id"
            [class.active]="activeId() === journey.id"
            (click)="activeId.set(journey.id)"
            aria-controls="journey-content"
          >
            {{ journey.label }}<nexo-icon name="arrow" />
          </button>
        }
      </div>
      <div class="journey-content" id="journey-content" aria-live="polite" aria-atomic="true">
        <div class="path" aria-label="Conexões possíveis">
          @for (step of activeJourney().steps; track step; let last = $last) {
            <div class="path-step">
              <div class="path-node"><nexo-icon [name]="last ? 'spark' : 'connect'" /></div>
              <span>{{ step }}</span>
            </div>
            @if (!last) {
              <div class="path-connector" aria-hidden="true"></div>
            }
          }
        </div>
        <div class="journey-description">
          <h3>{{ activeJourney().title }}</h3>
          <p>{{ activeJourney().description }}</p>
          <a href="#briefing" class="text-link" (click)="choosePath()"
            >Quero explorar esse caminho <nexo-icon name="diagonal"
          /></a>
        </div>
      </div>
      <p class="journey-note">
        Caminhos ilustrativos. A ordem e as soluções são definidas a partir da sua realidade.
      </p>
    </div>
  </section>`,
  styleUrl: './journey.scss',
})
export class Journey {
  readonly journeys = JOURNEYS;
  readonly activeId = signal(JOURNEYS[0].id);
  readonly activeJourney = computed(
    () => JOURNEYS.find((journey) => journey.id === this.activeId()) ?? JOURNEYS[0],
  );
  readonly choose = output<readonly string[]>();
  choosePath(): void {
    const paths: Readonly<Record<string, readonly string[]>> = {
      comecar: ['presenca', 'automacao', 'analytics'],
      conectar: ['consultoria', 'automacao', 'software'],
      evoluir: ['engenharia', 'analytics', 'ia'],
    };
    this.choose.emit(paths[this.activeId()] ?? []);
  }
}
