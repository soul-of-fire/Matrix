import { Comparable } from '../comparable/comparable';
import { Sort } from './sort';
import { Insertion } from './insertion';

export class Quick3Way {
  public static CUTOFF = 7;

  public static sort(a: Comparable[]): void {
    Quick3Way.quickSort(a, 0, a.length - 1);
  }

  private static quickSort(a: Comparable[], lo: number, hi: number): void {
    if (hi <= lo) {
      return;
    }

    let currLo = lo;
    let i = lo + 1;
    let currHi = hi;
    const v = a[lo];
    while (i <= currHi) {
      if (a[i] < (v)) {
        Sort.exch(a, currLo++, i++);
      } else if (a[i] > (v)) {
        Sort.exch(a, i, currHi--);
      } else {
        i++;
      }
    }
    Quick3Way.quickSort(a, lo, currLo - 1);
    Quick3Way.quickSort(a, currHi + 1, hi);
  }
}