# Roteiro para criar o sistema **ECOs de Alice**

Este roteiro explica como transformar as regras de *ECOs de Alice* em um sistema para Foundry Virtual Tabletop v14. Ele foi preparado a partir do [manual de campo](alice-manual-de-campo.md), da estrutura existente neste projeto e da [documentação oficial de desenvolvimento de sistemas do Foundry](https://foundryvtt.com/article/system-development/).

Você não está começando do zero: este repositório já é um esqueleto para sistemas do Foundry v14, usando TypeScript, React e ApplicationV2. O trabalho será substituir os exemplos genéricos pelas regras e pela ficha de Alice.

## 1. Primeiro, entenda as peças do Foundry

Uma comparação simples ajuda:

- **`system.json`** é o cartão de apresentação do sistema: nome, versão, tipos de documentos e arquivos que o Foundry carrega.
- **Actor** é um personagem ou criatura.
- **Item** é algo que pertence ao personagem, como um conceito, poder ou equipamento.
- **DataModel** define quais dados esses documentos guardam e valida seus formatos.
- **Sheet** é a interface visual para ler e editar os dados.
- **`src/system.ts`** é o ponto de entrada: registra os modelos e as fichas quando o sistema inicia.
- **`Roll` e Chat** são os recursos do Foundry para fazer rolagens e publicar resultados.

No projeto atual, a ficha ainda é um exemplo: tem Força, Agilidade e Espírito; o item guarda descrição e quantidade. O sistema ainda se identifica como `fvtt-ts-react-boilerplate`. Essa diferença entre a base e o jogo está explicada em [architecture.md](architecture.md) e [renaming-the-system.md](renaming-the-system.md).

## 2. Antes de programar, decida algumas ambiguidades das regras

É mais fácil implementar regras quando elas não dependem de interpretação durante a programação. Eu anotaria estas perguntas para resolver antes de automatizá-las:

1. **Como contar sucessos?** O manual chama 4 de sucesso custoso e 5/6 de sucesso limpo. Em algumas passagens, a dificuldade pede um número de sucessos; em outras, o crítico exige o dobro da dificuldade em sucessos limpos. Defina se os resultados 4 contam para completar a dificuldade, além de gerar custo.
2. **O que acontece com uma reserva de zero dados?** O dano reduz dados, e o colapso pode levar um atributo a zero. Defina se o personagem deixa de poder tentar certas ações ou se existe alguma rolagem alternativa.
3. **Como funciona um colapso que reduz um atributo a zero?** O manual diz que o personagem sai de jogo quando chega a zero, mas também descreve uma transferência de ponto para outro atributo. Defina qual regra prevalece nesse momento.
4. **Há limites para os atributos depois da criação?** Na criação, cada atributo tem máximo 4; o manual não esclarece se esse máximo continua valendo após os colapsos.
5. **Separe os dois usos de “Tensão”.** Há um dado coletivo de tensão ligado à surpresa e um contador de tensão que pode causar um Surto. Eles são recursos diferentes, apesar do nome parecido.
6. **Quando o Surto é acionado?** O gatilho soma falhas e sucessos custosos; determine se ele dispara uma única vez ao atingir o limite ou se pode disparar novamente na mesma cena.
7. **Os conceitos são habilidades ou texto descritivo?** A regra diz que um conceito pode dar +1 dado e reduzir a dificuldade em 1. Defina se isso se aplica sempre que o conceito for relevante ou se o Narrador escolhe qual benefício usar.

Isso é especialmente importante porque criação, rolagens e colapsos dependem de decisões consistentes. A ficha pode mostrar as regras e deixar a decisão ao Narrador no começo; não é necessário automatizar tudo de primeira.

## 3. Renomeie o esqueleto para ECOs de Alice

Escolha um identificador curto, minúsculo e sem espaços, por exemplo `ecos-de-alice`. Depois, siga a lista de renomeação do projeto:

- Atualize o identificador, título, descrição e compatibilidade em [system.json](../system.json).
- Atualize o nome do pacote em [package.json](../package.json).
- Substitua o identificador de registro e as classes CSS nas fichas e no registro em [system.ts](../src/system.ts), [character-sheet.ts](../src/sheets/character-sheet.ts) e [item-sheet.ts](../src/sheets/item-sheet.ts).
- Defina a namespace de tradução própria do sistema, seguindo [localization.md](localization.md).

Pense no `id` do sistema como um nome permanente: mudar depois pode afetar instalação, mundos e referências ao sistema. Não copie configurações antigas de um tutorial sem conferir a versão; aqui, o projeto já declara suporte ao Foundry v14.

## 4. Desenhe primeiro os dados da ficha

Uma ficha de personagem precisa registrar, no mínimo:

- **Forma, Lógica e Devaneio**: pontuação atual de cada atributo.
- **Integridade**: quanto dano foi marcado em cada atributo, de 0 a 3.
- **Naipe e qualidade** de Forma e Lógica; **naipe e defeito** de Devaneio.
- **Vivência**: profissão ou passado e seu valor aplicável ao teste.
- **Conceitos** associados a cada atributo.
- Os demais campos que você decidir incluir, como nome, biografia, Totem ou observações.

Para a Integridade, uma representação interna simples é um número de 0 a 3 por atributo. A ficha pode desenhar esse número como três caixinhas; cada caixa marcada corresponde a -1 dado. Isso evita guardar três valores separados quando a regra só precisa saber quantas caixas estão marcadas.

A criação exige validação entre campos: os três atributos começam com **6 pontos no total**, cada um entre **1 e 4**. Os limites individuais podem ser configurados no modelo; a soma dos três precisa ser conferida pela interface de criação ou por uma validação adicional. Não deixe a ficha aceitar silenciosamente um total inválido.

O projeto define esses dados em [character-data.ts](../src/data/character-data.ts) e informa os tipos ao TypeScript em [data-config.d.ts](../src/types/data-config.d.ts). A arquitetura adotada usa `documentTypes` no manifesto e `DataModel` em vez de `template.json`; veja [architecture.md](architecture.md).

## 5. Construa uma ficha pequena e funcional

Organize a ficha em três blocos visuais: **Forma**, **Lógica** e **Devaneio**. Em cada bloco, mostre pontuação, naipe, qualidade ou defeito, conceitos e as três caixas de Integridade. Inclua também Vivência.

O projeto já tem uma ficha React em [CharacterSheetApp.tsx](../src/sheets/components/CharacterSheetApp.tsx). Ela mostra como ler os dados do Actor e salvá-los com `actor.update(...)`. Você substituiria os atributos de exemplo pelos campos acima, preservando a ligação da ficha React com a janela de ActorSheetV2. A montagem dessa interface está em [character-sheet.ts](../src/sheets/character-sheet.ts).

Uma boa primeira meta é a ficha **exibir e salvar** os dados corretamente. Deixe botões de rolagem, colapsos e automações para as etapas seguintes. Assim, quando algo não funcionar, você sabe se o problema está nos dados ou na regra.

## 6. Implemente as regras como pequenas funções testáveis

Antes de conectar uma regra à ficha, represente seus cálculos como funções simples, sem depender de Actor, React ou outros objetos do Foundry. O projeto já usa esse padrão em [CharacterSheetApp.logic.ts](../src/sheets/components/CharacterSheetApp.logic.ts), com testes em [CharacterSheetApp.logic.test.ts](../src/sheets/components/CharacterSheetApp.logic.test.ts).

Comece com cálculos independentes:

- validar a distribuição inicial dos seis pontos;
- calcular a reserva: atributo + bônus de conceito + bônus de Vivência - penalidade de Integridade;
- classificar os resultados de cada dado;
- determinar sucesso, custo, falha e críticos segundo as definições que vocês fecharam;
- calcular a mudança causada por um colapso.

Nos colapsos, não automatize escolhas pessoais sem necessidade. O jogador ou Narrador precisa escolher qual conceito será perdido e qual novo conceito entra. O sistema pode exibir o resultado do cálculo e pedir essa confirmação antes de salvar.

## 7. Use a rolagem nativa do Foundry e mostre o resultado no chat

Quando a ficha e os cálculos estiverem funcionando, adicione uma ação de rolagem. O Foundry tem um recurso próprio de rolagem (`Roll`); use-o para que os dados apareçam como rolagens do Foundry, e não como números calculados fora dele. A documentação oficial do [Roll na API v14](https://foundryvtt.com/api/v14/classes/foundry.dice.Roll.html) descreve avaliação, exibição e envio da rolagem ao Chat.

A ficha deve mostrar o nome do personagem, o atributo usado, os bônus e a quantidade de dados. O resultado no Chat deve deixar compreensível quais dados foram rolados e como o sistema chegou ao desfecho. A leitura dos resultados — por exemplo, contar 4, 5 e 6 separadamente — deve seguir as decisões que você definiu na etapa 2.

## 8. Acrescente cartas e mecânicas de cena por etapas

Os conceitos da seção de cartas são conteúdo do jogo, não precisam ficar todos embutidos na interface. Uma sequência amigável para iniciantes seria:

1. Permitir anotar conceitos na ficha e testar as rolagens.
2. Criar um tipo de Item para **conceito**, com atributos como nome, atributo associado, naipe, carta e descrição do efeito.
3. Depois, organizar esses Items em um compêndio para que possam ser escolhidos e adicionados à ficha.

O guia [adding-content.md](adding-content.md) explica como adicionar tipos de Actor ou Item ao projeto. Para a primeira versão, não é preciso cadastrar todos os poderes da tabela.

Deixe para uma fase posterior as regras que envolvem a mesa toda ou a cena: Relógio do Espelho, contador de tensão, surtos, mundos, Zonas, dado coletivo de surpresa, NPCs e conteúdo da aventura. Essas partes podem exigir registros diferentes do Actor, então vale implementá-las depois que a ficha e a rolagem básica estiverem estáveis.

## 9. Verifique cada etapa dentro e fora do Foundry

O projeto já oferece comandos para verificar a compilação, os tipos, o estilo e os testes. O guia [testing-and-linting.md](testing-and-linting.md) explica o que cada um cobre. Em cada marco, rode:

```sh
npm run typecheck
npm run lint
npm run test
npm run build
```

Depois, abra um mundo de teste no Foundry v14 e confira, pelo menos:

- se o sistema aparece com o nome correto;
- se é possível criar um personagem e salvar a ficha;
- se uma distribuição inválida de pontos é detectada;
- se marcar Integridade reduz a reserva como esperado;
- se os resultados da rolagem e as consequências aparecem corretamente;
- se os dados continuam salvos depois de fechar e reabrir a ficha.

O [guia oficial de desenvolvimento de sistemas](https://foundryvtt.com/article/system-development/) também recomenda começar pelo modelo de dados, construir aos poucos e testar o sistema dentro do Foundry.

## Resumo

Sua primeira meta não precisa ser “automatizar o RPG inteiro”. Faça primeiro o sistema carregar, depois a ficha guardar os dados, depois implemente e teste a rolagem. Quando essas três partes estiverem confiáveis, conceitos, colapsos e regras de cena serão muito mais fáceis de acrescentar.
