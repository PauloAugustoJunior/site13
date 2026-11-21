export interface Service {
  readonly id: string;
  readonly name: string;
  readonly short: string;
  readonly title: string;
  readonly description: string;
  readonly deliverables: readonly string[];
  readonly connection: string;
  readonly icon: string;
}

export const CONTACT = {
  email: null as string | null,
  phone: null as string | null,
  whatsapp: null as string | null,
  status: 'pending' as const,
};

export const SERVICES: readonly Service[] = [
  {
    id: 'presenca',
    name: 'Presença digital',
    short: 'Ser encontrado. Criar oportunidades.',
    title: 'Uma presença que faz parte do negócio.',
    description:
      'Do primeiro contato à compra: criamos experiências digitais claras, rápidas e preparadas para o que vem depois.',
    deliverables: ['Sites e landing pages', 'Portais e e-commerce', 'Aplicações web'],
    connection: 'Seu site pode se conectar ao atendimento, às vendas e aos dados da operação.',
    icon: 'web',
  },
  {
    id: 'software',
    name: 'Software sob medida',
    short: 'Sua operação, do seu jeito.',
    title: 'Tecnologia que acompanha a sua forma de trabalhar.',
    description:
      'Desenvolvemos sistemas para resolver necessidades específicas, simplificar rotinas e organizar processos em uma experiência única.',
    deliverables: ['Sistemas e plataformas', 'Aplicativos mobile', 'Modernização de sistemas'],
    connection: 'Uma base própria que conversa com as ferramentas que você já utiliza.',
    icon: 'code',
  },
  {
    id: 'ia',
    name: 'Inteligência artificial',
    short: 'Mais possibilidades para sua equipe.',
    title: 'Inteligência aplicada a desafios reais.',
    description:
      'Desenhamos agentes, assistentes e chatbots para apoiar pessoas, organizar informações e tornar processos mais eficientes, com limites e supervisão definidos.',
    deliverables: ['Agentes e assistentes', 'Chatbots de atendimento', 'IA em processos internos'],
    connection: 'IA ganha contexto quando se conecta às informações e aos sistemas do negócio.',
    icon: 'spark',
  },
  {
    id: 'automacao',
    name: 'Automações e integrações',
    short: 'Menos repetição. Mais conexão.',
    title: 'Faça suas ferramentas trabalharem juntas.',
    description:
      'Conectamos etapas, sistemas e pessoas para reduzir tarefas repetitivas e evitar que informações se percam entre uma ferramenta e outra.',
    deliverables: [
      'Integrações via APIs',
      'WhatsApp e ferramentas empresariais',
      'Fluxos automatizados',
    ],
    connection:
      'Conecte um formulário ao atendimento, um pedido ao sistema ou uma ação a um alerta.',
    icon: 'connect',
  },
  {
    id: 'analytics',
    name: 'Dados e analytics',
    short: 'Enxergar melhor para decidir.',
    title: 'Transforme informação em uma visão clara.',
    description:
      'Organizamos indicadores e construímos dashboards que ajudam a entender o negócio e acompanhar o que realmente precisa de atenção.',
    deliverables: ['Dashboards e BI', 'Análise de dados', 'Indicadores de negócio'],
    connection: 'De fontes dispersas a uma visão compartilhada pela equipe.',
    icon: 'chart',
  },
  {
    id: 'engenharia',
    name: 'Engenharia e ciência de dados',
    short: 'Uma base sólida para avançar.',
    title: 'Prepare seus dados para novas possibilidades.',
    description:
      'Estruturamos o caminho dos dados, da origem ao uso, com modelagem e soluções analíticas adequadas à maturidade do negócio.',
    deliverables: [
      'Pipelines e ETL/ELT',
      'Integração e modelagem de fontes',
      'Predição e machine learning',
    ],
    connection: 'A estrutura de dados sustenta análises, automações e aplicações de IA.',
    icon: 'layers',
  },
  {
    id: 'consultoria',
    name: 'Consultoria em tecnologia',
    short: 'Clareza antes do próximo passo.',
    title: 'Encontre o caminho que faz sentido agora.',
    description:
      'Entendemos seu cenário, avaliamos possibilidades e ajudamos a escolher prioridades com uma visão técnica e de negócio.',
    deliverables: ['Diagnóstico e prioridades', 'Arquitetura de soluções', 'Transformação digital'],
    connection: 'Um diagnóstico pode orientar um projeto pontual ou uma evolução por etapas.',
    icon: 'compass',
  },
];

export interface Journey {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly steps: readonly string[];
}
export const JOURNEYS: readonly Journey[] = [
  {
    id: 'comecar',
    label: 'Criar uma base digital',
    title: 'Comece pelo encontro com o seu cliente.',
    description:
      'Uma presença digital pode ser o ponto de partida. Com o tempo, atendimento, processos e dados podem se conectar a ela.',
    steps: ['Presença digital', 'Atendimento', 'Automações', 'Dados e BI'],
  },
  {
    id: 'conectar',
    label: 'Conectar a operação',
    title: 'Menos ilhas. Uma operação mais fluida.',
    description:
      'Conecte ferramentas existentes, automatize passagens manuais e reúna informações para acompanhar a operação com mais clareza.',
    steps: ['Diagnóstico', 'Integrações', 'Automações', 'Software sob medida'],
  },
  {
    id: 'evoluir',
    label: 'Explorar dados e IA',
    title: 'Dê um próximo uso ao que você já sabe.',
    description:
      'Estruture suas fontes, entenda os indicadores e explore aplicações de inteligência artificial com contexto, critérios e acompanhamento.',
    steps: ['Engenharia de dados', 'Analytics e BI', 'Ciência de dados', 'Inteligência artificial'],
  },
];

export const FAQ = [
  {
    question: 'Preciso contratar todas as soluções?',
    answer:
      'Não. Cada serviço pode ser contratado separadamente. Podemos resolver uma necessidade específica e planejar conexões futuras quando elas fizerem sentido para o seu negócio.',
  },
  {
    question: 'A Nexo atende empresas de qualquer segmento?',
    answer:
      'Atendemos pequenas e médias empresas e profissionais liberais em diferentes áreas. O ponto de partida é entender o desafio e avaliar a solução adequada, sem restringir o atendimento a um único setor.',
  },
  {
    question: 'Como funcionam prazo e orçamento?',
    answer:
      'O escopo, o prazo e o investimento dependem das necessidades, das integrações e da complexidade do projeto. Um briefing ajuda a organizar essas informações para a elaboração de uma proposta.',
  },
  {
    question: 'Posso aproveitar as ferramentas que já uso?',
    answer:
      'Sim. Avaliamos sistemas, APIs, permissões e condições técnicas para identificar o que pode ser integrado ou modernizado. A viabilidade de cada conexão é confirmada no diagnóstico.',
  },
  {
    question: 'O atendimento é remoto?',
    answer:
      'Sim. A Nexo atende remotamente em todo o Brasil. Conversas, alinhamentos e acompanhamento do projeto podem acontecer a distância.',
  },
];
