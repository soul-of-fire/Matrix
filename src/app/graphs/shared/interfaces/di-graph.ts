export interface Digraph {
  V(): number;
  E(): number;
  addEdge(v: number, w: number): void;
  adj(v: number): Iterable<number>
  reverse(): Digraph;
  toString(): string;
}