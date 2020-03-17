export type Card = {
  id: string;
  title: string;
  hostname: string;
  content: string;
};

export class CardDto {
  id: string;
  title: string;
  hostname: string;
  content: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
