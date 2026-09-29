# Central do Concurseiro — Links

Página única (estilo linktree) com o logo, o link do site, o WhatsApp, o Instagram
e uma prévia das matérias do SEDUC-AM e do SEDUC-CE, cada uma apontando para o
catálogo completo no site principal.

Projeto Firebase: `linkthree-cdc` (separado do `central-do-concurso`).
Endereço final: `https://central-do-concurseiro-links.web.app/`
(o projeto se chama `linkthree-cdc`, mas o site de Hosting dentro dele tem
esse nome próprio — dá pra ter um nome de projeto e um nome de link diferentes).

## Publicar

É só rodar o `publicar.bat`. Ele tenta fazer tudo sozinho:

1. **GitHub**: se você tiver o GitHub CLI (`gh`) instalado, o script cria o
   repositório `central-do-concurseiro-links` na sua conta automaticamente (só
   pede login se ainda não tiver feito) e já sobe o código. Se não tiver o
   `gh` instalado, ele avisa e você cria manualmente em
   `https://github.com/new` (nome `central-do-concurseiro-links`, conta
   NottZac, vazio, sem README) — depois só rodar o `publicar.bat` de novo.
   Pra instalar o `gh`: `winget install --id GitHub.cli`.
2. **Firebase**: pede login (mesma conta de sempre), cria o site de Hosting
   `central-do-concurseiro-links` dentro do projeto `linkthree-cdc` (só na
   primeira vez) e publica.

Nas próximas vezes é só rodar `publicar.bat` de novo.

## Fotos das matérias

Os cards de "Língua Portuguesa", "Matemática" etc. mostram uma prévia com emoji
até você subir a foto de verdade. Para trocar, salve a imagem dentro de
`public/assets/fotos/` com o nome exato (retrato, tipo 4:5, .jpg):

- `seduc-am-1.jpg`, `seduc-am-2.jpg`, `seduc-am-3.jpg`, `seduc-am-4.jpg`
- `seduc-ce-1.jpg`, `seduc-ce-2.jpg`, `seduc-ce-3.jpg`, `seduc-ce-4.jpg`

Assim que o arquivo existir com esse nome, o card troca sozinho — não precisa
mexer no HTML. Depois é só rodar `publicar.bat` de novo pra subir as fotos.

## Trocar quais matérias aparecem

Cada card em `public/index.html` tem `data-foto="seduc-am-1"` etc. Se quiser
mostrar outra matéria no lugar, troca o emoji, o texto e o número do arquivo de
foto correspondente — são só 8 blocos `<a class="card" ...>`, fácil de achar.
