export class Category {
  id: string;
  color: string;
  name: string;

  constructor({id, color, name}: Category) {
    this.id = id;
    this.color = color;
    this.name = name;
  }
}
