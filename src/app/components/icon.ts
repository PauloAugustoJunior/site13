import { Component, input } from '@angular/core';

@Component({
  selector: 'nexo-icon',
  template: `<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    @switch (name()) {
      @case ('arrow') {
        <path d="M5 12h14M13 6l6 6-6 6" />
      }
      @case ('diagonal') {
        <path d="M6 18 18 6M6 6h12v12" />
      }
      @case ('web') {
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h4M7 16h9" />
      }
      @case ('code') {
        <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-5 2 2-14" />
      }
      @case ('spark') {
        <path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7L12 3ZM20 3v4m-2-2h4" />
      }
      @case ('connect') {
        <rect x="3" y="3" width="6" height="6" rx="1.5" />
        <rect x="15" y="15" width="6" height="6" rx="1.5" />
        <path d="M15 6h3v9M6 9v9h9m-6-6h6" />
      }
      @case ('chart') {
        <path d="M4 4v16h17M8 15v-4m5 4V7m5 8v-6" />
      }
      @case ('layers') {
        <path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5" />
      }
      @case ('compass') {
        <circle cx="12" cy="12" r="9" />
        <path d="m16 8-2 6-6 2 2-6 6-2Z" />
      }
      @case ('check') {
        <path d="m5 12 4 4L19 6" />
      }
      @case ('download') {
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      }
      @case ('copy') {
        <rect x="8" y="8" width="13" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      }
      @case ('plus') {
        <path d="M12 5v14M5 12h14" />
      }
    }
  </svg>`,
  styles: `
    :host {
      display: inline-flex;
      width: 1.4em;
      height: 1.4em;
      flex-shrink: 0;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly name = input('arrow');
}
