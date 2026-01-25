import { Message } from '../types';

export const chatHistory: Message[] = [
  {
    id: 1,
    type: 0,
    from: 0,
    text: 'Ej, jesi li stigao pogledati onaj nacrt što sam ti poslao jučer?',
    url: null,
    replyTo: null,
    reactions: { value: 0, count: 0 },
  },
  {
    id: 2,
    type: 0,
    from: 1,
    text: 'Jesam! Izgleda super, samo mislim da bismo trebali promijeniti boju headera.',
    url: null,
    replyTo: null,
    reactions: { value: 1, count: 1 },
  },
  {
    id: 3,
    type: 0,
    from: 1,
    text: 'Hoćemo li se naći na kratkoj kavi da to prođemo uživo?',
    url: null,
    replyTo: null,
    reactions: { value: 0, count: 0 },
  },
  {
    id: 4,
    type: 0,
    from: 0,
    text: 'Može, odgovara mi oko 14h u onom kafiću pored ureda.',
    url: null,
    replyTo: null,
    reactions: { value: 0, count: 0 },
  },
  {
    id: 5,
    type: 0,
    from: 1,
    text: 'Dogovoreno. Vidimo se tamo! 🙌',
    url: null,
    replyTo: null,
    reactions: { value: 0, count: 0 },
  },
];
