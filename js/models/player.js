export class Player {
  _name;
  constructor(deck, bank = 1000) {
    this.bank = bank;
    this.deck = deck;
    this.reset();
  }

  reset() {
    this.bet = 10;
    this.hand = [];
    this.addCard(2);
    this.winValue = 0;
  }

  updateBank(value) {
    this.bank += value;
  }

  updateBet(bet) {
    this.bet = bet;
  }

  doubleBet() {
    this.updateBank(-this.bet);
    this.bet = 2 * this.bet;
  }

  makeBet(bet) {
    this.bet = bet;
    this.updateBank(-bet);
  }

  betValid(betInput) {
    return betInput <= this.bank && betInput > 0;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  giveReward() {
    this.updateBank(this.winValue);
  }

  endMessage() {
    if (this.winValue == 0) return "You lost!";
    if (this.winValue == this.bet) return "It is a push!";
    if (this.winValue == 2 * this.bet)
      return `You won! Your reward is ${this.bet}`;
    return `Black Jack! Your reward is ${2 * this.bet}`;
  }

  get handValue() {
    return Player.calcValue(this.hand);
  }

  get isBusted() {
    return this.handValue > 21;
  }

  get isBlackJack() {
    return this.handValue === 21 && this.hand.length === 2;
  }

  addCard(num = 1) {
    this.hand = this.hand.concat(this.deck.drawCards(num));
  }

  static calcValue(hand) {
    const firstAceIndex = hand.findIndex((card) => card.value == "A");
    const value = hand
      .map((mov) => mov.value)
      .map((mov, i) => {
        if (["J", "Q", "K"].includes(mov)) return 10;
        if (mov == "A" && i == firstAceIndex) return 11;
        if (mov == "A") return 1;
        return mov;
      })
      .reduce((acc, cur) => acc + cur, 0);

    if (value <= 21) return value;

    return hand
      .map((mov) => mov.value)
      .map((mov) => {
        if (["J", "Q", "K"].includes(mov)) return 10;
        if (mov == "A") return 1;
        return mov;
      })
      .reduce((acc, cur) => acc + cur, 0);
  }
}

export class Dealer extends Player {
  dealerFillHand() {
    while (this.handValue < 17) {
      this.addCard();
    }
  }
}
