import { Comparable } from 'src/app/sort/comparable/comparable';

export class TNode {
  public static RED: boolean = true;
  public static BLACK: boolean = false;

  constructor(public key: Comparable,
    public val: any,
    public N: number,
    public color: boolean,
    public left?: TNode,
    public right?: TNode) { }
}