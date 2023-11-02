import { state } from "./stateManager.js";
import * as helper from "../utilities/helper.js";
import { betView } from "../views/betView.js";

export function nameDoneBtn() {
  const nameValue = helper.getElement([
    ".name-input-main-div",
    ` .player--${state.activePlayerId}`,
    ".name-input-player",
  ]).value;

  if (nameValue !== "") {
    state.activePlayer.name = nameValue;
    if (!state.isLastPlayer) {
      switchPlayer();
      state.nextPlayer();
    } else {
      state.nextPlayer();
      betView();
    }
  }
}

function switchPlayer() {
  if (state.numPlayers > 1 && !state.isLastPlayer) {
    const nameInputMainDiv = document.querySelector(".name-input-main-div");

    const curPlayer = nameInputMainDiv.querySelector(
      `.player--${state.activePlayerId}`
    );
    const nextPlayer = nameInputMainDiv.querySelector(
      `.player--${state.activePlayerId + 1}`
    );

    curPlayer.querySelector(".name-input-player").disabled = true;
    helper.deactivate(curPlayer);
    helper.activate(nextPlayer);
  }
}
