# Nexo · site13

Site institucional autoral da Nexo, empresa brasileira de soluções tecnológicas. Apresenta presença digital, software, inteligência artificial, automações e integrações, analytics, engenharia e ciência de dados e consultoria. Público amplo: pequenas e médias empresas e profissionais liberais, com atendimento remoto em todo o Brasil.

## Executar localmente

Projeto existente preservado: Angular CLI 22.3.0 / Angular 22.3.0, TypeScript 6.0.3, SCSS, Router, componentes standalone, signals, controle de fluxo nativo e Vitest com jsdom. Sem SSR. Node 24.22.3 e npm 12.0.2; `.nvmrc` registra Node 24. Dependências já instaladas por `npm ci`.

```bash
export PATH=/home/codex/.local/bin:$PATH
npm ci
npm start
```

A aplicação fica em **http://localhost:4213/**. O script start executa `ng serve --port 4213`.

```bash
npm run build -- --configuration production
npm test -- --watch=false
```

A saída de produção fica em `dist/site13/browser`. Para um subdiretório de hospedagem, o build pode receber `--base-href /seu-subdiretorio/`. A fonte local é processada pelo bundler para funcionar com o caminho-base. Não há script de lint configurado.

## Conceito e referência

**Conexões que abrem possibilidades.** O hero apresenta um configurador real: selecionar frentes atualiza o resumo e compartilha a seleção com o briefing. Catálogo com detalhe, jornadas selecionáveis e exemplos de aplicação mostram como serviços independentes podem se conectar. A composição varia entre campos claros e azul profundo, com azul elétrico, laranja e diagramas geométricos. Urbanist variável local e licença SIL OFL em `public/fonts`.

Referência solicitada: [Kasterweb](https://www.kasterweb.com/), acessada em 21/11/2026 via web e por leitura de HTML/CSS com curl. Inspeção real: menu fixo com dropdowns, tema claro/escuro, CTA arredondado, Inter/Space Grotesk, base clara e azul com acentos âmbar/laranja, hero com serviços conectados, catálogo, integrações e progressão comercial. A primeira leitura com urllib recebeu HTTP 403; curl e web funcionaram. A evidência complementar do coordenador confirmou o stylesheet real. Não foi feita captura de tela nem comparação visual. `DESIGN.md` registra observações, tokens, diferenças e decisões. A Nexo tem texto, fonte, identidade, composição e interações próprios; nenhum material proprietário foi copiado.

## Organização

- `src/app/pages/home.*`: composição da página e seleção de soluções compartilhada.
- `src/app/components/configurator.*`: catálogo selecionável do hero e resumo do projeto.
- `src/app/components/services.*`: sete frentes, com detalhe e inclusão no briefing.
- `src/app/components/journey.*`: três caminhos ilustrativos e inclusão das soluções relacionadas.
- `src/app/components/briefing.*`: formulário tipado, validação, geração, cópia e download locais.
- `src/app/components/header.*`: menu responsivo, Escape, retorno de foco e navegação.
- `src/app/components/about.*`, `process.*`, `examples.*`, `questions.*`: conteúdo institucional, processo, aplicações ilustrativas e FAQ.
- `src/app/data/site-content.ts`: conteúdo tipado e configuração de contatos.
- `src/styles.scss`: tokens, fonte local, elementos base, foco e redução de movimento.
- `src/app/app.spec.ts`: verificações significativas das interações implementadas.
- `src/index.html`, `public/favicon.svg`: SEO em pt-BR e favicon autoral.

Nenhuma dependência npm foi adicionada. A fonte Urbanist é o único recurso externo incorporado, hospedado localmente com a licença preservada. SVGs e mini interfaces são autorais e não dependem de URLs externas.

## Contatos e briefing

`CONTACT` em `src/app/data/site-content.ts` centraliza `email`, `phone` e `whatsapp` como `string | null`, inicialmente **null**, com `status: 'pending'`. Nenhum contato ou endereço foi inventado. Quando canais reais forem fornecidos, atualize essa configuração e conecte os CTAs apropriados após validação dos valores.

O fluxo atual prepara um briefing local, útil para organizar uma solicitação de escopo e orçamento. O nome precisa ter ao menos 2 caracteres; o desafio, 20; e uma frente deve ser escolhida. Espaços em branco não contam como conteúdo. O texto pode ser copiado ou baixado como `.txt` e deve ser compartilhado por um canal oficial quando disponibilizado. O site não envia dados, não salva em servidor, não persiste em localStorage, não simula envio, preço, orçamento ou contratação. A cópia depende da permissão do navegador; há mensagem de recuperação e download alternativo. Qualquer alteração de campo ou seleção invalida imediatamente o texto e o status. Cópia e download também verificam o estado atual e exigem preparar um novo briefing.

## Acessibilidade e limites

Layout responsivo a partir de 320px; navegação semântica; um h1; link de pular conteúdo; foco visível; menu com aria-expanded/controls e fechamento após navegação/Escape; seleções com aria-pressed; feedback live; campos e erros associados; FAQ nativo; respeito a prefers-reduced-motion. Os dados visuais e caminhos são identificados como ilustrações. Não há clientes, resultados, certificações, depoimentos ou contatos fictícios.

O escopo é local. Não foram feitos screenshots, deploy, push, configuração de domínio, backend ou serviços pagos. O workflow `.github/workflows/pages.yml` preexistente foi preservado sem execução. Os resultados reais de build e testes estão registrados abaixo. O coordenador executou QA técnico de navegador, sem screenshots: Urbanist carregada, sem erros de JavaScript, requisições falhas ou violações axe nos estados desktop, mobile, menu aberto e conteúdo expansível inspecionados. O overflow encontrado em Examples foi corrigido com minmax(0, 1fr), min-width: 0, composição menor em telas estreitas e grid de duas colunas em tablet. A repetição final confirmou zero overflow em 320, 390, 768, 1024 e 1440px.

## Validação final

Execução em 21/11/2026:

- `npm run build -- --configuration production`: aprovado, sem warnings e sem aumentar budgets; 243,90 kB iniciais (68,53 kB estimados em transferência) e página home lazy de 111,08 kB.
- `npm test -- --watch=false`: 1 arquivo e 11 testes aprovados. Cobertura funcional: menu e Escape/foco, seleção do configurador e compartilhamento com briefing, explorador de serviços, jornadas, validação incluindo espaços em branco, geração local, cópia e falha de clipboard, download, invalidação após edição e seleção externa e estrutura semântica.
- `git diff --check -- src/app src/index.html src/styles.scss package.json DESIGN.md README.md`: sem erros. Arquivos de configuração preexistentes com finais de linha CRLF foram preservados.
- `node_modules`, `dist` e `.angular/cache` confirmados no `.gitignore`.
- QA de navegador pelo coordenador: zero overflow em 320/390/768/1024/1440px; Urbanist carregada; zero erros JavaScript ou recursos falhos; zero violações axe em desktop, mobile, menu aberto e conteúdo expansível; menu e teclado funcionais.
- Briefing no navegador: validação de campos inválidos, geração, cópia real para clipboard, download `.txt` com conteúdo atual e invalidação após edição aprovados; documento responsivo em 320/390/768px; zero violações axe nos estados inválido e gerado.

Sem lint configurado. QA final de navegador/axe executado e aprovado pelo coordenador, sem screenshots, conforme descrito acima. Canais oficiais de contato seguem pendentes por ausência de dados fornecidos.
