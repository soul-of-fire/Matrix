import { EdgeWeightedGraph } from 'src/app/graphs/shared/edge-weighted-graph';

export class MinPQ<Key> implements Iterable<Key> {
  private pq: Key[];
  private n: number;

  constructor(G?: EdgeWeightedGraph) {
    this.pq = [];
    this.n = 0;
    if (G) {
      for (let e of G.edges()) {
        this.insert(e);
      }
    }
  }

  public isEmpty(): boolean {
    return this.n == 0;
  }

  public size(): number {
    return this.n;
  }

  public min(): Key {
    return this.pq[1];
  }

  public insert(x: any): void {
    this.pq[++this.n] = x;
    this.swim(this.n);
  }

  public delMin(): Key {
    const min = this.pq[1];
    this.exch(1, this.n--);
    this.sink(1);
    this.pq[this.n + 1] = null;
    return min;
  }

  private swim(k: number): void {
    while (k > 1 && this.greater(~~(k / 2), k)) {
      this.exch(k, ~~(k / 2));
      k = ~~(k / 2);
    }
  }

  private sink(k: number): void {
    while (2 * k <= this.n) {
      let j = 2 * k;
      if (j < this.n && this.greater(j, j + 1)) {
        j++;
      }
      if (!this.greater(k, j)) {
        break;
      }
      this.exch(k, j);
      k = j;
    }
  }

  private greater(i: number, j: number): boolean {
    return this.pq[i] > this.pq[j];
  }

  private exch(i: number, j: number): void {
    const swap = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = swap;
  }

  [Symbol.iterator]() {
    const _this = this;
    const iterator = {
      next(): IteratorResult<Key> {
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