import { Graph } from './graph';
import { Comparable } from 'src/app/sort/comparable/comparable';

export interface SymbolGraph {
  contains(key: Comparable): boolean;
  index(key: Comparable): number;
  name(v: number): Comparable;
  G(): Graph;
}