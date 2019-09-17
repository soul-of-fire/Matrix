import { Node } from './node';

export class Stack<Item> implements Iterable<Item> {
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

  public push(item: Item): void {
    const oldfirst = this.first;
    this.first = new Node<Item>();
    this.first.item = item;
    this.first.next = oldfirst;
    this.n++;
  }

  public pop(): Item {
    const item = this.first.item;
    this.first = this.first.next;
    this.n--;
    return item;
  }

  public peek(): Item {
    return this.first.item;
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