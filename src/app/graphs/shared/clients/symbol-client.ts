import { SymbolEs6 } from '../symbol-es6';

export class SymbolClient {
  public static client(file: string, sp: string, find: string): Array<any> {
    const sg = new SymbolEs6(file, sp);
    const G = sg.G();
    return Array.from(G.adj(sg.index(find))).map(i => sg.name(i));
  }

  public static adjecentToString(adjecent: Array<any>, find: string) {
    console.log(find);
    for(let x of adjecent) {
      console.log(` ${x}`);
    }
  }
}