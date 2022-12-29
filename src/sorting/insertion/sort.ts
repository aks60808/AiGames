export default class InsertionSort {
  array: number[];
  currentIndex: number;
  sortedIndex: number;

  constructor(array: number[]) {
    this.array = array;
    this.currentIndex = 0;
    this.sortedIndex = -1;
  }
  setArray(array: number[]) {
    this.array = array;
  }
  setCurrentIndex(currentIndex: number) {
    this.currentIndex = currentIndex;
  }
  setSortedIndex(sortedIndex: number) {
    this.sortedIndex = sortedIndex;
  }
  Sort() {
    const intervalId = setInterval(() => {
      if (this.currentIndex >= this.array.length) {
        clearInterval(intervalId);
        return;
      }
      const newArray = [...this.array];
      let currentValue = newArray[this.currentIndex];
      let i = this.currentIndex - 1;
      while (i >= 0 && newArray[i] > currentValue) {
        newArray[i + 1] = newArray[i];
        i--;
      }
      newArray[i + 1] = currentValue;
      this.sortedIndex = this.currentIndex;
      this.array = newArray;
      this.currentIndex++;
    }, 10);
  }
}
