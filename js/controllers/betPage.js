import { state } from "./stateManager.js";
import * as helper from "../utilities/helper.js";
import { playView } from "../views/playView.js";

export function betDoneBtn() {
  let betValue = helper.getElement([
    ".bet-main-div",
    ` .player--${state.activePlayerId}`,
    ".bet-input",
  ]).value;

  betValue = Number(betValue);
  if (state.activePlayer.betValid(betValue)) {
    state.activePlayer.makeBet(betValue);
    if (!state.isLastPlayer) {
      switchPlayer();
      state.nextPlayer();
    } else {
      state.nextPlayer();
      playView();
    }
  }
}

function switchPlayer() {
  if (state.numPlayers > 1 && !state.isLastPlayer) {
    const betMainDiv = document.querySelector(".bet-main-div");

    const curPlayer = betMainDiv.querySelector(
      `.player--${state.activePlayerId}`
    );
    const nextPlayer = betMainDiv.querySelector(
      `.player--${state.activePlayerId + 1}`
    );

    curPlayer.querySelector(".bet-input").disabled = true;
    nextPlayer.querySelector(".bet-input").disabled = false;
    helper.deactivate(curPlayer);
    helper.activate(nextPlayer);
  }
}
