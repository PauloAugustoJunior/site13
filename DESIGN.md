# Nexo — conexões que abrem possibilidades

## Conceito e superfície

Site institucional em modo Persuade, com um configurador de soluções no hero. A seleção real de categorias muda o resumo do projeto e é compartilhada com o briefing. A ideia de ecossistema aparece no comportamento, no explorador de serviços e nas jornadas, sem impor uma ordem de contratação.

A abertura combina mensagem editorial à esquerda com uma superfície de configuração à direita. As seções seguintes variam de composição: catálogo com detalhe, jornadas em campo azul, apresentação em duas colunas, processo numerado, exemplos de aplicação, dúvidas e briefing. Não há fotos de banco nem clientes fictícios.

## Tokens e tipografia

- Tinta `#172c4c`, texto secundário `#56657b`, azul `#294ce7`, azul escuro `#1639c3`.
- Campos claros `#eef3fc`, branco `#ffffff`, linhas `#dce3ed`.
- Laranja `#d36229`, pêssego `#f5dfce`, menta `#d9eee5`, lilás `#e7e2f5`.
- Urbanist variável local, pesos 100–900, licença SIL OFL preservada em `public/fonts/OFL-Urbanist.txt`. Peso de títulos 600, corpo 400, controles 650. Sistema como fallback.
- Conteúdo até 1240px, margens de 48/32/20px, seções de 108/80/64px. Raios distintos entre controles e superfícies. Contraste escuro sobre campos claros; superfícies azuis com texto branco ou tons claros.
- Ícones SVG geométricos originais, mesma espessura de traço. Diagramas e mini interfaces são ilustrações CSS/SVG identificadas, não imagens de projetos reais.

## Referência realmente inspecionada

Referência: https://www.kasterweb.com/ — leitura em 21/11/2026 por ferramenta web, depois HTML/CSS por curl. A tentativa inicial de obter HTML por urllib recebeu HTTP 403; curl com user agent e a ferramenta web funcionaram. A análise complementar do coordenador confirmou o stylesheet `/assets/styles-C-warkP_.css`.

Observações do HTML e CSS reais: menu fixo no topo com dropdowns Soluções, Segmentos, Empresa e Conteúdos; controle de tema claro/escuro; CTA arredondado; menu mobile por botão. Tipografia Inter no corpo e Space Grotesk no display. Variáveis de fundo claro `oklch(98.5% .004 260)` e escuro `oklch(16% .025 264)`, azul primário `oklch(65% .22 245)`, tons de laranja/âmbar e gradientes da marca. Hero combina promessa de negócio com representação de soluções conectadas. Seguem seis frentes de soluções, clientes/depoimentos, indicadores, integrações, conteúdos e CTA. O HTML expõe estados iniciais de animação e contadores em zero; não foram tratados como resultados verificados.

A referência informa amplitude e conexão entre soluções. A Nexo usa texto, marca, fonte, geometria, composição e experiência próprios: configurador no hero, resumo compartilhado com o briefing, lista de serviços com detalhe e jornadas selecionáveis. Nenhum texto comercial, imagem, logo, código, depoimento, certificação ou número da referência foi reutilizado.

## Interação, acessibilidade e movimento

Menu com aria-expanded/controls, Escape e retorno de foco; fecha na navegação. Um h1, landmarks, link de pular conteúdo, foco visível, controles de seleção com aria-pressed, feedback em regiões live, erros associados aos campos e FAQ nativo. Layout pensado a partir de 320px, sem mídia essencial externa. Transições discretas respondem a ações e são desativadas em prefers-reduced-motion. Não há animação contínua.

## Conversão e dados

Sem contatos fornecidos. A configuração tipada CONTACT em `src/app/data/site-content.ts` mantém email, telefone e WhatsApp em null e status pending. Nenhum link inventado de contato. O briefing valida nome, desafio e serviços; gera texto local, permite cópia e download e explica que precisará ser compartilhado por um canal oficial quando definido. Não envia dados, não persiste dados e não simula orçamento ou contratação.
