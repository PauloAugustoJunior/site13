import { Component, computed, output, signal } from '@angular/core';
import { SERVICES } from '../data/site-content';
import { Icon } from './icon';

@Component({
  selector: 'nexo-services',
  imports: [Icon],
  template: `<section class="section container" id="solucoes" aria-labelledby="solutions-title">
    <div class="section-heading">
      <h2 id="solutions-title">Um desafio específico.<br />Um mundo de soluções.</h2>
      <p>
        Comece pelo que o seu negócio precisa.<br />Cada serviço funciona sozinho e pode<br
          class="desktop-break"
        />
        ganhar força em novas conexões.
      </p>
    </div>
    <div class="service-explorer">
      <div class="service-menu" role="group" aria-label="Conheça nossas soluções">
        @for (service of services; track service.id) {
          <button
            type="button"
            [class.active]="activeId() === service.id"
            [attr.aria-pressed]="activeId() === service.id"
            aria-controls="service-detail"
            (click)="activeId.set(service.id)"
          >
            <nexo-icon [name]="service.icon" /><span>{{ service.name }}</span
            ><nexo-icon name="diagonal" />
          </button>
        }
      </div>
      <article id="service-detail" class="service-detail" aria-live="polite" aria-atomic="true">
        <div class="service-detail-top">
          <nexo-icon [name]="activeService().icon" /><span>Feito para o seu contexto</span>
        </div>
        <h3>{{ activeService().title }}</h3>
        <p>{{ activeService().description }}</p>
        <ul>
          @for (item of activeService().deliverables; track item) {
            <li><nexo-icon name="check" />{{ item }}</li>
          }
        </ul>
        <div class="connection-note">
          <nexo-icon name="connect" />
          <p>{{ activeService().connection }}</p>
        </div>
        <a href="#briefing" class="text-link" (click)="choose.emit(activeId())"
          >Incluir no meu projeto <nexo-icon name="arrow"
        /></a>
      </article>
    </div>
  </section>`,
  styleUrl: './services.scss',
})
export class Services {
  readonly services = SERVICES;
  readonly activeId = signal(SERVICES[0].id);
  readonly activeService = computed(
    () => SERVICES.find((service) => service.id === this.activeId()) ?? SERVICES[0],
  );
  readonly choose = output<string>();
}
