/**
 * Verificador de links do portfólio (RN6 da spec 008).
 *
 *   node verificar-links.mjs            confere quais chaves estão vazias
 *   node verificar-links.mjs --http     também faz uma requisição em cada URL
 *
 * Sem dependência: roda com o Node do sistema.
 */

import { readFileSync } from 'node:fs'

const html = readFileSync('index.html', 'utf8')
const js = readFileSync('assets/js/links.js', 'utf8')

// Extrai o objeto LINKS sem executar o resto do arquivo.
const bloco = js.slice(js.indexOf('const LINKS = {'), js.indexOf('\n}', js.indexOf('const LINKS = {')) + 2)
const LINKS = new Function(bloco + '\nreturn LINKS').call(null)

// Todos os pontos de link declarados no HTML.
const usados = [...html.matchAll(/data-link="([^"]+)"/g)].map((m) => m[1])

const semChave = usados.filter((k) => !(k in LINKS))
const naoUsadas = Object.keys(LINKS).filter((k) => k !== 'video' && !usados.includes(k))
const vazias = usados.filter((k) => !String(LINKS[k] || '').trim())
const preenchidas = usados.filter((k) => String(LINKS[k] || '').trim())

console.log(`\n  Pontos de link no HTML: ${usados.length}`)
console.log(`  Preenchidos: ${preenchidas.length}   Vazios: ${vazias.length}\n`)

if (semChave.length) {
  console.log('  ERRO — data-link sem chave correspondente em LINKS:')
  semChave.forEach((k) => console.log(`    · ${k}`))
  console.log()
}

if (naoUsadas.length) {
  console.log('  Aviso — chave em LINKS que nenhum card usa:')
  naoUsadas.forEach((k) => console.log(`    · ${k}`))
  console.log()
}

if (!String(LINKS.video || '').trim()) console.log('  Vazio: video (demonstração)\n')

if (vazias.length) {
  console.log('  Ainda falta preencher:')
  vazias.forEach((k) => console.log(`    · ${k}`))
  console.log()
} else if (!semChave.length) {
  console.log('  Todos os links dos cards estão preenchidos.\n')
}

if (process.argv.includes('--http')) {
  const alvos = [...preenchidas.map((k) => [k, LINKS[k]])]
  if (String(LINKS.video || '').trim()) alvos.push(['video', LINKS.video])

  console.log('  Testando cada URL...\n')
  for (const [chave, url] of alvos) {
    try {
      const r = await fetch(url, { redirect: 'follow' })
      console.log(`    ${r.ok ? 'ok  ' : 'FALHA'} ${r.status}  ${chave}  ${url}`)
    } catch (e) {
      console.log(`    FALHA  ---  ${chave}  ${url}  (${e.message})`)
    }
  }
  console.log(
    '\n  Atenção: status 200 não prova que o link é público. Abra em janela anônima.\n'
  )
}
