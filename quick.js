const pivotValue = getVal(arr[end]);
let pivotIndex = start;
// let fin = 0;
for (let i = start; i < end; i++) {
  if (getVal(arr[i]) < pivotValue) {
    //active
    // active(arr[i], arr[pivotIndex]);
    // await new Promise(resolve => setTimeout(resolve, delay));

    // Swapping elements
    swap(arr[i], arr[pivotIndex]);
    // await new Promise(resolve => setTimeout(resolve, delay));

    //deactive
    // deActive(arr[i], arr[pivotIndex]);
    // Moving to next element
    pivotIndex++;
  }
}

// if (fin === 1) finish(arr[start]);
//active
// active(arr[pivotIndex], arr[end]);
// await new Promise(resolve => setTimeout(resolve, delay));

// Putting the pivot value in the middle
swap(arr[pivotIndex], arr[end]);
// await new Promise(resolve => setTimeout(resolve, delay));

//deactive
// deActive(arr[pivotIndex], arr[end]);

// Returns pivotIndex
let index = pivotIndex;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Recursively apply the same logic to the left and right subarrays
quickRecur(arr, start, index - 1);
quickRecur(arr, index + 1, end);
