import { UF } from './union-find';

export class UFQuick extends UF {
  constructor(N: number) {
    super(N);
  }

  public find(p: number): number {
    while (p != this.id[p]) {
      p = this.id[p];
    }
    return p;
  }

  public union(p: number, q: number): void {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot == qRoot) {
      return;
    }
    this.id[pRoot] = qRoot;
    this.n--;
  }
}