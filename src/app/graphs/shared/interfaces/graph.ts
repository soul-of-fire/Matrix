export interface Graph {
  V(): number;
  E(): number;
  addEdge(a: number, b: number): void;
  adj(v: number): Iterable<number>;
  toString(): string
}