import { DOCUMENT } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { SERVICES } from '../data/site-content';
import { Icon } from './icon';

const minimumText =
  (length: number): ValidatorFn =>
  (control) =>
    typeof control.value === 'string' && control.value.trim().length >= length
      ? null
      : { minimumText: true };

@Component({
  selector: 'nexo-briefing',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './briefing.html',
  styleUrl: './briefing.scss',
})
export class Briefing {
  private readonly builder = inject(FormBuilder);
  private readonly document = inject(DOCUMENT);
  readonly selectedServices = input<readonly string[]>([]);
  readonly selectedChange = output<readonly string[]>();
  readonly services = SERVICES;
  readonly attempted = signal(false);
  private readonly formVersion = signal(0);
  private readonly prepared = signal<{ key: string; text: string } | null>(null);
  private readonly notice = signal<{ key: string; text: string } | null>(null);
  private readonly currentKey = computed(() =>
    JSON.stringify([this.formVersion(), [...this.selectedServices()].sort()]),
  );
  readonly generated = computed(() => {
    const document = this.prepared();
    return document?.key === this.currentKey() ? document.text : '';
  });
  readonly status = computed(() => {
    const message = this.notice();
    return message?.key === this.currentKey() ? message.text : '';
  });
  readonly form = this.builder.nonNullable.group({
    name: ['', [Validators.required, minimumText(2), Validators.maxLength(80)]],
    goal: ['', [Validators.required, minimumText(20), Validators.maxLength(1200)]],
    tools: ['', Validators.maxLength(500)],
    timeframe: ['Ainda estou explorando'],
  });
  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.formVersion.update((version) => version + 1);
      this.prepared.set(null);
      this.notice.set(null);
    });
    effect(() => {
      const key = this.currentKey();
      const document = untracked(this.prepared);
      const message = untracked(this.notice);
      if (document && document.key !== key) this.prepared.set(null);
      if (message && message.key !== key) this.notice.set(null);
    });
  }
  private setStatus(text: string): void {
    this.notice.set({ key: this.currentKey(), text });
  }
  invalid(field: 'name' | 'goal'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.attempted());
  }
  toggleService(id: string): void {
    this.selectedChange.emit(
      this.selectedServices().includes(id)
        ? this.selectedServices().filter((item) => item !== id)
        : [...this.selectedServices(), id],
    );
    this.prepared.set(null);
    this.notice.set(null);
  }
  generate(): void {
    this.attempted.set(true);
    this.form.markAllAsTouched();
    this.notice.set(null);
    if (this.form.invalid || !this.selectedServices().length) {
      const target = this.form.controls.name.invalid
        ? 'brief-name'
        : this.form.controls.goal.invalid
          ? 'brief-goal'
          : 'brief-services';
      this.document.getElementById(target)?.focus();
      this.prepared.set(null);
      this.notice.set(null);
      return;
    }
    const value = this.form.getRawValue();
    const names = this.services
      .filter((service) => this.selectedServices().includes(service.id))
      .map((service) => service.name);
    this.prepared.set({
      key: this.currentKey(),
      text: `BRIEFING DE PROJETO — NEXO\n\nNome ou empresa: ${value.name.trim()}\n\nFrentes de interesse:\n${names.map((name) => `• ${name}`).join('\n')}\n\nDesafio e objetivo:\n${value.goal.trim()}\n\nFerramentas e contexto atual:\n${value.tools.trim() || 'A detalhar no diagnóstico.'}\n\nMomento do projeto: ${value.timeframe}\n\nEste é um briefing inicial para avaliação de escopo, prazo e orçamento. Não representa contratação nem proposta comercial. Compartilhe por um canal oficial da Nexo quando disponibilizado. Nenhum dado foi enviado por este site.`,
    });
    this.setStatus('Briefing preparado. Você pode copiar o texto ou baixar o arquivo.');
  }
  async copy(): Promise<void> {
    const text = this.generated();
    if (!text) {
      this.setStatus('Prepare um novo briefing antes de copiar.');
      return;
    }
    const key = this.currentKey();
    try {
      await navigator.clipboard.writeText(text);
      if (key === this.currentKey())
        this.setStatus(
          'Briefing copiado. Compartilhe por um canal oficial da Nexo quando disponibilizado.',
        );
    } catch {
      if (key === this.currentKey())
        this.setStatus(
          'A cópia automática não está disponível. Selecione o texto do briefing para copiar ou baixe o arquivo.',
        );
    }
  }
  download(): void {
    const text = this.generated();
    if (!text) {
      this.setStatus('Prepare um novo briefing antes de baixar.');
      return;
    }
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = this.document.createElement('a');
    link.href = url;
    link.download = 'briefing-nexo.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    this.setStatus(
      'Arquivo preparado para download. Compartilhe por um canal oficial da Nexo quando disponibilizado.',
    );
  }
}
