'use strict';

//global variables

const bar = document.querySelector('#arr_size');
const speed = document.querySelector('#sort_speed');
const btnNew = document.querySelector('#new-arr-btn');
const btnBubble = document.querySelector('#bubble-btn');
const btnSelect = document.querySelector('#selection-btn');
const btnInsert = document.querySelector('#insertion-btn');
const btnQuick = document.querySelector('#quick-btn');
const btnMerge = document.querySelector('#merge-btn');

let barNum = +bar.value;
let delay = -speed.value;
let curArr = 0;

newArr();
///event listeners
btnNew.addEventListener('click', newArr);
btnBubble.addEventListener('click', bubble);
btnSelect.addEventListener('click', selection);
btnInsert.addEventListener('click', insertion);
btnQuick.addEventListener('click', quick);
btnMerge.addEventListener('click', merge);

bar.addEventListener('input', setBar);
speed.addEventListener('input', setSpeed);

//unavaiable
function unAvaiable(el) {
  document.querySelectorAll('.btn-sort').forEach(btn => {
    btn.classList.add('disable');
  });
  el.classList.remove('disable');
  el.style.pointerEvents = 'none';
}

//avaiable
function avaiable() {
  document.querySelectorAll('.btn-sort').forEach(btn => {
    btn.classList.remove('disable');
  });
  document.querySelectorAll('.btn-sort').forEach(btn => {
    btn.style.pointerEvents = '';
  });
}

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
  curArr++;
  const arrBar = [];
  for (let i = 0; i < barNum; i++) {
    const rdNum = Math.trunc(Math.random() * 110) + 1;
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
  avaiable();
}

//wait
const wait = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

//swap
async function swap(el1, el2) {
  //delay for animation
  let ms = delay < 100 ? 60 : delay < 300 ? 100 : 200;

  const val1 = `${getVal(el1)}px`;
  const val2 = `${getVal(el2)}px`;

  //animate swap height
  el1.animate(
    {
      height: val2,
    },
    ms
  );
  await wait(ms);
  el1.style.height = val2;
  el2.animate(
    {
      height: val1,
    },
    ms
  );
  await wait(ms);
  el2.style.height = val1;
}

//change color
const active = function (el1, el2) {
  el1.style.background = '#3333ff';
  if (!el2) return;
  el2.style.background = '#3333ff';
};
const deActive = function (el1, el2) {
  el1.style.background = '#44aaaa';
  if (!el2) return;
  el2.style.background = '#44aaaa';
};
const finish = function (el) {
  el.style.background = 'rgb(252, 255, 77)';
};
const pivot = function (el) {
  el.classList.add('pivot');
};
const rmPivot = function (el) {
  el.classList.remove('pivot');
};
//done
const done = function (arr) {
  arr.forEach(x => {
    x.style.background = '#0eff0e';
  });
};

//get value
function getVal(el) {
  const style = window.getComputedStyle(el);
  let v = style.getPropertyValue('height');
  v = Number(v.slice(0, -2));
  return v;
}

// Bubble sort
async function bubble() {
  unAvaiable(this);
  let thisArr = curArr;
  let lucky = 1;
  const bars = document.querySelectorAll('.bar');
  let barsLen = bars.length;
  for (let j = 0; j < bars.length; j++) {
    if (lucky === bars.length) {
      done(bars);
      avaiable();
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
        await swap(bars[i], bars[i + 1]);
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
  done(bars);
  if (curArr !== thisArr) return;
  avaiable();
}

//selection sort
async function selection() {
  unAvaiable(this);
  let thisArr = curArr;
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
        await swap(bars[k], bars[i]);
        await wait(delay);
        finish(bars[i]);

        //change last bar color
        if (barslen === i + 2) {
          finish(bars[i + 1]);
        }
      }
    }
  }
  done(bars);
  if (curArr !== thisArr) return;
  avaiable();
}

