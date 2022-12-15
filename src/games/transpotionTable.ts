import Long from "long";
export class TranspositionTable {
  private table: Map<Long | number | string, any>;

  constructor() {
    this.table = new Map();
  }

  get(key: Long | number | string): any {
    return this.table.get(key);
  }

  set(key: Long | number | string, value: any): void {
    this.table.set(key, value);
  }
  reset(): void {
    this.table = new Map();
  }
}
