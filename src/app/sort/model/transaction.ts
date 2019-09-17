import { Compare, Comparable } from '../comparable/comparable';
import { Comparator } from '../comparable/comparator';

export class Transaction implements Compare {
  constructor(public amount: number, public name?: string) { }
  
  [Symbol.toPrimitive]() {
    return this.amount;
  }

  public static NAME_ASC: Comparator = {
    compare(a: Transaction, b: Transaction) {
      return a.name < b.name;
    }
  }
}
