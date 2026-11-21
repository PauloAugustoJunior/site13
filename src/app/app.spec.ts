import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { Header } from './components/header';
import { Configurator } from './components/configurator';
import { Services } from './components/services';
import { Journey } from './components/journey';
import { Briefing } from './components/briefing';
import { Home } from './pages/home';
import { CONTACT } from './data/site-content';

function element<T extends Element>(root: HTMLElement, selector: string): T {
  const result = root.querySelector<T>(selector);
  if (!result) throw new Error(`Elemento não encontrado: ${selector}`);
  return result;
}

describe('Nexo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Header, Configurator, Services, Journey, Briefing, Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the brand and keeps unprovided contacts pending', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('nexo');
    expect(CONTACT).toEqual({ email: null, phone: null, whatsapp: null, status: 'pending' });
  });

  it('opens the mobile navigation, closes after a link and handles Escape with focus', async () => {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const toggle = element<HTMLButtonElement>(root, '.menu-toggle');
    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(element(root, '#navegacao').classList.contains('is-open')).toBe(true);
    element<HTMLAnchorElement>(root, '#navegacao a').click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    await fixture.whenStable();
    element(root, 'header').dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('shares configurator selections with the briefing', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const buttons = root.querySelectorAll<HTMLButtonElement>(
      'nexo-configurator .solution-grid button',
    );
    buttons[2].click();
    await fixture.whenStable();
    expect(buttons[2].getAttribute('aria-pressed')).toBe('true');
    expect(fixture.componentInstance.selectedServices()).toContain('ia');
    expect(element(root, 'nexo-configurator .project-summary').textContent).toContain(
      'Inteligência artificial',
    );
    const selectedInBrief = [
      ...root.querySelectorAll<HTMLButtonElement>('.brief-service-options button'),
    ].find((button) => button.textContent?.includes('Inteligência artificial'));
    expect(selectedInBrief?.getAttribute('aria-pressed')).toBe('true');
    buttons[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selectedServices()).not.toContain('ia');
  });

  it('changes service content and emits the selected service', async () => {
    const fixture = TestBed.createComponent(Services);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const emitted: string[] = [];
    fixture.componentInstance.choose.subscribe((id) => emitted.push(id));
    root.querySelectorAll<HTMLButtonElement>('.service-menu button')[4].click();
    await fixture.whenStable();
    expect(element(root, '#service-detail h3').textContent).toContain('Transforme informação');
    expect(element(root, '#service-detail').textContent).toContain('Dashboards e BI');
    element<HTMLAnchorElement>(root, '#service-detail a').click();
    expect(emitted).toEqual(['analytics']);
  });

  it('changes a journey and can add its solutions to a project', async () => {
    const fixture = TestBed.createComponent(Journey);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const paths: (readonly string[])[] = [];
    fixture.componentInstance.choose.subscribe((ids) => paths.push(ids));
    root.querySelectorAll<HTMLButtonElement>('.journey-options button')[2].click();
    await fixture.whenStable();
    expect(element(root, '#journey-content').textContent).toContain('Ciência de dados');
    expect(element(root, '#journey-content h3').textContent).toContain('Dê um próximo uso');
    element<HTMLAnchorElement>(root, '#journey-content a').click();
    expect(paths).toEqual([['engenharia', 'analytics', 'ia']]);
  });

  it('validates a briefing and rejects whitespace-only values and missing services', async () => {
    const fixture = TestBed.createComponent(Briefing);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    element<HTMLButtonElement>(root, '.generate-button').click();
    await fixture.whenStable();
    expect(root.querySelectorAll('.error').length).toBe(3);
    expect(fixture.componentInstance.generated()).toBe('');
    fixture.componentInstance.form.setValue({
      name: '  ',
      goal: '                         ',
      tools: '',
      timeframe: 'Ainda estou explorando',
    });
    fixture.componentInstance.generate();
    expect(fixture.componentInstance.form.invalid).toBe(true);
    fixture.componentInstance.form.setValue({
      name: 'Empresa exemplo',
      goal: 'Preciso conectar meu site ao atendimento da equipe.',
      tools: '',
      timeframe: 'Ainda estou explorando',
    });
    fixture.componentInstance.generate();
    expect(fixture.componentInstance.generated()).toBe('');
  });

  it('prepares an honest local briefing and copies its content', async () => {
    const fixture = TestBed.createComponent(Briefing);
    fixture.componentRef.setInput('selectedServices', ['ia', 'analytics']);
    await fixture.whenStable();
    const component = fixture.componentInstance;
    component.form.setValue({
      name: 'Projeto exemplo',
      goal: 'Quero organizar os dados e explorar um assistente para minha equipe.',
      tools: 'Planilhas',
      timeframe: 'Quero planejar os próximos meses',
    });
    component.generate();
    await fixture.whenStable();
    expect(component.generated()).toContain('Inteligência artificial');
    expect(component.generated()).toContain('Dados e analytics');
    expect(component.generated()).toContain('Nenhum dado foi enviado');
    expect(
      element<HTMLTextAreaElement>(fixture.nativeElement as HTMLElement, '#brief-result').value,
    ).toContain('Projeto exemplo');
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    await component.copy();
    expect(writeText).toHaveBeenCalledWith(component.generated());
    expect(component.status()).toContain('copiado');
  });

  it('offers a downloadable text file and reports clipboard failure accurately', async () => {
    const fixture = TestBed.createComponent(Briefing);
    const component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedServices', ['analytics']);
    await fixture.whenStable();
    component.form.setValue({
      name: 'Projeto exemplo',
      goal: 'Preciso organizar os dados e criar um painel da operação.',
      tools: 'Planilhas',
      timeframe: 'Ainda estou explorando',
    });
    component.generate();
    const createObjectURL = vi.fn().mockReturnValue('blob:nexo-example');
    const revokeObjectURL = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { value: createObjectURL, configurable: true });
    Object.defineProperty(URL, 'revokeObjectURL', { value: revokeObjectURL, configurable: true });
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined);
    component.download();
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(click).toHaveBeenCalledOnce();
    expect(component.status()).toContain('download');
    click.mockRestore();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('not allowed')) },
      configurable: true,
    });
    await component.copy();
    expect(component.status()).toContain('não está disponível');
  });

  it('invalidates a prepared document and status after editing any project field', async () => {
    const fixture = TestBed.createComponent(Briefing);
    fixture.componentRef.setInput('selectedServices', ['analytics']);
    await fixture.whenStable();
    const component = fixture.componentInstance;
    component.form.setValue({
      name: 'Projeto exemplo',
      goal: 'Preciso organizar os dados e criar um painel da operação.',
      tools: 'Planilhas',
      timeframe: 'Ainda estou explorando',
    });
    const edits = [
      () => component.form.controls.name.setValue('Outro nome'),
      () =>
        component.form.controls.goal.setValue(
          'Quero um painel para acompanhar melhor minha operação.',
        ),
      () => component.form.controls.tools.setValue('Sistema de gestão'),
      () => component.form.controls.timeframe.setValue('Tenho uma necessidade para agora'),
    ];
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    const createObjectURL = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { value: createObjectURL, configurable: true });
    for (const edit of edits) {
      component.generate();
      expect(component.generated()).toContain('BRIEFING');
      expect(component.status()).toContain('preparado');
      edit();
      expect(component.generated()).toBe('');
      expect(component.status()).toBe('');
      await component.copy();
      component.download();
    }
    expect(writeText).not.toHaveBeenCalled();
    expect(createObjectURL).not.toHaveBeenCalled();
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('#brief-result')).toBeNull();
  });

  it('invalidates a briefing immediately when selected services change externally', async () => {
    const fixture = TestBed.createComponent(Briefing);
    fixture.componentRef.setInput('selectedServices', ['analytics']);
    await fixture.whenStable();
    const component = fixture.componentInstance;
    component.form.setValue({
      name: 'Projeto exemplo',
      goal: 'Preciso organizar os dados e criar um painel da operação.',
      tools: '',
      timeframe: 'Ainda estou explorando',
    });
    component.generate();
    expect(component.generated()).toContain('Dados e analytics');
    fixture.componentRef.setInput('selectedServices', ['software']);
    expect(component.generated()).toBe('');
    expect(component.status()).toBe('');
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    await component.copy();
    expect(writeText).not.toHaveBeenCalled();
    await fixture.whenStable();
    component.generate();
    expect(component.generated()).toContain('Software sob medida');
    expect(component.generated()).not.toContain('Dados e analytics');
  });

  it('renders one main heading, semantic FAQ and illustration disclosures', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('h1').length).toBe(1);
    expect(root.querySelectorAll('details summary').length).toBe(5);
    expect(root.textContent).toContain('Não representam projetos entregues');
    expect(root.textContent).toContain('Nenhuma informação é enviada');
  });
});
