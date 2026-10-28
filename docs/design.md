# 🏰 DESIGN SPECIFICATION: FICHA DE PERSONAGEM (FOUNDRY VTT)
## **Ecos de Alice — Sistema de RPG**

---

## 📑 1. VISÃO GERAL DE DESIGN & DIRETRICEM VISUAL

A ficha foi desenvolvida sob a estética **Vitoriana Dark Chaos**. O design contrapõe o rigor enlatado e elegante do século XIX vitoriano com a distorção vibrante e perigosa do País das Maravilhas (*Wonderland*).

### 🎨 Paleta de Cores (Theme Tokens)

| Elemento | Cor Hex / CSS | Conceito Visual |
| :--- | :--- | :--- |
| **Fundo Principal** | `#121114` (Obsidiana Profunda) | Textura de couro escuro envernizado. |
| **Painéis Internos** | `#1a181e` (Carvão Vitoriano) | Superfície de madeira/papel escuro. |
| **Bordas & Molduras**| `#c5a059` (Ouro Envelhecido) | Filigrana vitoriana elegante. |
| **Texto Primário** | `#e6e1d6` (Pergaminho Claro) | Leitura limpa e alto contraste. |
| **Texto Secundário**| `#a39b8b` (Cinza Névoa) | Descrições e rótulos auxiliares. |
| **Naipe: Copas (♥)** | `#ff2a55` (Crimson Pulsante) | Sangue, emoção e fluxo. |
| **Naipe: Ouros (♦)** | `#ffb700` (Âmbar Reluzente) | Peso, ouro, integridade física. |
| **Naipe: Paus (♣)**  | `#00e676` (Verde Esmeralda Caótico) | Instinto, mato e mutação. |
| **Naipe: Espadas (♠)**| `#00b0ff` (Azul Lâmina Elétrico) | Verdade afiada, corte e ceticismo. |
| **Dano/Integridade** | `#d50000` / `#2a080c` | Caixas marcadas / Caixas ativas. |

---

## 📐 2. ARQUITETURA DE LAYOUT (FOUNDRY VTT)

