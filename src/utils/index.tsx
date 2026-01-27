import { Message } from '../types';

export const chatHistory: Message[] = [
  {
    id: 1,
    type: 0,
    from: 0,
    text: 'Ej, jesi li stigao pogledati onaj nacrt što sam ti poslao jučer?',
    url: null,
    replyTo: null,
    reactions: { value: 0, count: 1 }, // 👍
  },
  {
    id: 2,
    type: 1,
    from: 1,
    text: null,
    url: 'https://picsum.photos/seed/design1/400/300',
    replyTo: null,
    reactions: { value: 1, count: 3 }, // ❤️
  },
  {
    id: 3,
    type: 0,
    from: 1,
    text: 'Mislim da bismo trebali promijeniti boju headera na ovome.',
    url: null,
    replyTo: null,
    reactions: { value: 0, count: 0 },
  },
  {
    id: 4,
    type: 0,
    from: 0,
    text: 'Slažem se. Evo kako sam ja to zamislio u novoj verziji:',
    url: null,
    replyTo: null,
    reactions: { value: 5, count: 2 }, // 🔥
  },
  {
    id: 5,
    type: 1,
    from: 0,
    text: null,
    url: 'https://picsum.photos/seed/design2/400/300',
    replyTo: null,
    reactions: { value: 0, count: 0 },
  },
  {
    id: 6,
    type: 0,
    from: 0,
    text: 'Samo da ti još javim par detalja prije kave. Razmišljao sam o onom dijelu s bazom podataka i mislim da bi bilo pametnije koristiti Redis za cacheiranje onih najčešćih upita kako bismo smanjili opterećenje. Također, trebao bih ti pokazati nove figma screenove koje sam napravio sinoć jer sam dodao dark mode opciju koja izgleda stvarno moćno. Ponesi laptop ako možeš da odmah prođemo kroz API dokumentaciju jer sam primijetio par endpointa koji bi mogli raditi probleme pri integraciji s frontendom. Vidimo se uskoro!',
    url: null,
    replyTo: null,
    reactions: { value: 3, count: 1 }, // 😮
  },
  {
    id: 7,
    type: 0,
    from: 1,
    text: 'Uff, to zvuči kao dosta posla, ali imaš pravo za Redis. Nosim laptop, vidimo se za pol sata!',
    url: null,
    replyTo: null,
    reactions: { value: 0, count: 1 }, // 👍
  },
  {
    id: 8,
    type: 0,
    from: 1,
    text: 'Možeš li mi samo poslati link na te nove Figma screenove prije nego krenem?',
    url: null,
    replyTo: 6,
    reactions: { value: 0, count: 0 },
  },
  {
    id: 9,
    type: 0,
    from: 0,
    text: 'Naravno, šaljem odmah!',
    url: null,
    replyTo: 8,
    reactions: { value: 0, count: 0 },
  },
  {
    id: 10,
    type: 0,
    from: 0,
    text: 'https://figma.com/file/sample-project-123-darkmode',
    url: null,
    replyTo: null,
    reactions: { value: 5, count: 4 }, // 🔥
  },
  {
    id: 11,
    type: 0,
    from: 1,
    text: 'Ovaj dark mode je brutalan! Jesi li koristio varijable za boje ili si hardkodirao hex kodove?',
    url: null,
    replyTo: 10,
    reactions: { value: 2, count: 1 }, // 😂 (laughter of a tired dev)
  },
  {
    id: 12,
    type: 0,
    from: 0,
    text: 'Sve su varijable, naravno. Nisam lud da mijenjam 50 screenova ručno kad klijent kaže da želi "malo topliju crnu".',
    url: null,
    replyTo: null,
    reactions: { value: 2, count: 12 }, // 😂
  },
  {
    id: 13,
    type: 0,
    from: 1,
    text: 'Pametno. E, jesi vidio onaj novi bug na produkciji? Admin panel se ruši kad netko pokuša uploadati SVG veći od 2MB.',
    url: null,
    replyTo: null,
    reactions: { value: 4, count: 2 }, // 😢
  },
  {
    id: 14,
    type: 1,
    from: 0,
    text: null,
    url: 'https://picsum.photos/seed/error/400/300',
    replyTo: null,
    reactions: { value: 3, count: 1 }, // 😮
  },
  {
    id: 15,
    type: 0,
    from: 0,
    text: 'A joj, to je onaj sanitization library što smo dodali prošli tjedan. Popravit ću to čim se vratim s kave.',
    url: null,
    replyTo: 13,
    reactions: { value: 0, count: 1 }, // 👍
  },
  {
    id: 16,
    type: 0,
    from: 1,
    text: 'Može. I pazi ovo, direktor je pitao možemo li dodati AI chatbot u dashboard do petka...',
    url: null,
    replyTo: null,
    reactions: { value: 3, count: 5 }, // 😮
  },
  {
    id: 17,
    type: 0,
    from: 0,
    text: 'Do petka?! Pa danas je utorak. Što on misli, da se to samo "uključi"?',
    url: null,
    replyTo: 16,
    reactions: { value: 2, count: 8 }, // 😂
  },
  {
    id: 18,
    type: 0,
    from: 1,
    text: 'Upravo to. Rekao sam mu da je izvedivo, ali da će koštati triput više i da nećemo stići napraviti onaj export u PDF.',
    url: null,
    replyTo: null,
    reactions: { value: 5, count: 1 }, // 🔥 (roasting the management)
  },
  {
    id: 19,
    type: 0,
    from: 0,
    text: 'Dobra taktika. Klasični trade-off. Nego, jesi uzeo onaj novi MacBook s M4 čipom?',
    url: null,
    replyTo: null,
    reactions: { value: 1, count: 1 }, // ❤️
  },
  {
    id: 20,
    type: 0,
    from: 1,
    text: 'Jesam, leti! Buildanje projekta traje 10 sekundi umjesto 2 minute. Preporod.',
    url: null,
    replyTo: 19,
    reactions: { value: 5, count: 3 }, // 🔥
  },
  {
    id: 21,
    type: 0,
    from: 0,
    text: 'Zavidim ti. Ja sam još na Intelu, grije mi sobu bolje od radijatora.',
    url: null,
    replyTo: null,
    reactions: { value: 2, count: 4 }, // 😂
  },
  {
    id: 22,
    type: 0,
    from: 1,
    text: 'Stigao sam u kafić, naručio sam ti produženu s hladnim. Požuri!',
    url: null,
    replyTo: null,
    reactions: { value: 1, count: 1 }, // ❤️
  },
  {
    id: 23,
    type: 0,
    from: 0,
    text: 'Evo me za 2 minute, parkiram!',
    url: null,
    replyTo: 22,
    reactions: { value: 0, count: 1 }, // 👍
  },
];

export const REACTION_ICONS: Record<number, string> = {
  0: '👍',
  1: '❤️',
  2: '😂',
  3: '😮',
  4: '😢',
  5: '🔥',
};
