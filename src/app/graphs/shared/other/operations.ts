import { Graph } from '../interfaces/graph';

export class Operations {
  public static degree(G: Graph, v: number): number {
    let degree = 0;
    for (let w of G.adj(v)) {
      degree++;
    }
    return degree;
  }

  public static maxDegree(G: Graph): number {
    let max = 0;
    for (let v = 0; v < G.V(); v++) {
      if (Operations.degree(G, v) > max) {
        max = Operations.degree(G, v);
      }
    }
    return max;
  }

  public static avgDegree(G: Graph): number {
    return 2 * G.E() / G.V();
  }

  public static numberOfSelfLoops(G: Graph): number {
    let count = 0;
    for (let v = 0; v < G.V(); v++) {
      for (let w of G.adj(v)) {
        if (v == w) {
          count++;
        }
      }
    }
    return count / 2;
  }

  public static stringToArrayOfArrays(file: string) {
    return file.split('\n').map(x => x.split(' ').map(Number));
  }

  public static stringToArrayOfStringArrays(file: string, sp: string) {
    return file.split('\n').map(x => x.split(sp));
  }
}