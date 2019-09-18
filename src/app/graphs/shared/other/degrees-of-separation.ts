import { SymbolEs6 } from '../symbol-es6';
import { BreadthFirstPath } from '../breadth-first-path';

export class DegreesOfSeparation {
  public static degrees(file: string, sp: string, source: string, search: string) {
    const sg = new SymbolEs6(file, sp);
    const G = sg.G();
    if (!sg.contains(source)) {
      console.log(source + " not in database.");
      return null;
    }
    let s = sg.index(source);
    const bfs = new BreadthFirstPath(G, s);
    if (sg.contains(search)) {
      let t = sg.index(search);
      if (bfs.hasPathTo(t)) {
        return Array.from(bfs.pathTo(t)).map(x => sg.name(x));
      } else {
        console.log("Not connected");
        return null;
      }
    } else {
      console.log("Not in database.");
      return null;
    }
  }
}