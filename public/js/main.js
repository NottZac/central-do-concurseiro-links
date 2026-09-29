import { AJUSTES, CONCURSOS, NIVEIS, KITS } from "./config.js";

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const porOrdem = (a, b) => (a.ordem ?? 999) - (b.ordem ?? 999);

const linkWhatsapp = (texto) => `https://wa.me/${AJUSTES.whatsapp}?text=${encodeURIComponent(texto)}`;

const setaSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;
const voltarSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>`;
const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>`;

const ILUSTRAS = {
  am: `<svg viewBox="0 0 84 110" class="ilustra-am" preserveAspectRatio="xMidYMid slice"><circle cx="42" cy="38" r="20" fill="#f4e9d3" opacity=".14"/><path d="M10 92c8-14 20-22 32-22s24 8 32 22" stroke="#c8a86a" stroke-width="1.4" fill="none" opacity=".55"/><text x="42" y="46" font-size="22" text-anchor="middle" fill="#f4e9d3">🌳</text><text x="42" y="72" font-size="11" text-anchor="middle" fill="#e9dcc2" font-family="Fraunces, serif" letter-spacing="1">AM</text></svg>`,
  ce: `<svg viewBox="0 0 84 110" class="ilustra-ce" preserveAspectRatio="xMidYMid slice"><circle cx="42" cy="38" r="20" fill="#f4e9d3" opacity=".14"/><path d="M10 92c8-14 20-22 32-22s24 8 32 22" stroke="#c8a86a" stroke-width="1.4" fill="none" opacity=".55"/><text x="42" y="46" font-size="22" text-anchor="middle" fill="#f4e9d3">🌊</text><text x="42" y="72" font-size="11" text-anchor="middle" fill="#e9dcc2" font-family="Fraunces, serif" letter-spacing="1">CE</text></svg>`,
};

const moeda = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const kitsDoConcurso = (concursoId, nivelId) =>
  KITS.filter((k) => k.concurso === concursoId && (!nivelId || k.nivel === nivelId)).sort(porOrdem);

const kit = (id) => KITS.find((k) => k.id === id);

/* ---------- Views ---------- */
const view = (id) => $(`#view-${id}`);
const showView = (id) => {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
  view(id)?.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
};

const migalha = (partes) => {
  const el = $("#migalha");
  if (!partes.length) { el.innerHTML = ""; return; }
  el.innerHTML = partes.map(esc).join(" &nbsp;›&nbsp; ");
};

const botaoVoltar = (label, href) =>
  `<a class="voltar" href="${esc(href)}">${voltarSvg}${esc(label)}</a>`;

/* ---------- Render: Concursos (lista) ---------- */
const renderConcursos = () => {
  const lista = Object.entries(CONCURSOS).map(([id, c]) => ({ id, ...c })).sort(porOrdem);
  view("concursos").innerHTML = `
    ${botaoVoltar("Início", "#/")}
    <h2 class="titulo-secao">Escolha o concurso</h2>
    <p class="subtitulo-secao">Selecione o concurso para ver as matérias e kits disponíveis.</p>
    <div class="lista">
      ${lista.map((c) => `
        <a class="card-concurso" href="#/concurso/${esc(c.id)}">
          <div class="card-concurso__ilustra">${ILUSTRAS[c.ilustra] ?? ""}</div>
          <div class="card-concurso__corpo">
            <div class="card-concurso__texto">
              <strong>${esc(c.nome)}</strong>
              <span>${esc(c.estado)}</span>
            </div>
            ${setaSvg.replace("<svg ", '<svg class="card-concurso__seta" ')}
          </div>
        </a>
      `).join("")}
    </div>
  `;
  migalha(["Concursos"]);
  showView("concursos");
};

