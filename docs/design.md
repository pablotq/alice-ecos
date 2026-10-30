# 🃏 DESIGN SPECIFICATION: FICHA "DECK DE CARTAS" & WONDERLAND CHAOS

## Ecos de Alice — Actor Sheet para Foundry VTT (React + SCSS)

---

## 1. CONCEITO E DIREÇÃO ARTÍSTICA

O design da ficha foi pensado como uma mesa caótica de cartas flutuantes, com elementos lúdicos e surreais espalhados pela interface. A ideia é criar uma sensação de "baralho vivo" no universo de Alice, sem perder legibilidade e organização da ficha de personagem.

A estética mistura:
- papel de carta / pergaminho antigo
- vibração surreal de Wonderland
- visual de jogo de tabela com contraste forte
- cor e naipe como linguagem visual principal
- elementos decorativos suaves, mas marcantes, em estilo doodle pop art

### Elementos temáticos
- Cartas gigantes e máscaras de naipe
- Relógios de bolso, chaves, cogumelos e cartas de baralho
- Textura de fundo em padrão repetitivo
- Doodles vibrantes em posições aleatórias
- Toques neon no tema escuro

---

## 2. PALETA DE CORES E TEMAS

### Tema claro (Pergaminho caótico / ilustrado)

Base visual:
- Fundo principal: #f5f0e6
- Fundo profundo: #e2d7c5
- Cartas: #fffaf1
- Bordas: #3a2d27
- Texto principal: #2b1e18
- Texto secundário: #6b5c54

Acentos:
- Form: #00c985
- Logic: #ff3d6d
- Dream: #f4b942
- Defect: #8a5cf6

### Tema escuro (Neon chaos / Wonderland noturno)

Base visual:
- Fundo principal: #0a0812
- Fundo profundo: #120c1c
- Cartas: #14101f
- Bordas: #9d4edd
- Texto principal: #f1faee
- Texto secundário: #a0a0b2

Acentos:
- Form: #00ff88
- Logic: #ff2a55
- Dream: #ffd700
- Defect: #9d4edd

### Naipes e uso visual
- Copas: #d62828
- Ouro: #d4af37
- Paus: #2a9d8f
- Espadas: #457b9d

Esses valores são usados em:
- cartão do atributo
- badge do naipe
- borda dos slots
- rolagem e resultados no chat
- carta de defeito
- botões e destaques visuais

---

## 3. ESTRUTURA DA FICHA

A ficha principal é composta por 4 blocos principais:

1. Header da ficha
2. Identidade do personagem
3. Grid de atributos
4. Defeito / cartas / notas

### 3.1 Header
No topo da ficha, o usuário encontra:
- título principal: Alice: E.C.O.S
- botão de tema único no lado direito
- identidade visual forte e clara

A estrutura do header é pensada para manter equilíbrio visual e não competir com o conteúdo principal.

### 3.2 Identidade do personagem
A ficha inclui:
- nome do personagem
- vivência / conceito
- ponto de status e métricas principais
- organização em blocos legíveis, sem poluição visual

### 3.3 Grid de atributos
Os atributos principais são renderizados em 3 colunas:
- Forma
- Lógica
- Devaneio

Cada cartão de atributo contém:
- nome do atributo
- valor numérico
- ícone / marca do naipe
- select para naipe
- integridade
- botão de rolagem
- área para cartas relacionadas ao slot

### 3.4 Carta de defeito
A carta de defeito é tratada como um bloco separado, mas visualmente conectado ao sistema principal. Ela acompanha o naipe da carta de defeito atribuída ao personagem.

Regras visuais:
- se houver carta de defeito na ficha, o naipe do defeito deve refletir essa carta
- se não houver, usar fallback do sistema
- o ícone do defeito e a borda devem obedecer à paleta do naipe

---

## 4. RACIONAL DE DESIGN DOS SLOTS

Os slots seguem a organização de cartas do sistema:
- form
- logic
- dream
- defect

Isso garante que cada carta esteja em seu contexto correto e o layout siga a lógica da ficha.

Cada slot precisa manter:
- associação com o atributo correspondente
- identidade visual por cor
- comportamento consistente de drag/drop
- borda e destaque visuais próprios

---

## 5. PALAVRA-CHAVE: DECK DE CARTAS

A interface foi desenhada como se a ficha fosse uma mesa de jogo invisível:
- cada atributo é uma carta destacada
- cada slot é um espaço de uso
- cada resultado de rolagem se parece com um cartão de jogo
- o visual visualiza a lógica do RPG como uma experiência tátil, dinâmica e teatral

A intenção é que o jogador sinta que está lidando com uma ficha viva, com peças e resultados que parecem fazer parte de um baralho encantado.

---

## 6. DOODLES E ELEMENTOS DECORATIVOS

Os doodles são fundamentais para dar personalidade ao sistema. Eles aparecem como elementos de fundo e não devem atrapalhar a leitura.

### Paleta de doodles do tema claro
- #ff7b54
- #1ec8a5
- #a855f7
- #ff3b5c
- #1f6feb

### Paleta de doodles do tema escuro
- mantém a mesma lógica, mas com brilho neon e alto contraste
- sem mexer na lógica do tema escuro

