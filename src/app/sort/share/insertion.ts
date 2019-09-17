import { Sort } from './sort';
import { Comparable } from '../comparable/comparable';

export class Insertion {
  public static sort(a: Comparable[]): void {
    const N = a.length;
    for (let i = 1; i < N; i++) {
      for (let j = i; j > 0 && Sort.less(a[j], a[j - 1]); j--)
        Sort.exch(a, j, j - 1);
    }
  }

  public static sortRange(a: Comparable[], lo: number, hi: number): void {
    for (let i = lo; i <= hi; i++)
      for (let j = i; j > lo && Sort.less(a[j], a[j - 1]); j--)
        Sort.exch(a, j, j - 1);
  }
}