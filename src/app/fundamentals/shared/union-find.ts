export class UF {
  protected id: Array<number>;
  protected n: number;

  constructor(N: number) {
    this.n = N;
    this.id = [];
    for (let i = 0; i < N; i++) {
      this.id[i] = i;
    }
  }

  public count(): number {
    return this.n;
  }

  public connected(p: number, q: number): boolean {
    return this.find(p) == this.find(q);
  }

  public find(p: number): number {
    return this.id[p];
  }

  public union(p: number, q: number): void {
    const pID = this.find(p);
    const qID = this.find(q);
    if (pID == qID) {
      return;
    }
    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] == pID) {
        this.id[i] = qID;
      }
    }
    this.n--;
  }
}