Esses elementos aparecem em:
- fundo da ficha
- cantos e bordas
- áreas vazias e margens
- pequenos detalhes em blocos decorativos

A ideia é que o caos visual pareça intencional, não aleatório.

---

## 7. ARQUITETURA DE COMPONENTES

Os arquivos principais do sistema visual são:

- [src/sheets/components/CharacterSheetApp.tsx](../src/sheets/components/CharacterSheetApp.tsx)
- [src/sheets/components/CardGrid.tsx](../src/sheets/components/CardGrid.tsx)
- [src/sheets/components/CharacterRoll.tsx](../src/sheets/components/CharacterRoll.tsx)
- [src/sheets/components/ModalRoll.tsx](../src/sheets/components/ModalRoll.tsx)
- [src/styles/CharacterSheetApp.module.scss](../src/styles/CharacterSheetApp.module.scss)
- [src/styles/CharacterRoll.scss](../src/styles/CharacterRoll.scss)
- [src/styles/variables.scss](../src/styles/variables.scss)

### Hierarquia visual recomendada

1. Contêiner principal da ficha
2. Header com título e toggle de tema
3. Bloco de dados do personagem
4. Grid principal de atributos
5. Defeito e cartas anexadas
6. Área de notas / chat
7. Elementos decorativos em background

---

## 8. THEME TOGGLE E COMPORTAMENTO

O tema é controlado no componente principal com useState e uma função de alternância:

```tsx
const [theme, setTheme] = useState<"light" | "dark">("light");

const toggleTheme = () => {
  setTheme((prev) => (prev === "light" ? "dark" : "light"));
};

return (
  <div className={styles.sheet} data-theme={theme}>
    <div className={styles.headerContainer}>
      <h1>Alice: E.C.O.S</h1>
      <button type="button" className={styles.themeToggle} onClick={toggleTheme}>
        {theme === "light" ? "🌙 Tema Escuro" : "☀️ Tema Claro"}
      </button>
    </div>
  </div>
);
```

### Regras do tema
- o botão fica no lado direito do header
- há apenas um botão de alternância
- o tema acompanha o data-theme do contêiner principal
- o comportamento deve ser reativo e instantâneo

---

## 9. COMPORTAMENTO VISUAL DOS RESULTADOS DE ROLAGEM

O componente de rolagem no chat não é apenas texto. Ele precisa funcionar como um cartão de jogo ampliado.

### Requisitos visuais
- a caixa do resultado deve ter um destaque por atributo
- o naipe do dado ou do atributo deve refletir a cor correta
- o total da rolagem precisa ser destacado em destaque final
- a tag de resultado deve aparecer no final do bloco, após o total
- os detalhes da rolagem ficam escondidos por padrão e abrem ao clicar

### Exemplo de hierarquia
- card principal
- header com naipe e atributo
- dados coloridos por resultado
- total principal
- tag de resultado com fonte maior e destaque final
- bloco de detalhes expansível

---

## 10. CATEGORIAS DE RESULTADO

As categorias visuais da rolagem seguem a lógica do sistema:
- sucesso limpo
- sucesso custoso
- falha
- crítica

A cor do resultado deve obedecer à paleta do sistema, mantendo consistência com o visual da ficha.

---

## 11. CONSIDERAÇÕES DE IMPLEMENTAÇÃO VISUAL

### 11.1 CSS Modules e HTML dinâmico
Como parte da rolagem é gerada como HTML dinâmico em Foundry, o CSS de chat precisa ser construído com atenção. O sistema atual usa global styling em alguns pontos para garantir que o HTML injetado pelo Foundry receba os estilos corretamente.

### 11.2 Usar tokens, não valores soltos
Todos os estilos devem se basear em variáveis compartilhadas em [src/styles/variables.scss](../src/styles/variables.scss), para evitar inconsistência entre:
- ficha
- chat
- modal
- defeito
- grid de cartas

### 11.3 Manter identidade visual consistente
As cores dos atributos, naipes e defeitos devem ser as mesmas em toda a aplicação. Isso reduz ruído visual e reforça a coerência do sistema.

---

## 12. DIREÇÃO VISUAL FINAL

A direção final do sistema é:
- ficha de personagem como mesa de cartas viva
- mistura de papel, fantasia e caos lúdico
- alta legibilidade sem perder personalidade
- uso central de naipes como linguagem visual
- rolagens com destaque e presença de jogo
- tema claro e escuro bem definidos e coerentes
- visual que remete ao universo de Alice sem depender de assets externos pesados

A identidade de ECOs de Alice é preservada por meio de:
- contraste e brilho
- cartas como elemento principal
- paleta vibrante e teatral
- layout de ficha funcional e visualmente marcante

---

## 13. RESUMO FINAL

O sistema visual atual combina:
- estética de carta, pergaminho e caos de Wonderland
- paleta vibrante com tema claro e escuro
- grid de atributos com consistência e leitura forte
- cartas e slots organizados por lógica de jogo
- rolagens visualmente destacadas e com comportamento interativo
- design preparado para expansão sem quebrar a coerência visual

Esse design representa a identidade atual do projeto e deve ser mantido como guia visual principal para todas as novas telas, componentes e refinamentos de UI.
