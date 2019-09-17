import { UF } from './union-find';

export class UFWeighted extends UF {
  sz: Array<number>;

  constructor(N: number) {
    super(N);
    this.sz = [];
    for (let i = 0; i < N; i++) {
      this.sz[i] = 1;
    }
  }

  public find(p: number): number {
    while (p != this.id[p]) {
      p = this.id[p];
    }
    return p;
  }

  public union(p: number, q: number): void {
    const i = this.find(p);
    const j = this.find(q);
    if (i == j) {
      return;
    }
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.id[j] = i;
      this.sz[i] += this.sz[j];
    }
    this.n--;
  }
}