import { Comparable } from 'src/app/sort/comparable/comparable';
import { Entry } from './entry';

export class LinearProbingHash<Key, Value> implements Iterable<Entry> {
  private keys: Comparable[];
  private vals: Value[];

  constructor(private M: number = 16) {
    this.keys = [];
    this.vals = [];
  }

  private hash(key: Comparable): number {
    key = key + '';
    const H = 31;
    var total = 0;
    for (var i = 0; i < key.length; ++i) {
      total += H * total + key.charCodeAt(i);
    }
    total = total % this.M;
    if (total < 0) {
      total += this.M - 1;
    }
    return total;
  }

  public put(key: Comparable, val: Value): void {
    let i;
    for (i = this.hash(key); this.keys[i]; i++) {
      if (this.keys[i] == key) {
        this.vals[i] = val;
        return;
      }
    }
    this.keys[i] = key;
    this.vals[i] = val;
  }

  public get(key: Comparable): Value {
    for (let i = this.hash(key); this.keys[i]; i++)
      if (this.keys[i] == key) {
        return this.vals[i];
      }
    return null;
  }

  public contains(key: Comparable): boolean {
    return this.get(key) != null;
  }

  [Symbol.iterator]() {
    const keys = [...this.keys].filter(k => k);
    const values = [...this.vals].filter(k => k);
    const iterator = {
      next(): IteratorResult<Entry> {
        if (keys.length == 0) {
          return {
            done: true,
            value: null
          };
        }
        return {
          done: false,
          value: new Entry(keys.shift(), values.shift())
        };
      }
    };
    return iterator;
  }
}