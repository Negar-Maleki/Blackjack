import { state } from "./stateManager.js";
import { playerNameView } from "../views/nameView.js";

export function playersNum() {
  const playersNum = document.querySelector(".player-selection-input").value;
  state.initPlayers(playersNum);
  playerNameView();
}
