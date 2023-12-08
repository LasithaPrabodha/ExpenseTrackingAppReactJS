type ResultCallback = (result: any) => void;

export default class Observer {
  changes: ResultCallback[];

  constructor() {
    this.changes = [];
  }

  subscribe(callback: (result: any) => {}) {
    return this.changes.push(callback) - 1;
  }

  publish(data = {}) {
    this.changes.forEach((callback) => callback(data));
  }

  unsubscribe(index: number) {
    this.changes.splice(index, 1);
  }

  unsubscribeAll() {
    this.changes = [];
  }
}
