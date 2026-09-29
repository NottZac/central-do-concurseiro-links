/* Dados da página de links. Isso ainda não tem painel administrativo — pra mudar
   preço, adicionar matéria ou trocar link, é só pedir pro Claude editar aqui. */

export const AJUSTES = {
  whatsapp: "5592984745492", // mesmo número já usado no site principal
  instagram: "centraldoconcurseiro._",
  site: "https://central-do-concurso.web.app/",
  precoKit: 29.9,
};

export const CONCURSOS = {
  "seduc-am": {
    nome: "SEDUC-AM",
    nomeCompleto: "Secretaria de Estado de Educação e Desporto do Amazonas",
    estado: "Amazonas",
    ilustra: "am",
    grupo: "https://chat.whatsapp.com/JU0IwI8Yr8YBKqytTyMGR0",
    ordem: 10,
  },
  "seduc-ce": {
    nome: "SEDUC-CE",
    nomeCompleto: "Secretaria da Educação do Estado do Ceará",
    estado: "Ceará",
    ilustra: "ce",
    grupo: "", // ainda não tem grupo cadastrado pra esse concurso
    ordem: 20,
  },
};

/* Só existe um nível por enquanto (Ensino Superior / Professor) — quando você
   cadastrar cargos de nível médio/fundamental de verdade, é só adicionar aqui
   que o seletor de nível aparece sozinho (com 1 nível só, ele nem aparece,
   pula direto pra lista de matérias). */
export const NIVEIS = {
  "seduc-am": [{ id: "superior", nome: "Professor (Ensino Superior)", emoji: "🎓" }],
  "seduc-ce": [{ id: "superior", nome: "Professor (Ensino Superior)", emoji: "🎓" }],
};

const kitAM = (titulo, extras) => ({ concurso: "seduc-am", nivel: "superior", titulo, itens: [titulo, ...extras] });
const PEDAGOGICOS = "Conhecimentos Pedagógicos";
const LEGISLACAO = "Legislação Completa";
const GERAIS_CE = [
  "Educação Brasileira Geral",
  "Administração Pública Geral",
  "Leitura e Interpretação de Dados Geral",
  "Português Geral",
];
const kitCE = (titulo) => ({ concurso: "seduc-ce", nivel: "superior", titulo, itens: [titulo, ...GERAIS_CE] });

export const KITS = [
  // SEDUC-AM — cada kit vem com Conhecimentos Pedagógicos + Legislação Completa
  { id: "am-portugues", emoji: "📖", ...kitAM("Língua Portuguesa", [PEDAGOGICOS, LEGISLACAO]), ordem: 10 },
  { id: "am-matematica", emoji: "➗", ...kitAM("Matemática", [PEDAGOGICOS, LEGISLACAO]), ordem: 20 },
  { id: "am-geografia", emoji: "🌎", ...kitAM("Geografia", [PEDAGOGICOS, LEGISLACAO]), ordem: 30 },
  { id: "am-historia", emoji: "🏛", ...kitAM("História", [PEDAGOGICOS, LEGISLACAO]), ordem: 40 },
  { id: "am-biologia", emoji: "🧬", ...kitAM("Biologia", [PEDAGOGICOS, LEGISLACAO]), ordem: 50 },
  { id: "am-quimica", emoji: "⚗️", ...kitAM("Química", [PEDAGOGICOS, LEGISLACAO]), ordem: 60 },
  { id: "am-fisica", emoji: "⚛️", ...kitAM("Física", [PEDAGOGICOS, LEGISLACAO]), ordem: 70 },
  { id: "am-ingles", emoji: "🇬🇧", ...kitAM("Inglês", [PEDAGOGICOS, LEGISLACAO]), ordem: 80 },
  { id: "am-artes", emoji: "🎨", ...kitAM("Artes", [PEDAGOGICOS, LEGISLACAO]), ordem: 90 },
  { id: "am-educacao-fisica", emoji: "🏃", ...kitAM("Educação Física", [PEDAGOGICOS, LEGISLACAO]), ordem: 100 },
  { id: "am-filosofia", emoji: "💭", ...kitAM("Filosofia", [PEDAGOGICOS, LEGISLACAO]), ordem: 110 },
  { id: "am-sociologia", emoji: "👥", ...kitAM("Sociologia", [PEDAGOGICOS, LEGISLACAO]), ordem: 120 },
  { id: "am-pedagogia", emoji: "🧑‍🏫", ...kitAM("Conhecimentos Pedagógicos", ["Língua Portuguesa", LEGISLACAO]), ordem: 130 },

  // SEDUC-CE — cada kit vem com as 4 matérias gerais
  { id: "ce-portugues", emoji: "📖", ...kitCE("Língua Portuguesa"), ordem: 10 },
  { id: "ce-matematica", emoji: "➗", ...kitCE("Matemática"), ordem: 20 },
  { id: "ce-geografia", emoji: "🌎", ...kitCE("Geografia"), ordem: 30 },
  { id: "ce-historia", emoji: "🏛", ...kitCE("História"), ordem: 40 },
  { id: "ce-biologia", emoji: "🧬", ...kitCE("Biologia"), ordem: 50 },
  { id: "ce-quimica", emoji: "⚗️", ...kitCE("Química"), ordem: 60 },
  { id: "ce-fisica", emoji: "⚛️", ...kitCE("Física"), ordem: 70 },
  { id: "ce-educacao-fisica", emoji: "🏃", ...kitCE("Educação Física"), ordem: 80 },
];
