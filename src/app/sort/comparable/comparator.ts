import { Comparable } from './comparable';

export interface Comparator  {
  compare(a: Comparable, b: Comparable): boolean;
}
