# Central do Concurseiro — Links

Página estilo Linktree premium: começa só com os botões principais (Concursos e
Apostilas, WhatsApp, site, grupos, Instagram) e, ao clicar em "Concursos e
Apostilas", abre a navegação completa — concurso → matéria → kit — sem
recarregar a página (tudo em `public/index.html` + `public/js/` +
`public/css/`).

Projeto Firebase: `linkthree-cdc`.
Endereço final: `https://central-do-concurseiro-links.web.app/`
(o projeto se chama `linkthree-cdc`, mas o site de Hosting dentro dele tem
esse nome próprio).

## Publicar

É só rodar o `publicar.bat`. Ele sobe pro GitHub e publica no Firebase Hosting
automaticamente. Nas próximas vezes é só rodar de novo depois de qualquer
mudança.

## Como editar o conteúdo

Todo o conteúdo (concursos, matérias/kits, preço, WhatsApp, Instagram, link do
site, grupos) fica em **`public/js/config.js`** — é só pedir pro Claude editar
esse arquivo que atualiza tudo (cards, listas, mensagem do WhatsApp de cada
kit, etc.), sem precisar mexer no HTML.

- `AJUSTES`: número de WhatsApp, Instagram, link do site e preço padrão do kit.
- `CONCURSOS`: nome, estado e link do grupo de WhatsApp de cada concurso
  (SEDUC-AM já tem grupo; SEDUC-CE ainda não — por isso aparece "Em breve").
- `NIVEIS`: níveis de cargo por concurso. Hoje só existe "Professor (Ensino
  Superior)" nos dois — quando cadastrar cargos de nível médio/fundamental de
  verdade (não fictícios), é só adicionar aqui que o seletor de nível aparece
  sozinho na tela.
- `KITS`: cada matéria vendida, com a lista de apostilas que vêm juntas no
  kit (emoji, título, itens do kit).

Painel administrativo visual (pra editar isso sem pedir pro Claude) ainda não
foi construído — fica como próximo passo, reaproveitando o mesmo sistema de
senha por clique na logo que os outros dois sites já usam.

## Antes de considerar pronto pra divulgar

- **Número de WhatsApp**: está usando o mesmo número já cadastrado no site
  principal (5592984745492 / (92) 98474-5492). Confirma se é esse mesmo.
- **Capas dos kits**: por enquanto cada kit mostra um emoji num fundo navy no
  lugar de foto (igual às "capas provisórias" do site principal) — é só pedir
  pra trocar por uma foto real quando tiver.
- **Cargos de nível médio/fundamental**: não foram cadastrados ainda porque
  não existem produtos reais pra eles hoje — só quando você tiver isso de
  verdade.
