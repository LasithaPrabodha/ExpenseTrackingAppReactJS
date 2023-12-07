import {Recurrence} from '../types/recurrence';
import {Category} from './category';

export class Expense {
  id: string;
  amount: number;
  recurrence: Recurrence;
  date: Date;
  note: string;
  category: Category;

  constructor({ id, amount, recurrence, date, note, category }: {
    id: string;
    amount: number;
    recurrence: Recurrence;
    date: Date;
    note: string;
    category: Category;
  }) {
    this.id = id;
    this.amount = amount;
    this.recurrence = recurrence;
    this.date = date;
    this.note = note;
    this.category = category;
  }

  toFirestoreObject(): Record<string, any> {
    return {
      id: this.id,
      amount: this.amount,
      recurrence: this.recurrence,
      date: this.date.toISOString(),
      note: this.note,
      category: {
        id: this.category.id,
        name: this.category.name,
        color: this.category.color
      },
    };
  }
}
