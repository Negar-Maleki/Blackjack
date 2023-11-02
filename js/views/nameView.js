import { state } from "../controllers/stateManager.js";
import * as helper from "../utilities/helper.js";

const nameInputDiv = document.querySelector(".name-input-div");
const betDiv = document.querySelector(".bet-div");
const playerSection = document.querySelector(".player-section");

export function playerNameView() {
  helper.hide(".player-selection");
  helper.hide(".start-btn");
  helper.unhide(".name-input-main-div");

  prepMultiPlayer();
  document.querySelectorAll(".name-input-div").forEach((nameDiv, i) => {
    nameDiv.querySelector(".name-input-label").textContent = `player ${i + 1}`;
    if (i == 0) helper.activate(nameDiv);
    else helper.deactivate(nameDiv);
  });
}

export function prepMultiPlayer() {
  if (!state.multiplayerInit) {
    state.multiplayerInit = true;
    for (let i = state.numPlayers - 1; i >= 1; i--) {
      const clonedPlayerNameDiv = nameInputDiv.cloneNode(true);
      clonedPlayerNameDiv.childNodes[1].textContent = `Player ${i + 1}`;
      clonedPlayerNameDiv.classList.remove("player--0");
      clonedPlayerNameDiv.classList.add(`player--${i}`);
      nameInputDiv.parentNode.insertBefore(
        clonedPlayerNameDiv,
        nameInputDiv.nextSibling
      );

      const clonedBetDiv = betDiv.cloneNode(true);
      clonedBetDiv.classList.remove("player--0");
      clonedBetDiv.classList.add(`player--${i}`);
      betDiv.parentNode.insertBefore(clonedBetDiv, betDiv.nextSibling);

      const clonedPlayerSection = playerSection.cloneNode(true);
      clonedPlayerSection.classList.remove("player--0");
      clonedPlayerSection.classList.add(`player--${i}`);
      playerSection.parentNode.insertBefore(
        clonedPlayerSection,
        playerSection.nextSibling
      );
    }
  }
}