/* ---------- Render: Concurso (níveis, ou pula direto pra matérias se só tiver 1) ---------- */
const renderConcurso = (concursoId) => {
  const c = CONCURSOS[concursoId];
  if (!c) return location.assign("#/concursos");
  const niveis = NIVEIS[concursoId] ?? [];
  if (niveis.length <= 1) {
    return renderMaterias(concursoId, niveis[0]?.id);
  }
  view("concurso").innerHTML = `
    ${botaoVoltar("Concursos", "#/concursos")}
    <h2 class="titulo-secao">${esc(c.nome)}</h2>
    <p class="subtitulo-secao">${esc(c.nomeCompleto)} — escolha o nível do cargo.</p>
    <div class="lista">
      ${niveis.sort(porOrdem).map((n) => `
        <a class="item-lista" href="#/concurso/${esc(concursoId)}/nivel/${esc(n.id)}">
          <span class="item-lista__emoji">${esc(n.emoji)}</span>
          <span class="item-lista__texto"><strong>${esc(n.nome)}</strong></span>
          ${setaSvg.replace("<svg ", '<svg class="item-lista__seta" ')}
        </a>
      `).join("")}
      ${c.grupo ? `
        <a class="item-lista" href="${esc(c.grupo)}" target="_blank" rel="noopener">
          <span class="item-lista__emoji">👥</span>
          <span class="item-lista__texto"><strong>Grupo ${esc(c.nome)}</strong><span>Notícias e atualizações no WhatsApp</span></span>
          ${setaSvg.replace("<svg ", '<svg class="item-lista__seta" ')}
        </a>
      ` : ""}
    </div>
  `;
  migalha(["Concursos", c.nome]);
  showView("concurso");
};

/* ---------- Render: Matérias (kits) de um concurso/nível ---------- */
const renderMaterias = (concursoId, nivelId) => {
  const c = CONCURSOS[concursoId];
  if (!c) return location.assign("#/concursos");
  const lista = kitsDoConcurso(concursoId, nivelId);
  const nivel = (NIVEIS[concursoId] ?? []).find((n) => n.id === nivelId);
  const temNiveis = (NIVEIS[concursoId] ?? []).length > 1;
  view("materias").innerHTML = `
    ${botaoVoltar(temNiveis ? esc(c.nome) : "Concursos", temNiveis ? `#/concurso/${esc(concursoId)}` : "#/concursos")}
    <h2 class="titulo-secao">${esc(c.nome)}</h2>
    <p class="subtitulo-secao">${nivel ? esc(nivel.nome) + " — " : ""}escolha sua matéria para ver o kit completo.</p>
    <div class="lista">
      ${lista.map((k) => `
        <a class="item-lista" href="#/kit/${esc(k.id)}">
          <span class="item-lista__emoji">${esc(k.emoji)}</span>
          <span class="item-lista__texto"><strong>${esc(k.titulo)}</strong></span>
          ${setaSvg.replace("<svg ", '<svg class="item-lista__seta" ')}
        </a>
      `).join("")}
    </div>
  `;
  migalha(temNiveis ? ["Concursos", c.nome, nivel?.nome ?? ""] : ["Concursos", c.nome]);
  showView("materias");
};

/* ---------- Render: Kit (detalhe + CTA WhatsApp) ---------- */
const renderKit = (kitId) => {
  const k = kit(kitId);
  if (!k) return location.assign("#/concursos");
  const c = CONCURSOS[k.concurso];
  const mensagem = `Olá! Vim pelo link da Central do Concurseiro e tenho interesse em adquirir o Kit de ${k.titulo} para a ${c.nome}.`;
  const temNiveis = (NIVEIS[k.concurso] ?? []).length > 1;
  const voltarHref = temNiveis ? `#/concurso/${esc(k.concurso)}/nivel/${esc(k.nivel)}` : `#/concurso/${esc(k.concurso)}`;

  view("kit").innerHTML = `
    ${botaoVoltar("Matérias", voltarHref)}
    <div class="kit__topo">
      <div class="kit__capa">${esc(k.emoji)}</div>
      <h2 class="kit__titulo serif">Kit ${esc(k.titulo)}</h2>
      <div class="kit__concurso">${esc(c.nome)}</div>
      <p class="kit__desc">Kit completo em PDF preparado para o concurso da ${esc(c.nome)}, com conteúdo direcionado ao perfil da banca.</p>
    </div>

    <div class="kit__bloco">
      <h3>O kit contém</h3>
      <div class="kit__conteudo">
        ${k.itens.map((item, i) => `<div class="kit__conteudo-item"><b>${i + 1}.</b> ${esc(item)}</div>`).join("")}
      </div>
    </div>

    <div class="kit__bloco">
      <h3>Vantagens</h3>
      <div class="kit__beneficios">
        ${["Material em PDF", "Acesso vitalício", "Teoria direcionada", "Questões comentadas", "Mapas mentais", "Atualização pós-edital"]
          .map((b) => `<div class="kit__beneficio">${checkSvg}${esc(b)}</div>`).join("")}
      </div>
    </div>

    <div class="kit__preco">
      <div class="por serif">${moeda(AJUSTES.precoKit)}</div>
    </div>

    <a class="cta-whatsapp" href="${linkWhatsapp(mensagem)}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      Adquirir pelo WhatsApp
    </a>
  `;
  migalha(temNiveis ? ["Concursos", c.nome, "Professor", k.titulo] : ["Concursos", c.nome, k.titulo]);
  showView("kit");
};

