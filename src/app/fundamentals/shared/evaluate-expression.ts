export class EvaluateExpression {
  public static evaluate(exp: string): number {
    const ops = [];
    const vals = [];
    for (let s of exp.split('')) {
      if (s == '(') { } 
      else if (s == '+') ops.push(s);
      else if (s == '-') ops.push(s);
      else if (s == '*') ops.push(s);
      else if (s == '/') ops.push(s);
      else if (s == 'sqrt') ops.push(s);
      else if (s == ')') {
        const op = ops.pop();
        let v = +(vals.pop());
        if (op == '+') v = +(vals.pop()) + v;
        else if (op == '-') v = +(vals.pop()) - v;
        else if (op == '*') v = +(vals.pop()) * v;
        else if (op == '/') v = +(vals.pop()) / v;
        else if (op == 'sqrt') v = Math.sqrt(v);
        vals.push(v);
      }
      else vals.push(s);
    }
    return vals.pop();
  }
}