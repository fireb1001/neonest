export type Note = {
  id: string;
  title: string;
  related: Array<any>;
};

export class NoteDto {
  id: string;
  title: string;
  related: Array<any>;

  constructor(data) {
    Object.assign(this, data);
  }
}
