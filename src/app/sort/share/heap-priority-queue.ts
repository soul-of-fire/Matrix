import { Comparable } from '../comparable/comparable';

export class HeapPriorityQueue implements Iterable<Comparable> {
  private pq: Comparable[];
  private N = 0;

  constructor() {
    this.pq = [];
  }

  public insert(v: Comparable): void {
    this.pq[++this.N] = v;
    this.swim(this.N);
  }

  public delMax(): Comparable {
    const max = this.pq[1];
    this.exch(1, this.N--);
    this.pq[this.N + 1] = null;
    this.sink(1);
    return max;
  }

  private less(i: number, j: number): boolean {
    return this.pq[i] < this.pq[j];
  }

  private exch(i: number, j: number): void {
    const t = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = t;
  }

  private swim(k: number): void {
    while (k > 1 && this.less(~~(k / 2), k)) {
      this.exch(~~(k / 2), k);
      k = k / 2;
    }
  }

  private sink(k: number): void {
    while (2 * k <= this.N) {
      let j = 2 * k;
      if (j < this.N && this.less(j, j + 1)) {
        j++;
      }
      if (!this.less(k, j)) {
        break;
      }
      this.exch(k, j);
      k = j;
    }
  }

  public isEmpty(): boolean {
    return this.N == 0;
  }

  public size(): number {
    return this.N;
  }

  [Symbol.iterator]() {
    const _this = this;
    const iterator = {
      next(): IteratorResult<Comparable> {
        const el = _this.delMax();
        if (!el) {
          return { 
            done: true, 
            value: null 
          };
        }
        return { 
          done: false, 
          value: el 
        };
      }
    };
    return iterator;
  }
}