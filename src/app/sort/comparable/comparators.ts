import { Comparator } from './comparator';
import { Comparable } from './comparable';

export class Comparators {
  public static ASC: Comparator = {
    compare(a: Comparable, b: Comparable) {
      return a < b;
    }
  }

  public static DESC: Comparator = {
    compare(a: Comparable, b: Comparable) {
      return a > b;
    }
  }

  public static IGNORE_CASE: Comparator = {
    compare(a: string, b: string) {
      const x = a.toLowerCase();
      const y = b.toLowerCase()
      return x < y;
    }
  }
}