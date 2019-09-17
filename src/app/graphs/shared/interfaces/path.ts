export interface Path {
  hasPathTo(v: number): boolean
  pathTo(v: number): Iterable<number>
}