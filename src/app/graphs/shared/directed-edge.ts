export class DirectedEdge {
  constructor(public from: number, public to: number, public weight: number) {}

  public toString(): string {
    return `${this.from} ${this.to} (${this.weight})`;
  }

  [Symbol.toPrimitive]() {
    return this.weight;
  }
}