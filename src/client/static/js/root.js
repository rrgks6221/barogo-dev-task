import { getCardNumber, myAxios } from './functions.js';

let resetTime = 10;

const initResetTime = () => {
  resetTime = 10;
};

setInterval(async () => {
  resetTime -= 1;

  const resetTimeEl = document.getElementById('resetTime');
  resetTimeEl.textContent = String(resetTime);

  if (resetTime !== 0) {
    return;
  }

  reset();
  initResetTime();
}, 1000);

const getCurrentStatus = async () => {
  const response = await myAxios('api/payment-status');

  return response.body.paymentStatus;
};

const setCurrentStatus = async () => {
  const paymentStatus = await getCurrentStatus();

  const currentAmountEl = document.getElementById('currentStatus');

  if (paymentStatus === 'card') {
    currentAmountEl.textContent = '카드';
  } else if (paymentStatus === 'cash') {
    currentAmountEl.textContent = '현금';
  } else {
    currentAmountEl.textContent = '대기';
  }
};

const getCurrentAmount = async () => {
  const response = await myAxios('api/amount');

  return response.body.currentAmount;
};

const setCurrentAmount = async () => {
  const currentAmount = await getCurrentAmount();
  const currentAmountEl = document.getElementById('currentAmount');

  currentAmountEl.textContent = String(currentAmount) + '원';
};

const setResult = (resultText) => {
  const resultEl = document.getElementById('result');

  resultEl.textContent = resultText;
};

const viewSelectBeverage = async () => {
  const { body: beverages } = await myAxios('/api/beverages');
  const selectBeverageDiv = document.getElementById('selectBeverage');

  selectBeverageDiv.innerHTML = `<h2>음료 선택</h2>
  <a>&nbsp;&nbsp;&nbsp;&nbsp;상품명 / 가격 / 재고</a><br />`;

  beverages.forEach((beverage) => {
    const { id, name, price, stock } = beverage;

    const beverageInput = document.createElement('input');
    beverageInput.setAttribute('type', 'radio');
    beverageInput.setAttribute('name', 'drink');
    beverageInput.setAttribute(
      'value',
      JSON.stringify({ id, name, price, stock })
    );

    const beverageLabel = document.createElement('label');
    beverageLabel.setAttribute('for', name);
    beverageLabel.innerHTML = `${name} / ${price}원 / ${stock}개 <br />`;

    selectBeverageDiv.appendChild(beverageInput);
    selectBeverageDiv.appendChild(beverageLabel);
  });
};

const clickBuyButton = () => {
  const buyButton = document.getElementById('buy');

  buyButton.addEventListener('click', async () => {
    const selectedDrink = document.querySelector('input[name="drink"]:checked');
    const { id, name } = JSON.parse(selectedDrink.value);

    const { status, body } = await myAxios(`api/beverages/${id}/orders`, {
      method: 'POST',
    });

    if (status === 400) {
      return alert(body.msg);
    }

    setCurrentAmount();
    setResult(`${name} 1개 반환됐습니다.`);
    viewSelectBeverage();
    initResetTime();
  });
};

const clickInsertCashButton = () => {
  const insertCashButton = document.getElementById('insertCash');

  insertCashButton.addEventListener('click', async () => {
    const selectedCash = +document.getElementById('cashInput').value;

    const insertCashInputResponse = await myAxios('api/cash', {
      method: 'POST',
      body: {
        cash: selectedCash,
      },
    });

    if (insertCashInputResponse.status === 400) {
      alert(insertCashInputResponse.body.msg);
      setResult(`카드결제중이기때문에 투입금액이 반환됐습니다.  
      (반환금액: ${insertCashInputResponse.body.data.returnAmount})`);
      return;
    }

    setCurrentAmount();
    setCurrentStatus();
    setResult('현금이 투입됐습니다.');
    initResetTime();
  });
};

const clickReturnCashButton = () => {
  const returnCashButton = document.getElementById('returnCash');

  returnCashButton.addEventListener('click', async () => {
    const returnCashInputResponse = await myAxios('api/cash');

    if (returnCashInputResponse.status === 400) {
      return alert(returnCashInputResponse.body.msg);
    }

    setCurrentAmount();
    setCurrentStatus();
    setResult(`현금이 반환됐습니다.  
    (${Object.entries(returnCashInputResponse.body.returnAmount)
      .map(([unit, count]) => {
        return `${unit}: ${count}개`;
      })
      .join(', ')})`);
    initResetTime();
  });
};

const clickCardCognize = () => {
  const cardCognize = document.getElementById('cardCognize');

  cardCognize.addEventListener('click', async () => {
    const cardCognizeResponse = await myAxios(`api/cards/${getCardNumber()}`);

    if (cardCognizeResponse.status === 400) {
      return alert(cardCognizeResponse.body.msg);
    }

    setCurrentAmount();
    setCurrentStatus();
    setResult('카드가 인식됐습니다.');
    initResetTime();
  });
};

const reset = async () => {
  let result = '';

  const currentStatus = await getCurrentStatus();

  if (currentStatus === 'card') {
    result = '카드와의 연결이 제거되었습니다.';
  } else if (currentStatus === 'cash') {
    const returnCashInputResponse = await myAxios('api/cash');

    result = `현금이 반환됐습니다.  
    (${Object.entries(returnCashInputResponse.body.returnAmount)
      .map(([unit, count]) => {
        return `${unit}: ${count}개`;
      })
      .join(', ')})`;
  } else {
    result = '결과가 여기에 표시됩니다.';
  }

  await myAxios('api/reset', {
    method: 'POST',
  });

  setCurrentAmount();
  setCurrentStatus();
  setResult(result);
  initResetTime();
};

const clickReset = () => {
  const resetButton = document.getElementById('reset');

  resetButton.addEventListener('click', reset);
};

(async function main() {
  await viewSelectBeverage();

  clickBuyButton();
  clickInsertCashButton();
  clickReturnCashButton();
  clickCardCognize();
  clickReset();

  setCurrentAmount();
  setCurrentStatus();
})();