//insertion
async function insertion() {
  unAvaiable(this);
  let thisArr = curArr;
  const bars = document.querySelectorAll('.bar');
  const barslen = bars.length;

  for (let i = 0; i < barslen - 1; i++) {
    const [v1, v2] = [getVal(bars[i]), getVal(bars[i + 1])];

    //active
    active(bars[i], bars[i + 1]);
    await wait(delay);

    if (v1 > v2) {
      await swap(bars[i], bars[i + 1]);
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
        await swap(bars[j], bars[j - 1]);
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
  done(bars);
  if (curArr !== thisArr) return;
  avaiable();
}

//quick sort
async function quick() {
  unAvaiable(this);
  let thisArr = curArr;
  const bars = document.querySelectorAll('.bar');
  const barslen = bars.length;

  async function quickRecur(arr, start, end) {
    //check arr 0 or invalid
    if (start >= end) {
      if (end >= 0) {
        //active
        active(arr[end]);
        await wait(delay);
        finish(arr[end]);
      }
      return;
    }

    const pivotValue = getVal(arr[end]);
    let pivotIndex = start;

    //color pivot
    pivot(arr[end]);
    for (let i = start; i < end; i++) {
      //active
      active(arr[i], arr[pivotIndex]);
      await wait(delay);

      //check
      if (getVal(arr[i]) < pivotValue) {
        //swap with pivot
        await swap(arr[i], arr[pivotIndex]);
        //deactive
        deActive(arr[i], arr[pivotIndex]);

        //next index
        pivotIndex++;
      } else {
        //deactive
        deActive(arr[i], arr[pivotIndex]);
      }
    }
    //decolor pivot
    bars.forEach(x => {
      if (x.classList.contains('pivot')) x.classList.remove('pivot');
    });
    //color finish
    finish(bars[pivotIndex]);

    //put pivot to middle
    await swap(arr[pivotIndex], arr[end]);
    await wait(delay);
    let index = pivotIndex;

    //recursion
    await quickRecur(arr, start, index - 1);
    await quickRecur(arr, index + 1, end);
  }
  await quickRecur(bars, 0, barslen - 1);
  done(bars);
  if (curArr !== thisArr) return;
  avaiable();
}

///merge
async function merge() {
  unAvaiable(this);
  let thisArr = curArr;
  const bars = document.querySelectorAll('.bar');
  const barslen = bars.length;

  await mergeDivider(0, barslen - 1);
  for (let counter = 0; counter < barslen; ++counter) {
    done(bars);
  }

  async function mergeDivider(start, end) {
    if (start < end) {
      let mid = start + Math.floor((end - start) / 2);
      await mergeDivider(start, mid);
      await mergeDivider(mid + 1, end);
      await mergeSort(start, mid, end);
    }
  }

  async function mergeSort(start, mid, end) {
    let newList = new Array();
    let frontcounter = start;
    let midcounter = mid + 1;

    while (frontcounter <= mid && midcounter <= end) {
      let fvalue = getVal(bars[frontcounter]);
      let svalue = getVal(bars[midcounter]);
      if (fvalue >= svalue) {
        newList.push(svalue);
        ++midcounter;
      } else {
        newList.push(fvalue);
        ++frontcounter;
      }
    }
    while (frontcounter <= mid) {
      newList.push(getVal(bars[frontcounter]));
      ++frontcounter;
    }
    while (midcounter <= end) {
      newList.push(getVal(bars[midcounter]));
      ++midcounter;
    }

    for (let c = start; c <= end; ++c) {
      active(bars[c]);
    }
    for (
      let c = start, point = 0;
      c <= end && point < newList.length;
      ++c, ++point
    ) {
      let ms = delay < 100 ? 60 : delay < 300 ? 100 : 200;
      await wait(delay);
      bars[c].animate(
        {
          height: `${newList[point]}px`,
        },
        ms
      );
      await wait(ms);
      bars[c].style.height = `${newList[point]}px`;
    }
    for (let c = start; c <= end; ++c) {
      finish(bars[c]);
    }
  }
  if (curArr !== thisArr) return;
  avaiable();
  //mergesort codes ref from gihub dharshakch97
}
