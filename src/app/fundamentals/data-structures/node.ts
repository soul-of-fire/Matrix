export class Node<Item> {
  constructor(public item: Item = null, public next: Node<Item> = null) { };
}