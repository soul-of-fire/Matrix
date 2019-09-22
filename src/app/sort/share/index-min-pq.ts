import { Comparable } from '../comparable/comparable';

export class IndexMinPQ<Key extends Comparable> implements Iterable<Key> {
  private N: number;
  private pq: Array<number>;
  private qp: Array<number>;
  private keys: Array<Key>;

  constructor(maxN: number) {
    this.N = 0;
    this.keys = [];
    this.pq = [];
    this.qp = [];
    for (let i = 0; i <= maxN; i++) {
      this.qp[i] = -1;
    }
  }

  public isEmpty(): boolean {
    return this.N == 0;
  }

  public contains(k: number): boolean {
    return this.qp[k] != -1;
  }

  public insert(k: number, key: Key): void {
    this.N++;
    this.qp[k] = this.N;
    this.pq[this.N] = k;
    this.keys[k] = key;
    this.swim(this.N);
  }

  public min(): Key {
    return this.keys[this.pq[1]];
  }

  public delMin(): number {
    let min = this.pq[1];
    this.exch(1, this.N--);
    this.sink(1);
    this.qp[min] = -1;
    this.keys[min] = null;
    this.pq[this.N + 1] = -1;
    return min;
  }

  private greater(i: number, j: number): boolean {
    return this.keys[this.pq[i]] > this.keys[this.pq[j]];
  }

  private exch(i: number, j: number): void {
    const swap = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = swap;
    this.qp[this.pq[i]] = i;
    this.qp[this.pq[j]] = j;
  }

  private swim(k: number): void {
    while (k > 1 && this.greater(~~(k / 2), k)) {
      this.exch(k, ~~(k / 2));
      k = ~~(k / 2);
    }
  }

  private sink(k: number): void {
    while (2 * k <= this.N) {
      let j = 2 * k;
      if (j < this.N && this.greater(j, j + 1)) {
        j++;
      }
      if (!this.greater(k, j)) {
        break;
      }
      this.exch(k, j);
      k = j;
    }
  }

  public changeKey(i: number, key: Key): void {
    this.keys[i] = key;
    this.swim(this.qp[i]);
    this.sink(this.qp[i]);
  }

  public change(i: number, key: Key): void {
    this.changeKey(i, key);
  }

  [Symbol.iterator]() {
    const _this = this;
    const iterator = {
      next(): IteratorResult<any> {
        const el = _this.delMin();
        return {
          done: !el || +el == -1,
          value: el
        };
      }
    };
    return iterator;
  }
}