import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Bubblesort from "./bubble/sort";
import InsertionSort from "./insertion/sort";

function SortDom() {
  const [array, setArray] = useState([5, 2, 4, 1, 3]);
  const [arraySize, setArraySize] = useState(500);
  const [sortAlgo, setsortAlgo] = useState<any>(new InsertionSort(array));
  const [sortAlgoName, setsortAlgoName] = useState("Insertion Sort");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedIndex, setSortedIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);

  const handleStartSort = () => {
    sortAlgo.setArray(array);
    sortAlgo.setCurrentIndex(0);
    sortAlgo.setSortedIndex(-1);
    setIsSorting(true);
    sortAlgo.Sort();
  };
  const clearArray = (algo: string) => {
    let array = Array.from({ length: arraySize }, (v, i) => i);
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
    setArray(array);
    setCurrentIndex(0);
    setSortedIndex(-1);
    setIsSorting(false);
    if (algo === "Bubble Sort") {
      setsortAlgo(new Bubblesort(array));
    }
    if (algo === "Insertion Sort") {
      setsortAlgo(new InsertionSort(array));
    }
    setsortAlgoName(algo);
  };
  useEffect(() => {
    // Generate an array of random numbers on mount
    let array = Array.from({ length: 500 }, (v, i) => i);
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
    setArray(array);
    setsortAlgo(new InsertionSort(array));
  }, []);
  useEffect(() => {
    // Generate an array of random numbers on mount
    let array = Array.from({ length: arraySize }, (v, i) => i);
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
    setArray(array);
    setCurrentIndex(0);
    setSortedIndex(-1);
    setIsSorting(false);
  }, [arraySize, sortAlgo]);
  useEffect(() => {
    setCurrentIndex(sortAlgo.currentIndex);
    setSortedIndex(sortAlgo.sortedIndex);
    const intervalId = setInterval(() => {
      setArray(sortAlgo.array);
      if (!isSorting) {
        clearInterval(intervalId);
      }
    }, 10);
    return () => {
      clearInterval(intervalId);
    };
  }, [sortAlgo.array, sortAlgo.currentIndex, sortAlgo.sortedIndex, isSorting]);
  const navBar = () => {
    let currentAlgo = `Current Sort: ${sortAlgoName}`;
    return (
      <Navbar
        bg="secondary"
        variant="dark"
        expand="sm"
        collapseOnSelect
        style={{
          paddingLeft: "10px",
          width: "100%",
        }}
      >
        <DropdownButton
          id="dropdown-basic-button"
          title={currentAlgo}
          variant="dark"
        >
          <Dropdown.Item
            onClick={() => {
              clearArray("Bubble Sort");
            }}
          >
            Bubble
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              clearArray("Insertion Sort");
            }}
          >
            Insertion
          </Dropdown.Item>
        </DropdownButton>
        <Button
          variant="success"
          style={{ marginLeft: "10px" }}
          onClick={handleStartSort}
        >
          Start Sort
        </Button>
        <div className="form-group range-wrap">
          <input
            type="range"
            className="form-control-range"
            id="customRange1"
            min="5"
            max="1000"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
          />
        </div>
      </Navbar>
    );
  };
  return (
    <div>
      {navBar()}
      <div
        style={{
          display: "flex",
          width: "95%",
          height: "80%",
          alignItems: "center",
        }}
      >
        {array.map((item, index) => (
          <div
            key={index}
            style={{
              flexGrow: "1",
              height: `${((item + 1) / array.length) * 100}vh`,
              backgroundColor: index <= sortedIndex ? "blue" : "red",
              display: "inline-block",
              marginTop: "auto",
              transition: "background-color 0.5s ease-out",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SortDom;
