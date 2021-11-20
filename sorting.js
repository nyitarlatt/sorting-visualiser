"use strict";

let barNum = 20;
let delay = 1;

newArr();
///event listeners
document.querySelector("#new-arr-btn").addEventListener("click", newArr);
document.querySelector("#bubble-btn").addEventListener("click", bubble);
document.querySelector("#selection-btn").addEventListener("click", selection);
document.querySelector("#insertion-btn").addEventListener("click", insertion);

//new array
function newArr() {
  const arrBar = [];
  for (let i = 0; i < barNum; i++) {
    const rdNum = Math.trunc(Math.random() * 101) + 1;
    arrBar.push(rdNum);
  }
  //clear olds
  document.querySelector(".bars").innerHTML = "";
  //create bars
  arrBar.forEach((bar) => {
    const html = `
  <div class="bar bg-info mx-1" style="height:${bar * 3}px ;"></div>
    `;
    document.querySelector(".bars").insertAdjacentHTML("beforeend", html);
  });
}

//swap
function swap(el1, el2) {
  const style1 = window.getComputedStyle(el1);
  const style2 = window.getComputedStyle(el2);

  const transfrom1 = style1.getPropertyValue("height");
  const transfrom2 = style2.getPropertyValue("height");

  el1.style.height = transfrom2;
  el2.style.height = transfrom1;
}

//change color
const active = function (el1, el2) {
  el1.classList.add("bg-danger");
  if (!el2) return;
  el2.classList.add("bg-danger");
};
const deActive = function (el1, el2) {
  el1.classList.remove("bg-danger");
  if (!el2) return;
  el2.classList.remove("bg-danger");
};
const finish = function (el) {
  el.classList.add("done");
};

//get value
const getVal = function (el) {
  const style = window.getComputedStyle(el);
  let v = style.getPropertyValue("height");
  v = Number(v.slice(0, -2));
  return v;
};

// Bubble sort
async function bubble() {
  const bars = document.querySelectorAll(".bar");
  let barsLen = bars.length;

  for (let j = 0; j < bars.length; j++) {
    for (let i = 0; i < barsLen - 1; i++) {
      //get values
      let [v1, v2] = [getVal(bars[i]), getVal(bars[i + 1])];

      //active
      active(bars[i], bars[i + 1]);
      await new Promise((resolve) => setTimeout(resolve, delay));

      //check swap
      if (v1 > v2) {
        swap(bars[i], bars[i + 1]);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));

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
  const bars = document.querySelectorAll(".bar");
  const barslen = bars.length;

  for (let i = 0; i < barslen - 1; i++) {
    //place holder for smallest
    let k = i;
    for (let j = i + 1; j < barslen; j++) {
      //get values
      let [v1, v2] = [getVal(bars[k]), getVal(bars[j])];

      //active
      active(bars[k], bars[j]);
      await new Promise((resolve) => setTimeout(resolve, delay));

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
        await new Promise((resolve) => setTimeout(resolve, delay));
        bars[i].classList.add("done");

        //change last bar color
        if (barslen === i + 2) {
          bars[i + 1].classList.add("done");
        }
      }
    }
  }
}

//insertion
async function insertion() {
  const bars = document.querySelectorAll(".bar");
  const barslen = bars.length;
}
