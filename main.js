'use strict';
// 配列シャッフル
Array.prototype.shuffle = function() {
  let i = this.length;
  while (i) {
    let j = Math.floor(Math.random() * i);
    let t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
}

// 広域変数
let timer = NaN, score = 0, flipTimer, prevCard, startTime;

// 初期化関数
function init() {
  let table = document.getElementById("table");

  let cards = [];
  for (let i = 1; i <= 10; i++) {
    cards.push(i);
    cards.push(i);
  }
  cards.shuffle();

  for (let i = 0; i < 4; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      let td = document.createElement("td");
      td.className = "card back";
      td.number = cards[i * 5 + j];
      td.onclick = flip;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  startTime = new Date();
  timer = setInterval(tick, 1000);
}

// 経過時間計測用タイマー
function tick() {
  let now = new Date();
  let elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
  document.getElementById("time").textContent = elapsed;
}

// カード裏返し
function flip(e) {
  let src = e.srcElement;
  if (flipTimer || src.textContent != "") {
    return;
  }

  let num = src.number;
  src.className = "card";
  src.textContent = num;

  // 1枚目
  if (prevCard == null) {
    prevCard = src;
    return;
  }

  // 2枚目
  if (prevCard.number == num) {
    if (++score == 10) {
      clearInterval(timer);
    }
    prevCard = null;
    clearTimeout(flipTimer);
  } else {
    flipTimer = setTimeout(function() {
      src.className = "card back";
      src.textContent = "";
      prevCard.className = "card back";
      prevCard.textContent = "";
      prevCard = null;
      flipTimer = NaN;
    }, 1000);
  }
}