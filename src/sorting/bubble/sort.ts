export default class Bubblesort {
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
      let hasSwap = false;
      const newArray = [...this.array];
      for (let i = 0; i < newArray.length - 1; i++) {
        if (newArray[i] > newArray[i + 1]) {
          [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
          hasSwap = true;
        }
      }
      if (!hasSwap) {
        clearInterval(intervalId);
        return;
      }
      this.array = newArray;
      this.currentIndex++;
    }, 10);
  }
}
