import { Node } from './node';

export class Bag<Item> implements Iterable<Item> {
  private first: Node<Item>;
  private n: number;

  constructor() {
    this.first = null;
    this.n = 0;
  }

  public isEmpty(): boolean {
    return this.first == null;
  }

  public size(): number {
    return this.n;
  }

  public add(item: Item): void {
    let oldfirst = this.first;
    this.first = new Node<Item>(item, oldfirst);
    this.n++;
  }

  [Symbol.iterator](): any {
    let current = this.first;
    const iterator = {
      next(): IteratorResult<Item> {
        if (!current) {
          return { 
            done: true, 
            value: null 
          };
        }
        const tmp = current;
        current = current.next;
        return { 
          done: false, 
          value: tmp.item 
        };
      }
    };
    return iterator;
  }
}
