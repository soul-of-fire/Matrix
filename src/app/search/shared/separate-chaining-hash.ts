import { Sequential } from './sequential';
import { Comparable } from 'src/app/sort/comparable/comparable';
import { Queue } from 'src/app/fundamentals/data-structures/queue';
import { Entry } from './entry';

export class SeparateChainingHash<Key, Value> implements Iterable<Entry> {
  private st: Sequential<Key, Value>[];

  constructor(private M: number = 997) {
    this.st = [];
    for (let i = 0; i < this.M; i++) {
      this.st[i] = new Sequential();
    }
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

  public get(key: Comparable): Value {
    return <Value>this.st[this.hash(key)].get(<any>key);
  }

  public put(key: Comparable, val: Value): void {
    this.st[this.hash(key)].put(<any>key, val);
  }

  public contains(key: Comparable): boolean {
    return this.get(key) != null;
  }

  public toArray(): Array<Comparable> {
    const queue = [];
    for (let i = 0; i < this.M; i++) {
      for (let entry of this.st[i]) {
        queue.push(entry);
      }
    }
    return queue;
  }

  [Symbol.iterator]() {
    const array = this.toArray();
    const iterator = {
      next(): IteratorResult<Entry> {
        if (array.length == 0) {
          return {
            done: true,
            value: null
          };
        }
        const node = <any>array.shift();
        return {
          done: false,
          value: new Entry(node.key, node.value)
        };
      }
    };
    return iterator;
  }
}