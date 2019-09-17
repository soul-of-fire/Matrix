export class FrequencyCounter {
  public static count( a: Array<string>, st: any) {
    for(let word of a) { 
      if (!st.contains(word)) {
        st.put(word, 1);
      } else {
        st.put(word, st.get(word) + 1);
      }
    }
    return st;
  }
}