```
+-----------------------------------------------------------------------+
| 👑 CABEÇALHO IMUTÁVEL (Sempre Visível)                                |
| [ Retrato ]  NOME DO PERSONAGEM (Input Titulado)                      |
|              VIVÊNCIA: [ Ex: Governanta Vitoriana (+2 em Etiqueta) ]   |
|              DEFEITO GERAL: [ Ex: Fragilidade do Ego ]                |
+-----------------------------------------------------------------------+
| [ Aba 1: Diário de Campo (Atributos) ] | [ Aba 2: Inventário & Notas ]|
+-----------------------------------------------------------------------+
|                                                                       |
|  (CONTEÚDO DA ABA ATIVA EXIBIDO ABAIXO)                               |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

## 📜 3. ESTRUTURA E CÓDIGO TEMPLATE (HTML / CSS EMBUTIDO)

Abaixo está o código de interface responsivo, pronto para uso em **Actor Sheets** do Foundry VTT utilizando Handlebars ou HTML puro estilizado com CSS Grid e Flexbox.

```html:Ecos de Alice - Layout da Ficha:ecos_alice_sheet.html
<style>
  /* --- PALETA E VARIÁVEIS CSS --- */
  :root {
    --bg-dark: #121114;
    --bg-panel: #1a181e;
    --bg-card: #232029;
    --border-gold: #c5a059;
    --border-subtle: #342f3d;
    --text-main: #e6e1d6;
    --text-muted: #a39b8b;
    
    /* Naipes Chamativos */
    --copas-color: #ff2a55;
    --ouros-color: #ffb700;
    --paus-color: #00e676;
    --espadas-color: #00b0ff;
    --damage-red: #d50000;
  }

  .alice-sheet {
    background-color: var(--bg-dark);
    color: var(--text-main);
    font-family: 'Georgia', 'Times New Roman', serif;
    padding: 16px;
    border: 2px solid var(--border-gold);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    max-width: 900px;
    margin: 0 auto;
  }

  /* --- CABEÇALHO IMUTÁVEL --- */
  .alice-header {
    display: flex;
    gap: 16px;
    background: var(--bg-panel);
    border: 1px solid var(--border-gold);
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 16px;
    align-items: center;
  }

  .header-portrait {
    width: 80px;
    height: 80px;
    border: 2px solid var(--border-gold);
    border-radius: 4px;
    object-fit: cover;
    background: #000;
  }

  .header-fields {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .header-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-row label {
    font-weight: bold;
    color: var(--border-gold);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    min-width: 100px;
  }

  .header-row input {
    flex-grow: 1;
    background: var(--bg-dark);
    border: 1px solid var(--border-subtle);
    color: var(--text-main);
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  .header-row input.char-name {
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--border-gold);
    border-color: var(--border-gold);
  }

  /* --- NAVEGAÇÃO POR ABAS --- */
  .alice-tabs {
    display: flex;
    gap: 4px;
    border-bottom: 2px solid var(--border-gold);
    margin-bottom: 16px;
  }

  .tab-btn {
    background: var(--bg-panel);
    border: 1px solid var(--border-subtle);
    border-bottom: none;
    color: var(--text-muted);
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
    border-radius: 6px 6px 0 0;
    transition: all 0.2s ease;
  }

  .tab-btn:hover, .tab-btn.active {
    background: var(--border-gold);
    color: var(--bg-dark);
  }

  /* --- ABA 1: DIÁRIO DE CAMPO (3 COLUNAS) --- */
  .grid-3col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .attribute-column {
    background: var(--bg-panel);
    border: 1px solid var(--border-subtle);
    border-radius: 6px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    overflow: hidden;
  }

  /* Cores Temáticas das Colunas por Naipe */
  .attribute-column.copas { border-top: 4px solid var(--copas-color); }
  .attribute-column.ouros { border-top: 4px solid var(--ouros-color); }
  .attribute-column.paus   { border-top: 4px solid var(--paus-color); }
  .attribute-column.espadas{ border-top: 4px solid var(--espadas-color); }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-subtle);
    padding-bottom: 8px;
  }

  .suit-icon {
    font-size: 2rem;
    line-height: 1;
    filter: drop-shadow(0 0 6px currentColor);
  }
  .copas .suit-icon { color: var(--copas-color); }
  .ouros .suit-icon { color: var(--ouros-color); }
  .paus .suit-icon   { color: var(--paus-color); }
  .espadas .suit-icon{ color: var(--espadas-color); }

  .attr-title {
    font-size: 1.1rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .attr-value {
    font-size: 1.5rem;
    font-weight: bold;
    width: 40px;
    height: 40px;
    background: var(--bg-dark);
    border: 1px solid var(--border-gold);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Assinaturas & Passivas */
  .signature-box {
    background: var(--bg-dark);
    padding: 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    color: var(--text-muted);
    border-left: 3px solid var(--border-gold);
  }
  .signature-box strong {
    color: var(--text-main);
    display: block;
    margin-bottom: 2px;
  }

  /* Trilha de Integridade (Caixas de Dano) */
  .integrity-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .integrity-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  .integrity-boxes {
    display: flex;
    gap: 8px;
    justify-content: space-between;
  }

  .checkbox-custom {
    flex: 1;
    height: 28px;
    background: var(--bg-dark);
    border: 1px solid var(--border-subtle);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: transparent;
    transition: all 0.2s;
  }

  .checkbox-custom.checked {
    background: var(--damage-red);
    border-color: #ff5252;
    color: #fff;
    box-shadow: 0 0 8px rgba(213, 0, 0, 0.6);
  }

  /* Dropzone de Conceitos (Poderes/Cartas Arrastáveis) */
  .concepts-dropzone {
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.2);
    border: 1px dashed var(--border-subtle);
    border-radius: 4px;
    padding: 8px;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .concept-item {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 0.85rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: grab;
  }

  .concept-item:hover {
    border-color: var(--border-gold);
  }

  /* --- ABA 2: INVENTÁRIO & NOTAS --- */
  .grid-2row {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .section-panel {
    background: var(--bg-panel);
    border: 1px solid var(--border-subtle);
    border-radius: 6px;
    padding: 12px;
  }

  .section-title {
    font-size: 1rem;
    color: var(--border-gold);
    border-bottom: 1px solid var(--border-subtle);
    padding-bottom: 6px;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .inventory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 8px;
  }

  .inventory-item {
    background: var(--bg-dark);
    border: 1px solid var(--border-subtle);
    padding: 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
  }

  .notes-editor {
    width: 100%;
    min-height: 180px;
    background: var(--bg-dark);
    border: 1px solid var(--border-subtle);
    color: var(--text-main);
    padding: 10px;
    border-radius: 4px;
    font-family: inherit;
    resize: vertical;
  }
</style>

<div class="alice-sheet">
  
  <!-- 👑 CABEÇALHO IMUTÁVEL -->
  <header class="alice-header">
    <img class="header-portrait" src="icons/svg/mystery-man.svg" alt="Retrato do Personagem" />
    <div class="header-fields">
      <div class="header-row">
        <label>Nome</label>
        <input type="text" class="char-name" value="Srtª. Agatha Primrose" placeholder="Nome da Alice..." />
      </div>
      <div class="header-row">
        <label>Vivência</label>
        <input type="text" value="Governanta Vitoriana (+2 em Etiqueta/Educação)" placeholder="Profissão ou passado no Mundo Real..." />
      </div>
      <div class="header-row">
        <label>Defeito Geral</label>
        <input type="text" value="Fragilidade do Ego (Falha Crítica causa dano duplo)" placeholder="Compulsão ou fraqueza ativa..." />
      </div>
    </div>
  </header>

  <!-- 📑 SISTEMA DE ABAS -->
  <nav class="alice-tabs">
    <button class="tab-btn active" onclick="switchTab('tab-atributos')">DIÁRIO DE CAMPO (ATRIBUTOS)</button>
    <button class="tab-btn" onclick="switchTab('tab-inventario')">INVENTÁRIO & NOTAS</button>
  </nav>

  <!-- 🎴 ABA 1: DIÁRIO DE CAMPO (3 COLUNAS DE ATRIBUTOS) -->
  <main id="tab-atributos" class="tab-content">
    <div class="grid-3col">
      
      <!-- COLUNA 1: FORMA -->
      <div class="attribute-column paus">
        <div class="column-header">
          <div>
            <span class="attr-title">FORMA</span>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Eu Físico</div>
          </div>
          <span class="suit-icon">♣</span>
          <div class="attr-value">3</div>
        </div>

        <div class="signature-box">
          <strong>Adaptação Selvagem</strong>
          +1 dado extra para se mover em terrenos ruins (lama, escuro, espinhos).
        </div>

        <div class="integrity-section">
          <span class="integrity-title">Integridade (Dano: -1d cada)</span>
          <div class="integrity-boxes">
            <div class="checkbox-custom">[ ]</div>
            <div class="checkbox-custom">[ ]</div>
            <div class="checkbox-custom">[ ]</div>
          </div>
        </div>

        <div class="concepts-dropzone">
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">CONCEITOS (ARRASTE AQUI):</div>
          <div class="concept-item">
            <span>🎴 2 de Paus: Agilidade</span>
            <strong>+1</strong>
          </div>
          <div class="concept-item">
            <span>🎴 Valete de Paus: Flexibilidade</span>
            <strong>+1</strong>
          </div>
        </div>
      </div>

      <!-- COLUNA 2: LÓGICA -->
      <div class="attribute-column ouros">
        <div class="column-header">
          <div>
            <span class="attr-title">LÓGICA</span>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Eu Racional</div>
          </div>
          <span class="suit-icon">♦</span>
          <div class="attr-value">2</div>
        </div>

        <div class="signature-box">
          <strong>Lei da Posse</strong>
          1x por sessão, pode declarar que tem um item pequeno no bolso.
        </div>

        <div class="integrity-section">
          <span class="integrity-title">Integridade (Dano: -1d cada)</span>
          <div class="integrity-boxes">
            <div class="checkbox-custom checked">X</div>
            <div class="checkbox-custom">[ ]</div>
            <div class="checkbox-custom">[ ]</div>
          </div>
        </div>

        <div class="concepts-dropzone">
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">CONCEITOS (ARRASTE AQUI):</div>
          <div class="concept-item">
            <span>🎴 10 de Ouros: Hierarquia</span>
            <strong>+1</strong>
          </div>
          <div class="concept-item">
            <span>🎴 4 de Ouros: Regulamento</span>
            <strong>+1</strong>
          </div>
        </div>
      </div>

      <!-- COLUNA 3: DEVANEIO -->
      <div class="attribute-column espadas">
        <div class="column-header">
          <div>
            <span class="attr-title">DEVANEIO</span>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Eu Mágico</div>
          </div>
          <span class="suit-icon">♠</span>
          <div class="attr-value">1</div>
        </div>

        <div class="signature-box">
          <strong>Fragilidade do Ego (Defeito)</strong>
          Falha Crítica (Olhos de Cheshire) causa o Dobro de Dano.
        </div>

        <div class="integrity-section">
          <span class="integrity-title">Integridade (Dano: -1d cada)</span>
          <div class="integrity-boxes">
            <div class="checkbox-custom">[ ]</div>
            <div class="checkbox-custom">[ ]</div>
            <div class="checkbox-custom">[ ]</div>
          </div>
        </div>

        <div class="concepts-dropzone">
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">CONCEITOS (ARRASTE AQUI):</div>
          <div class="concept-item">
            <span>🎴 7 de Espadas: Língua Afiada</span>
            <strong>+1</strong>
          </div>
        </div>
      </div>

    </div>
  </main>

  <!-- 🎒 ABA 2: INVENTÁRIO & NOTAS -->
  <main id="tab-inventario" class="tab-content" style="display: none;">
    <div class="grid-2row">
      
      <!-- POSSES E ITENS -->
      <div class="section-panel">
        <div class="section-title">📦 Posses & Itens de Wonderland</div>
        <div class="inventory-grid">
          <div class="inventory-item">
            <span>🍾</span>
            <div>
              <strong>Garrafa "Beba-me"</strong>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Encolhe o usuário.</div>
            </div>
          </div>
          <div class="inventory-item">
            <span>🔑</span>
            <div>
              <strong>Chave Dourada Minúscula</strong>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Abre a porta do Jardim.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- NOTAS DO DIÁRIO -->
      <div class="section-panel">
        <div class="section-title">✍️ Diário de Bordo & Registros do Coelho</div>
        <textarea class="notes-editor" placeholder="Escreva aqui suas pistas, anotações de sessão, estado do Relógio do Espelho ou contadores de Tensão..."></textarea>
      </div>

    </div>
  </main>

</div>

<script>
  function switchTab(tabId) {
    document.getElementById('tab-atributos').style.display = 'none';
    document.getElementById('tab-inventario').style.display = 'none';
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).style.display = 'block';
    event.currentTarget.classList.add('active');
  }
</script>