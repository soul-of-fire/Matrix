import { Node } from './node';

export class Queue<Item> implements Iterable<Item> {
  private first: Node<Item>;
  private last: Node<Item>;
  private n: number;

  public Queue() {
    this.first = null;
    this.last = null;
    this.n = 0;
  }

  public isEmpty(): boolean {
    return this.first == null;
  }

  public size(): number {
    return this.n;
  }

  public peek(): Item {
    return this.first.item;
  }

  public enqueue(item: Item): void {
    const oldlast = this.last;
    this.last = new Node<Item>();
    this.last.item = item;
    this.last.next = null;
    if (this.isEmpty()) {
      this.first = this.last;
    } else {
      oldlast.next = this.last;
    }
    this.n++;
  }

  public dequeue(): Item {
    const item = this.first.item;
    this.first = this.first.next;
    this.n--;
    if (this.isEmpty()) {
      this.last = null;
    }
    return item;
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