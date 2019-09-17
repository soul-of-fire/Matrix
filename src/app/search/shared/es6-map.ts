import { Comparable } from 'src/app/sort/comparable/comparable';
import { Entry } from './entry';

export class Es6Map implements Iterable<Entry> {
  private m: Map<Comparable, any>;

  constructor() {
    this.m = new Map;
  }

  public get(key: Comparable) {
    return this.m.get(key);
  }

  public put(key: Comparable, val: any): void {
    this.m.set(key, val);
  }

  public contains(key: Comparable): boolean {
    return this.m.has(key);
  }

  [Symbol.iterator]() {
    const e = this.m.entries();
    const iterator = {
      next(): IteratorResult<Entry> {
        const entry = e.next()
        return {
          done: !(entry && entry.value),
          value: entry && entry.value && new Entry(entry.value[0], entry.value[1] || null)
        };
      }
    };
    return iterator;
  }
}