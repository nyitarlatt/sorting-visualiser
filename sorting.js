'use strict';

//global variables

const bar = document.querySelector('#arr_size');
const speed = document.querySelector('#sort_speed');
const btnNew = document.querySelector('#new-arr-btn');
const btnBubble = document.querySelector('#bubble-btn');
const btnSelect = document.querySelector('#selection-btn');
const btnInsert = document.querySelector('#insertion-btn');
const btnQuick = document.querySelector('#quick-btn');

let barNum = +bar.value;
let delay = -speed.value;

newArr();
///event listeners
btnNew.addEventListener('click', newArr);
btnBubble.addEventListener('click', bubble);
btnSelect.addEventListener('click', selection);
btnInsert.addEventListener('click', insertion);
btnQuick.addEventListener('click', quick);

bar.addEventListener('input', setBar);
speed.addEventListener('input', setSpeed);

//set bar
function setBar() {
  barNum = +bar.value;
  newArr();
}

//set speed
function setSpeed() {
  delay = speed.value;
  if (speed.value < 0) delay = -speed.value;
}

//new array
function newArr() {
  const arrBar = [];
  for (let i = 0; i < barNum; i++) {
    const rdNum = Math.trunc(Math.random() * 101) + 1;
    arrBar.push(rdNum);
  }
  //clear olds
  document.querySelector('.bars').innerHTML = '';
  //create bars
  arrBar.forEach(bar => {
    const width = Math.floor(1000 / barNum);
    const html = `
  <div class="bar" style="height:${bar * 3}px ;width:${width}px"></div>
    `;
    document.querySelector('.bars').insertAdjacentHTML('beforeend', html);
  });
}

//wait
const wait = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

//swap
function swap(el1, el2) {
  const style1 = window.getComputedStyle(el1);
  const style2 = window.getComputedStyle(el2);

  const transfrom1 = style1.getPropertyValue('height');
  const transfrom2 = style2.getPropertyValue('height');

  el1.style.height = transfrom2;
  el2.style.height = transfrom1;
}

//change color
const active = function (el1, el2) {
  el1.style.background = 'red';
  if (!el2) return;
  el2.style.background = 'red';
};
const deActive = function (el1, el2) {
  el1.style.background = '#44aaaa';
  if (!el2) return;
  el2.style.background = '#44aaaa';
};
const finish = function (el) {
  el.style.background = 'green';
};
const pivot = function (el) {
  el.classList.add('pivot');
};
const rmPivot = function (el) {
  el.classList.remove('pivot');
};

//get value
const getVal = function (el) {
  const style = window.getComputedStyle(el);
  let v = style.getPropertyValue('height');
  v = Number(v.slice(0, -2));
  return v;
};

// Bubble sort
async function bubble() {
  let lucky = 1;
  const bars = document.querySelectorAll('.bar');
  let barsLen = bars.length;
  for (let j = 0; j < bars.length; j++) {
    if (lucky === bars.length) {
      bars.forEach(x => finish(x));
      return;
    }
    lucky = 1;
    for (let i = 0; i < barsLen - 1; i++) {
      //get values
      let [v1, v2] = [getVal(bars[i]), getVal(bars[i + 1])];

      //active
      active(bars[i], bars[i + 1]);
      await wait(delay);

      //check swap
      if (v1 > v2) {
        swap(bars[i], bars[i + 1]);
        await wait(delay);
      } else {
        lucky++;
      }

      //deactive
      deActive(bars[i], bars[i + 1]);
      if (i + 1 == barsLen - 1) {
        finish(bars[i + 1]);
        //chang last bar color
        if (barsLen == 2) finish(bars[i]);
        barsLen--;
      }
    }
  }
}

//selection sort
async function selection() {
  const bars = document.querySelectorAll('.bar');
  const barslen = bars.length;

  for (let i = 0; i < barslen - 1; i++) {
    //place holder for smallest
    let k = i;
    for (let j = i + 1; j < barslen; j++) {
      //get values
      let [v1, v2] = [getVal(bars[k]), getVal(bars[j])];

      //active
      active(bars[k], bars[j]);
      await wait(delay);

      //check
      if (v2 < v1) {
        deActive(bars[k]);
        k = j;
      }

      //deactive
      deActive(bars[k], bars[j]);

      //swap
      if (j + 1 === barslen) {
        swap(bars[k], bars[i]);
        await wait(delay);
        finish(bars[i]);

        //change last bar color
        if (barslen === i + 2) {
          finish(bars[i + 1]);
        }
      }
    }
  }
}

//insertion
async function insertion() {
  const bars = document.querySelectorAll('.bar');
  const barslen = bars.length;

  for (let i = 0; i < barslen - 1; i++) {
    const [v1, v2] = [getVal(bars[i]), getVal(bars[i + 1])];

    //active
    active(bars[i], bars[i + 1]);
    await wait(delay);

    if (v1 > v2) {
      swap(bars[i], bars[i + 1]);
      await wait(delay);

      //deactive
      deActive(bars[i], bars[i + 1]);

      for (let j = i; j >= 0; j--) {
        if (j - 1 < 0) {
          finish(bars[j]);
          break;
        }
        const [val1, val2] = [getVal(bars[j]), getVal(bars[j - 1])];
        if (val1 > val2) {
          finish(bars[j]);

          break;
        }

        //active
        active(bars[j], bars[j - 1]);
        await wait(delay);

        //swap
        swap(bars[j], bars[j - 1]);
        await wait(delay);

        //deactive
        deActive(bars[j], bars[j - 1]);
        finish(bars[j]);
      }
    } else {
      //deactive
      deActive(bars[i], bars[i + 1]);
      finish(bars[i]);
    }
  }
  //change last bar color
  finish(bars[barslen - 1]);
}

//quick sort
function quick() {
  const bars = document.querySelectorAll('.bar');
  const barslen = bars.length;

  async function quickRecur(arr, start, end) {
    if (start >= end) {
      if (end >= 0) {
        finish(arr[end]);
      }
      return;
    }

    const pivotValue = getVal(arr[end]);
    let pivotIndex = start;
    pivot(arr[pivotIndex]);
    for (let i = start; i < end; i++) {
      if (getVal(arr[i]) < pivotValue) {
        //active
        active(arr[i]);
        await wait(delay);

        swap(arr[i], arr[pivotIndex]);
        pivotIndex++;

        //deactive
        deActive(arr[i]);
      }
    }
    bars.forEach(x => {
      if (x.classList.contains('pivot')) x.classList.remove('pivot');
    });
    finish(bars[pivotIndex]);

    swap(arr[pivotIndex], arr[end]);
    await wait(delay);
    let index = pivotIndex;
    quickRecur(arr, start, index - 1);
    quickRecur(arr, index + 1, end);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }
  quickRecur(bars, 0, barslen - 1);
}
