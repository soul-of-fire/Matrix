import { Comparable } from 'src/app/sort/comparable/comparable';

export class BNode {
  constructor(public key: Comparable,
    public val: any,
    public N: number,
    public left?: BNode,
    public right?: BNode) { }
}