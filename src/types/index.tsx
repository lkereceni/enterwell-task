export type Message = {
  id: number;
  type: number;
  from: number;
  text: string | null;
  url: string | null;
  replyTo: number | null;
  reactions: { value: number; count: number };
};
