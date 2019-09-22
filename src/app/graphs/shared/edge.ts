import { Compare } from 'src/app/sort/comparable/comparable';

export class Edge implements Compare {

  constructor(public v: number, public w: number, public weight: number) { }

  public either(): number {
    return this.v;
  }

  public other(vertex: number): number {
    if (vertex == this.v) {
      return this.w;
    } else if (vertex == this.w) {
      return this.v;
    }
  }

  public toString(): string {
    return `${this.v} ${this.w} ${this.weight}`;
  }

  [Symbol.toPrimitive]() {
    return this.weight;
  }
}