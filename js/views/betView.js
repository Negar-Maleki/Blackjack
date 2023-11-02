import { state } from "../controllers/stateManager.js";
import * as helper from "../utilities/helper.js";

export function betView() {
  helper.unhide(".bet-main-div");
  helper.hide(".name-input-main-div");

  document.querySelectorAll(".bet-div").forEach((betDiv, i) => {
    betDiv.querySelector(".bet-input-label").textContent =
      state.players[i].name;
    betDiv.querySelector(".bank").textContent = state.players[i].bank;
    if (i == 0) {
      helper.activate(betDiv);
      betDiv.querySelector(".bet-input").disabled = false;
    } else {
      helper.deactivate(betDiv);
      betDiv.querySelector(".bet-input").disabled = true;
    }
  });
}
