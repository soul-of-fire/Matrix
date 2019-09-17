import { Node } from './node';
import { Entry } from './entry';

export class Sequential<Comparable, Value> implements Iterable<Entry> {
  private first: Node;

  public get(key: Comparable): Value {
    for (let x: Node = this.first; x != null; x = x.next) {
      if (key == x.key) {
        return x.val;
      }
    }
    return null;
  }

  public put(key: Comparable, val: Value): void {
    for (let x: Node = this.first; x != null; x = x.next) {
      if (key == x.key) {
        x.val = val;
        return;
      }
    }
    this.first = new Node(key, val, this.first);
  }

  public contains(key: any): boolean {
    return this.get(key) != null;
  }

  public delete(key: Comparable): void {
    this.put(key, null);
  }

  public isEmpty() {
    return this.first == null;
  }

  [Symbol.iterator]() {
    let current = this.first;
    const iterator = {
      next(): IteratorResult<Entry> {
        if(current) {
          const tmp = current;
          current = current.next;
          return {
            done: false,
            value: new Entry(tmp.key, tmp.val)
          };
        } else {
          return {
            done: true,
            value: null
          };
        }
      }
    };
    return iterator;
  }
}
