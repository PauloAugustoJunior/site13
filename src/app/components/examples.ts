import { Component } from '@angular/core';
import { Icon } from './icon';
@Component({
  selector: 'nexo-examples',
  imports: [Icon],
  template: `<section class="section container" aria-labelledby="examples-title">
    <div class="examples-heading">
      <h2 id="examples-title">Conexões que fazem sentido<br />na rotina de um negócio.</h2>
      <p>Possibilidades para visualizar o que podemos construir juntos.</p>
    </div>
    <div class="examples-grid">
      <article>
        <div class="example-visual visual-contact" aria-hidden="true">
          <div class="mini-form">
            <div class="mini-top"><span></span><span></span><span></span></div>
            <div class="mini-text"></div>
            <div class="mini-field"></div>
            <div class="mini-field short"></div>
            <div class="mini-button"></div>
          </div>
          <div class="mini-route"><nexo-icon name="arrow" /></div>
          <div class="mini-message">
            <nexo-icon name="check" /><span
              >Nova oportunidade<br /><strong>Pronta para atender</strong></span
            >
          </div>
        </div>
        <span class="example-type">Presença digital + automação</span>
        <h3>Do interesse ao atendimento.</h3>
        <p>
          Um formulário no site organiza uma solicitação e inicia um fluxo de atendimento, com
          contexto para a equipe continuar a conversa.
        </p>
      </article>
      <article>
        <div class="example-visual visual-data" aria-hidden="true">
          <div class="data-source"><nexo-icon name="layers" /><nexo-icon name="connect" /></div>
          <div class="mini-dashboard">
            <div class="mini-dashboard-heading"></div>
            <div class="bars"><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <span>Visão da operação</span>
          </div>
        </div>
        <span class="example-type">Integrações + dados e BI</span>
        <h3>Informação no mesmo lugar.</h3>
        <p>
          Dados de ferramentas diferentes chegam a um painel para acompanhar indicadores sem montar
          o mesmo relatório manualmente.
        </p>
      </article>
      <article>
        <div class="example-visual visual-ai" aria-hidden="true">
          <div class="ai-sources">
            <span>Documentos</span><span>Processos</span><span>Conhecimento</span>
          </div>
          <div class="ai-line"></div>
          <div class="ai-core">
            <nexo-icon name="spark" /><span>Assistente<br />da equipe</span>
          </div>
        </div>
        <span class="example-type">Software + inteligência artificial</span>
        <h3>Conhecimento mais acessível.</h3>
        <p>
          Um assistente consulta uma base autorizada para apoiar a equipe em perguntas frequentes,
          com regras e supervisão humana.
        </p>
      </article>
    </div>
    <p class="illustration-note">
      Exemplos ilustrativos de aplicação. Não representam projetos entregues ou resultados de
      clientes da Nexo.
    </p>
  </section>`,
  styleUrl: './examples.scss',
})
export class Examples {}
