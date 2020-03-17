export type Tag = {
  id: string;
  name: string;
  related: Array<any>;
};

export class TagDto {
  id: string;
  name: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
