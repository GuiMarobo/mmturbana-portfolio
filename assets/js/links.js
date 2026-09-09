/* ==========================================================================
   ██  EDITE APENAS ESTE BLOCO  ██
   --------------------------------------------------------------------------
   Cole a URL de cada entregável entre as aspas. Deixe '' no que ainda não
   tiver — o card aparece como "aguardando link", nunca como link quebrado.

   ANTES DE COLAR, garanta que o link é PÚBLICO:
     · Google Drive → Compartilhar → "Qualquer pessoa com o link" → Leitor
     · YouTube      → Visibilidade "Não listado"
   Depois abra cada um em JANELA ANÔNIMA. Se pedir permissão, o professor
   também vai ver o pedido de permissão — e o enunciado destaca isso.

   Para conferir o que ainda falta, abra o site com ?check=1 no fim da URL.
   ========================================================================== */

const LINKS = {

  /* ---------- 4. DOCUMENTAÇÃO — diagramas UML ---------- */

  // Cobrados explicitamente pelo enunciado
  classes:       '',   // Diagrama de Classes
  casoDeUso:     '',   // Diagrama de Caso de Uso (visão global)

  // Diagramas de sequência (um por caso de uso)
  seqUc1:        '',   // UC1 Gerenciar Clientes
  seqUc2:        '',   // UC2 Gerenciar Usuários
  seqUc3:        '',   // UC3 Gerenciar Negociações
  seqUc4:        '',   // UC4 Gerenciar Orçamento
  seqUc5:        '',   // UC5 Gerenciar Pedido
  seqUc6:        '',   // UC6 Gerenciar Produtos
  seqUc7:        '',   // UC7 Gerenciar Dispositivo Usado
  seqUc8:        '',   // UC8 Visualizar Dashboard

  // Diagramas de estado
  estUc3:        '',   // Estados da Negociação
  estUc5:        '',   // Estados do Pedido
  estUc6:        '',   // Estados do Produto

  // Outros diagramas elaborados
  der:           '',   // Diagrama Entidade-Relacionamento
  implantacao:   '',   // Diagrama de Implantação

  // Documentos de apoio (opcionais — o card some se ficar vazio? não: fica pendente)
  ucspec3:       '',   // Especificação de Caso de Uso — UC3 (RUP)
  ucspec6:       '',   // Especificação de Caso de Uso — UC6 (RUP)

  /* ---------- 5. TELAS E VÍDEO ---------- */

  telaLogin:        '',
  telaDashboard:    '',
  telaClientes:     '',
  telaClienteForm:  '',
  telaImportacao:   '',
  telaQuadro:       '',
  telaConversao:    '',
  telaUsuarios:     '',

  // Se for link do YouTube, o player é embutido automaticamente.
  // Qualquer outra URL (Drive, por exemplo) vira um botão "Assistir".
  video:            '',

  /* ---------- 6. RELATÓRIO DE ESTÁGIO ---------- */

  relatorio:        '',   // PDF do Relatório de Estágio atualizado
}

/* ==========================================================================
   Daqui para baixo não precisa mexer.
   ========================================================================== */

;(function () {
  'use strict'

  function idDoYoutube(url) {
    const m = String(url).match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    )
    return m ? m[1] : null
  }

  function aplicarLinks() {
    const pendentes = []

    document.querySelectorAll('[data-link]').forEach(function (el) {
      const chave = el.getAttribute('data-link')
      const url = (LINKS[chave] || '').trim()
      const estado = el.querySelector('.estado')

      if (!url) {
        pendentes.push({ chave: chave, titulo: (el.querySelector('b') || {}).textContent || chave })
        el.classList.add('pendente')
        el.removeAttribute('href')
        el.removeAttribute('target')
        if (estado) estado.textContent = 'Aguardando link'
        return
      }

      el.classList.remove('pendente')
      el.setAttribute('href', url)
      el.setAttribute('target', '_blank')
      el.setAttribute('rel', 'noopener')
      if (estado) estado.textContent = el.dataset.acao || 'Abrir ↗'
    })

    return pendentes
  }

  function montarVideo() {
    const caixa = document.getElementById('video-caixa')
    if (!caixa) return
    const url = (LINKS.video || '').trim()

    if (!url) {
      caixa.innerHTML =
        '<div class="video-vazio"><b>Vídeo de demonstração</b>' +
        'Até 5 minutos, com as principais funcionalidades do sistema.<br>' +
        'O player aparece aqui assim que o link for preenchido.</div>'
      return
    }

    const id = idDoYoutube(url)
    if (id) {
      const f = document.createElement('iframe')
      f.src = 'https://www.youtube.com/embed/' + id
      f.title = 'Demonstração do MMT Urbana CRM'
      f.allow = 'accelerometer; clipboard-write; encrypted-media; picture-in-picture'
      f.allowFullscreen = true
      caixa.innerHTML = ''
      caixa.appendChild(f)
    } else {
      caixa.innerHTML =
        '<div class="video-vazio"><b>Vídeo de demonstração</b>' +
        '<a class="btn btn-primario" style="margin-top:14px" target="_blank" rel="noopener" href="' +
        url.replace(/"/g, '&quot;') +
        '">Assistir ao vídeo ↗</a></div>'
    }
  }

  function avisoDeChecagem(pendentes) {
    const local = ['localhost', '127.0.0.1', ''].indexOf(location.hostname) !== -1
    const pedido = location.search.indexOf('check=1') !== -1
    if (!pendentes.length || (!local && !pedido)) return

    const barra = document.createElement('div')
    barra.className = 'checagem'
    barra.innerHTML =
      '<div class="container"><details><summary><b>Faltam ' + pendentes.length +
      ' link(s)</b> — preencha em <code>assets/js/links.js</code>. ' +
      'Este aviso só aparece localmente ou com <code>?check=1</code>.</summary><ul>' +
      pendentes.map(function (p) { return '<li>' + p.chave + ' — ' + p.titulo + '</li>' }).join('') +
      '</ul></details></div>'
    document.body.insertBefore(barra, document.body.firstChild)
  }

  document.addEventListener('DOMContentLoaded', function () {
    const pendentes = aplicarLinks()
    montarVideo()
    avisoDeChecagem(pendentes)
    if (pendentes.length) {
      console.warn('[portfólio] ' + pendentes.length + ' link(s) por preencher:',
        pendentes.map(function (p) { return p.chave }))
    }
  })
})()
