import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { Icon } from './icon';

@Component({
  selector: 'nexo-header',
  imports: [Icon],
  template: `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header (keydown.escape)="closeMenu(true)">
      <div class="header-inner container">
        <a href="#inicio" class="brand" aria-label="Nexo, início" (click)="closeMenu()"
          ><svg viewBox="0 0 36 36" aria-hidden="true">
            <path
              d="M4 29V7h7l14 22h7V7h-7v12L17 7H4"
              fill="none"
              stroke="currentColor"
              stroke-width="5"
              stroke-linejoin="round"
            /></svg
          >nexo<span class="brand-dot"></span
        ></a>
        <button
          #menuButton
          class="menu-toggle"
          type="button"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="navegacao"
          (click)="menuOpen.update(toggle)"
        >
          {{ menuOpen() ? 'Fechar' : 'Menu' }}<span [class.open]="menuOpen()"><i></i><i></i></span>
        </button>
        <nav id="navegacao" aria-label="Navegação principal" [class.is-open]="menuOpen()">
          <a href="#solucoes" (click)="closeMenu()">Soluções</a>
          <a href="#conexoes" (click)="closeMenu()">Conexões</a>
          <a href="#sobre" (click)="closeMenu()">A Nexo</a>
          <a href="#processo" (click)="closeMenu()">Como funciona</a>
          <a class="button button-small" href="#briefing" (click)="closeMenu()"
            >Planejar meu projeto <nexo-icon name="diagonal"
          /></a>
        </nav>
      </div>
    </header>`,
  styleUrl: './header.scss',
})
export class Header {
  readonly menuOpen = signal(false);
  readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  readonly toggle = (value: boolean): boolean => !value;
  closeMenu(returnFocus = false): void {
    this.menuOpen.set(false);
    if (returnFocus) this.menuButton()?.nativeElement.focus();
  }
}
