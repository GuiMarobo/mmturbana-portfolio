# Portfólio do Projeto de Estágio — MMT Urbana CRM

Site estático da avaliação bimestral (UniFil, 2026). Sem build, sem dependência:
o que está neste repositório é exatamente o que o navegador mostra.

- **Aluno:** Guilherme Marobo F. Martins · matrícula 241072064
- **Orientador:** Marcelo Yukio Yamamoto
- **Entrega:** 14/09/2026
- **Spec do trabalho:** `mmturbana-setup/context/specs/008-portfolio-estagio/`

## Como preencher os links

Todos os entregáveis (diagramas, prints, vídeo e relatório) são **links externos**. Eles
ficam num lugar só:

```
assets/js/links.js   ← edite apenas o bloco LINKS no topo
```

Cole a URL entre as aspas da chave correspondente. Chave vazia vira um card
**"aguardando link"** — visível e não clicável, nunca um link quebrado.

### Antes de colar cada link

| Onde está | O que fazer |
|---|---|
| Google Drive | Compartilhar → **"Qualquer pessoa com o link"** → Leitor |
| YouTube | Visibilidade **"Não listado"** |

Depois **abra cada link em janela anônima**. Se pedir permissão para você, vai pedir para o
professor também — e o enunciado destaca isso em negrito.

## De onde sai cada arquivo

### Diagramas — `mmturbana-setup/docs/diagramas/`

| Chave | Arquivo |
|---|---|
| `seqUc1` | `uc1-gerenciar-clientes.png` |
| `seqUc2` | `uc2-gerenciar-usuarios.png` |
| `seqUc3` | `uc3-gerenciar-negociacoes.png` |
| `seqUc4` | `uc4-gerenciar-orcamento.png` |
| `seqUc5` | `uc5-gerenciar-pedido.png` |
| `seqUc6` | `uc6-gerenciar-produtos.png` |
| `seqUc7` | `uc7-gerenciar-dispositivo-usado.png` |
| `seqUc8` | `uc8-visualizar-dashboard.png` |
| `estUc3` | `uc3-gerenciar-negociacoes.state.png` |
| `estUc5` | `uc5-gerenciar-pedido.state.png` |
| `estUc6` | `uc6-gerenciar-produtos.state.png` |

### Diagramas — `MMT URBANA CRM/Diagramas - Relatório Final/`

| Chave | Arquivo |
|---|---|
| `classes` | `Diagrama de Classe.png` |
| `casoDeUso` | `Diagrama Caso de Uso.png` |
| `implantacao` | `Diagrama de Implementação.png` |

### Diagrama — `MMT URBANA CRM/Diagramas/DER/`

| Chave | Arquivo |
|---|---|
| `der` | `MMTUrbana_DER.png` |

### Documentos — `mmturbana-setup/docs/casos-de-uso/`

| Chave | Arquivo |
|---|---|
| `ucspec3` | `mmturbana_ucspec3.md` (ou o PDF equivalente) |
| `ucspec6` | `mmturbana_ucspec6.md` (ou o PDF equivalente) |

### Prints — a capturar

Sempre com a base de `npx prisma db seed`, **nunca com a base real**: ela tem CPF e
telefone de clientes de verdade, e print com dado pessoal em site público contradiz o
próprio módulo de LGPD do sistema.

| Chave | Tela |
|---|---|
| `telaLogin` | Login |
| `telaDashboard` | Dashboard |
| `telaClientes` | Clientes e Leads |
| `telaClienteForm` | Modal de cadastro de cliente |
| `telaImportacao` | Importação de CSV com o resumo da análise |
| `telaQuadro` | Quadro de negociações |
| `telaConversao` | Conversão de negociação em pedido |
| `telaUsuarios` | Usuários e perfis |

### Vídeo e relatório

| Chave | O que é |
|---|---|
| `video` | Demonstração de até 5 min. Link do YouTube vira player embutido automaticamente |
| `relatorio` | PDF do Relatório de Estágio atualizado |

## Conferir o que falta

```bash
node verificar-links.mjs            # lista as chaves vazias
node verificar-links.mjs --http     # também tenta abrir cada URL preenchida
```

Na própria página, `?check=1` no fim da URL lista as pendências no topo. Sem esse
parâmetro, o aviso não aparece no site publicado.

## Rodar localmente

Basta abrir `index.html` no navegador. Ou, para ficar igual ao servido pelo Pages:

```bash
python3 -m http.server 8000
```

## Publicar

O site já é o repositório. Depois de editar:

```bash
git add -A && git commit -m "conteudo: preenche os links dos entregaveis" && git push
```

O GitHub Pages republica sozinho em 1 a 2 minutos. Configuração:
*Settings → Pages → Source: Deploy from a branch → Branch `main` → pasta `/ (root)`*.

## Estrutura

```
index.html              o site inteiro — as 7 seções do enunciado
assets/css/style.css    tema derivado de apps/app/src/theme/ do CRM
assets/js/links.js      ← o único arquivo a editar
assets/img/favicon.svg
verificar-links.mjs     conferência dos links
.nojekyll               impede o Jekyll do Pages de ignorar pastas
```
