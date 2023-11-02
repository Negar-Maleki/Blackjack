import { DeckSet } from "../models/decks.js";
import { Player, Dealer } from "../models/player.js";

class State {
  multiplayerInit = false;
  initPlayers(n = 1) {
    const deck = new DeckSet();
    this.deck = deck;
    this.dealer = new Dealer(deck);
    this.players = [];
    this.activePlayerId = 0;
    this.numPlayers = n;
    for (let i = 1; i <= n; i++) this.players.push(new Player(this.deck));
  }
  playerAddCard() {
    this.activePlayer.addCard();
  }

  dealerAddCard() {
    this.dealer.addCard();
  }

  get isLastPlayer() {
    return state.activePlayerId == state.numPlayers - 1;
  }

  get activePlayer() {
    return this.players[this.activePlayerId];
  }

  set activePlayer(i) {
    this.activePlayerId = i;
  }

  nextPlayer() {
    this.activePlayerId++;
    if (this.activePlayerId > this.numPlayers - 1) this.activePlayerId = 0;
  }

  calcGameResult(player) {
    if (player.isBlackJack && !this.dealer.isBlackJack) return player.bet * 3;

    if (player.isBusted) return 0;

    if (player.handValue > this.dealer.handValue || this.dealer.isBusted)
      return player.bet * 2;

    if (player.handValue == this.dealer.handValue) return player.bet;

    return 0;
  }

  updateGameResult() {
    this.players.forEach((player) => {
      player.winValue = this.calcGameResult(player);
    });
  }
}

export const state = new State();
