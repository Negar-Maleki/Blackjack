import { state } from "./stateManager.js";
import { view } from "../views/playView.js";

class EventManager {
  hitEvent() {
    state.playerAddCard();

    if (state.activePlayer.isBlackJack || state.activePlayer.isBusted) {
      view.hitEventView();
      if (state.isLastPlayer) {
        this.gameEndEvent();
      } else state.nextPlayer();
    } else view.hitEventView();
  }

  stayEvent() {
    view.stayEventView();
    if (state.isLastPlayer) this.gameEndEvent();
    else state.nextPlayer();
  }

  doubleEvent() {
    state.playerAddCard();
    view.hitEventView();
    state.activePlayer.doubleBet();
    view.doubleView();

    if (state.isLastPlayer) this.gameEndEvent();
    else state.nextPlayer();
  }

  gameEndEvent() {
    state.dealer.dealerFillHand();
    state.updateGameResult();
    state.players.forEach((player) => player.giveReward());

    view.dealerEventView();
    view.gameEndView();
  }

  nextRoundEvent() {
    state.players.forEach((player) => player.reset());
    state.dealer.reset();
    state.activePlayerId = 0;
    view.nextRoundView();
  }
}

export const eventManager = new EventManager();
