# 요구사항 정의

사용자가 음료 자판기를 사용할 때 자판기에서 일어나는 로직 구현

## 전제조건

### 기본 전제조건

1. 사용자가 이용 가능한 결제 수단
   1. 현금
      1. 100원 / 500원 / 1,000원 / 5,000원 / 10,000원
   1. 카드
1. 구매 가능한 음료수
   1. 물: 600원
   1. 커피: 700원
   1. 콜라: 1,100원

---

### 현금의 경우

#### 현금결제 시 추가 전제조건

1. 사용자에게는 충분한 현금이 있다고 가정한다.
1. 자판기에서 제공할 수 있는 거스름돈의 단위는 사용자가 이용할 수 있는 단위와 동일하며 화폐의 개수는 무제한으로 가정한다.
   1. 화폐의 단위와 상관없이 동정 또는 지폐를 구분하지 않고 같은 화폐로 가정한다.
1. 자판기에서 제공할 수 있는 음료수의 개수는 어플리케이션 실행 및 1시간 단위로 10 ~ 100개로 랜덤 지정한다.
1. 10초간 특정 동작이 없을 경우 실행을 중단하고 잔여금액을 반환한다. (잔여시간)

#### 현금이 투입될 때

1. 카드 결제가 진행중인지 확인한다.
   1. 카드 결제가 진행중이라면 투입된 현금을 반환한다.
   1. 현금결제 상태라면 상태를 현금결제로 유지한다.
   1. 대기 상태라면 현금결제로 변경한다.
1. 투입된 현금이 허용되는 단위의 화폐인지 확인한다.
   1. 요구사항을 만족하지 못한다면 투입된 현금을 반환한다.
1. 투입된 현금이 위조된 현금인지 확인한다.
   1. 요구사항을 만족하지 못한다면 투입된 현금을 반환한다.
1. 투입된 현금이 훼손된 현금인지 확인한다.
   1. 요구사항을 만족하지 못한다면 투입된 현금을 반환한다.
1. 잔여금액에 투입된 현금을 더한다.
1. 잔여시간을 초기화한다.

#### 음료수 버튼 클릭

1. 해당 음료수를 구매할 수 있는 잔여금액이 있는지 확인한다.
   1. 금액이 충분하지 않다면 아무 동작을 일으키지 않는다.
1. 해당 음료수의 재고가 존재하는지 확인한다.
   1. 금액이 충분하지 않다면 아무 동작을 일으키지 않는다.
1. 음료수를 반환한다.
   1. 선택된 음료수의 재고를 -1 한다.
   1. 잔여금액에 선택된 음료수의 가격을 뺀다.
1. 잔여시간을 초기화한다.

#### 거스름돈 반환 버튼 클릭

1. 현금결제중인지 확인한다.
   1. 현금결제중이 아니라면 아무런 동작을 하지 않는다.
1. 거스름돈이 존재하는지 확인한다.
   1. 거스름돈이 존재하지 않는다면 아무 동작을 일으키지 않는다.
1. 거스름돈이 존재한다면 거스름돈을 반환한다.
1. 잔여금액을 0원으로 변경한다.
1. 결제상태를 대기로 변경한다.
1. 잔여시간을 -1로 번경한다.

---

### 카드의 경우

#### 카드결제 시 추가 전제조건

1. 사용할 수 있는 카드의 종류(버스카드, 체크카드, 신용카드 등) 및 제조사는 고려하지 않는다.
   1. 결제실패는 고려하지 않는다.
1. 카드 잔액조회시 잔액은 300 ~ 3000원으로 제한한다.
1. 10초간 특정 동작이 없을 경우 실행을 중단한다. (잔여시간)

#### 카드버튼에 카드를 인식할 경우

1. 결제 상태를 확인한다.
   1. 결제 상태가 현금이라면 인식시키지 않는다.
   1. 결제 상태가 대기라면 카드 결제 상태로 변경한다.
   1. 결제 상태가 카드 결제라면 잔여시간을 초기화한다.
1. 카드 결제가능 상태를 확인한다.
   1. 카드가 불량카드가 아닌지 확인한다.
   1. 카드가 정지 상태인지 확인한다.
   1. 카드가 분실 상태인지 확인한다.
1. 카드의 현재 잔역을 불러온다.

#### 음료수 버튼 클릭

1. 카드의 현재잔액이 음료 가격보다 많은지 확인한다.
   1. 잔액이 부족하다면 아무 동작을 일으키지 않고 잔여시간을 초기화한다.
1. 카드사에 결제요청을 한다.
   1. 카드사의 결제 실패는 없다는 전제로 진행한다.
   1. 음료수를 반환한다.
   1. 음료의 재고를 -1 한다.
   1. 잔여시간을 초기화한다.
1. 카드의 현재잔액을 불러온다.