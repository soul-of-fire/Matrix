import { Comparable } from 'src/app/sort/comparable/comparable';
import { Entry } from './entry';

export class BinarySearch<Key extends Comparable, Value> implements Iterable<Entry> {
  private keys: Key[];
  private vals: Value[];
  private N: number;

  constructor() {
    this.keys = [];
    this.vals = [];
    this.N = 0;
  }

  public size(): number {
    return this.N;
  }

  public get(key: Key): Value {
    if (this.isEmpty()) {
      return null;
    }
    let i = this.rank(key);
    if (i < this.N && this.keys[i] == key) {
      return this.vals[i];
    } else {
      return null;
    }
  }

  public rank(key: Key): number {
    let lo = 0;
    let hi = this.N - 1;
    while (lo <= hi) {
      const mid = ~~(lo + (hi - lo) / 2);
      if (key < this.keys[mid]) {
        hi = mid - 1;
      } else if (key > this.keys[mid]) {
        lo = mid + 1;
      } else {
        return mid;
      }
    }
    return lo;
  }

  public put(key: Key, val: Value): void {
    let rank = this.rank(key);
    if (rank < this.N && this.keys[rank] == key) { 
      this.vals[rank] = val; 
      return; 
    }
    for (let n = this.N; n > rank; n--) {
      this.keys[n] = this.keys[n - 1];
      this.vals[n] = this.vals[n - 1];
    }
    this.keys[rank] = key;
    this.vals[rank] = val;
    this.N++;
  }

  public contains(key: any): boolean {
    return this.get(key) != null;
  }

  private isEmpty(): boolean {
    return this.keys.length == 0;
  }

  [Symbol.iterator]() {
    let i = 0;
    const keys = this.keys;
    const vals = this.vals;
    const iterator = {
      next(): IteratorResult<Entry> {
        if (!keys[i]) {
          return {
            done: true,
            value: null
          };
        }
        const j = i;
        i++;
        return {
          done: false,
          value: new Entry(keys[j], vals[j])
        };
      }
    };
    return iterator;
  }
}