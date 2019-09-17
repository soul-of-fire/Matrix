export interface Compare {
  [Symbol.toPrimitive]: () => number | string;
} 

export type Comparable = number | string | Compare;