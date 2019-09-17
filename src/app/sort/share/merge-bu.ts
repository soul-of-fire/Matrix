import { Comparable } from '../comparable/comparable';
import { Merge } from './merge';

export class MergeBU {
  private static aux: Comparable[];
  
  public static sort(a: Comparable[]): void {
    let N = a.length;
    this.aux = [];
    for (let sz = 1; sz < N; sz = sz + sz) {
      for (let lo = 0; lo < N - sz; lo += sz + sz) {
        Merge.merge(a, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, N - 1));
      }
    }
  }
}