/* ---------- Render: Grupos de WhatsApp ---------- */
const renderGrupos = () => {
  const lista = Object.entries(CONCURSOS).map(([id, c]) => ({ id, ...c })).sort(porOrdem);
  view("grupos").innerHTML = `
    ${botaoVoltar("Início", "#/")}
    <h2 class="titulo-secao">Escolha seu grupo</h2>
    <p class="subtitulo-secao">Notícias, atualizações e informações sobre cada concurso.</p>
    <div class="lista">
      ${lista.map((c) => c.grupo ? `
        <a class="item-lista" href="${esc(c.grupo)}" target="_blank" rel="noopener">
          <span class="item-lista__emoji">👥</span>
          <span class="item-lista__texto"><strong>Grupo ${esc(c.nome)}</strong><span>Notícias e atualizações sobre o concurso</span></span>
          ${setaSvg.replace("<svg ", '<svg class="item-lista__seta" ')}
        </a>
      ` : `
        <div class="item-lista is-disabled">
          <span class="item-lista__emoji">👥</span>
          <span class="item-lista__texto"><strong>Grupo ${esc(c.nome)}</strong><span>Em breve</span></span>
        </div>
      `).join("")}
    </div>
  `;
  migalha(["Grupos de WhatsApp"]);
  showView("grupos");
};

/* ---------- Render: Home ---------- */
const renderHome = () => {
  migalha([]);
  showView("home");
};

/* ---------- Roteador (hash) ---------- */
const rotear = () => {
  const hash = location.hash || "#/";
  let m;
  if ((m = hash.match(/^#\/concurso\/([^/]+)\/nivel\/([^/]+)\/?$/))) return renderMaterias(m[1], m[2]);
  if ((m = hash.match(/^#\/concurso\/([^/]+)\/?$/))) return renderConcurso(m[1]);
  if ((m = hash.match(/^#\/kit\/([^/]+)\/?$/))) return renderKit(m[1]);
  if (hash === "#/concursos" || hash === "#/concursos/") return renderConcursos();
  if (hash === "#/grupos" || hash === "#/grupos/") return renderGrupos();
  return renderHome();
};

window.addEventListener("hashchange", rotear);
document.addEventListener("DOMContentLoaded", () => {
  $("#whatsapp-principal").href = linkWhatsapp("Olá! Vim pelo link da Central do Concurseiro e gostaria de mais informações.");
  $("#insta-link").href = `https://instagram.com/${AJUSTES.instagram}`;
  $("#site-link").href = AJUSTES.site;
  $("#insta-link-rodape").href = `https://instagram.com/${AJUSTES.instagram}`;
  $("#whatsapp-link-rodape").href = linkWhatsapp("Olá! Vim pelo link da Central do Concurseiro e gostaria de mais informações.");
  $("#site-link-rodape").href = AJUSTES.site;
  rotear();
});
