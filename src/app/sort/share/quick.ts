import { Comparable } from '../comparable/comparable';
import { Sort } from './sort';
import { Insertion } from './insertion';

export class Quick {
  public static CUTOFF = 7;

  public static sort(a: Comparable[]): void {
    Quick.quickSort(a, 0, a.length - 1);
  }
  
  private static quickSort(a: Comparable[], lo: number, hi: number): void {
    if (hi <= lo + Quick.CUTOFF) { 
      Insertion.sortRange(a, lo, hi); 
      return; 
    }

    const j = Quick.partition(a, lo, hi);
    Quick.quickSort(a, lo, j - 1);
    Quick.quickSort(a, j + 1, hi);
  }
  
  private static partition(a: Comparable[], lo: number, hi: number): number {
    let currLo = lo;
    let currHi = hi + 1;
    const v = a[lo];
    while (true) {
      while (Sort.less(a[++currLo], v)) {
        if (currLo == hi) {
          break;
        }
      }
      while (Sort.less(v, a[--currHi])) {
        if (currHi == lo) {
          break;
        }
      }
      if (currLo >= currHi) {
        break;
      }
      Sort.exch(a, currLo, currHi);
    }
    Sort.exch(a, lo, currHi);
    return currHi;
  }
}