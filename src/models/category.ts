export class Category {
  id?: string;
  color: string;
  name: string;

  constructor({ id, color, name }: { id?: string; color: string; name: string }) {
    this.id = id;
    this.color = color;
    this.name = name;
  }

  toFirestoreObject(): Record<string, any> {
    return {
      color: this.color,
      name: this.name,
    };
  }
}
