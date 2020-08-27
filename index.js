const message = document.querySelector(".message"),
  form = document.querySelector("form"),
  input = form.querySelector("input"),
  result = document.querySelector(".result");
const ratesNum = document.querySelector(".header__rates__num"),
  currentTime = document.querySelector(".main_clock");
const date = new Date();
let curData = {
  korea: 0,
  japan: 0,
  change: 0,
};
let arrData = {};

/* 
환율 계산식. 원엔환율은?
원달러환율 / 엔달러환율 * 100 = 100엔에 원은 얼마? 가 나옴.
엔달러 / 원달러 = 1원에 몇엔이 나옴.
*/

function paintCur(data) {
  curData.korea = data.KOR;
  curData.japan = data.JPN;
  const current = (data.JPN / data.KOR).toFixed(4);
  curData.change = current;
  console.log(`현재의 원엔환율은 1원에 ${current}원 입니다.`);
  const text = `현재의 원엔환율은 1원에 ${current}원 입니다.`;
  const rate_num = ` ${current}원 입니다.`;
  ratesNum.innerText = rate_num;
}

function getCur() {
  fetch(
    "https://openexchangerates.org/api/latest.json?app_id=bd77e6e8b5e7409b9b9d6ddab46c734b"
  )
    .then((Response) => Response.json())
    .then((json) => {
      console.log(json.rates);
      const cur = {
        KOR: json.rates.KRW,
        JPN: json.rates.JPY,
      };
      paintCur(cur);
      // arrData.push(json.rates);
      arrData = json.rates;
      console.log(arrData.AFN);
    });
}

function paintChangeCur(num) {
  const resultMoney = (num * curData.change).toFixed(1);
  console.log(`현재 환율에 의해 ${num}원은 ${resultMoney}엔입니다!`);
  currentTime.innerText = `현재시각 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${
    date.getHours() < 10 ? `0${date.getHours()}시` : `${date.getHours()}시`
  }`;
  result.innerText = `${num}원은 엔화 ${resultMoney}엔입니다!`;
}

function handler(event) {
  event.preventDefault();
  const currency = parseInt(input.value);
  paintChangeCur(currency);
  input.value = null;
}

function init() {
  getCur();
  form.addEventListener("submit", handler);
}
init();
