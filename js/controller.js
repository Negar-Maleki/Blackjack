"use strict";

import { eventManager } from "./controllers/playGame.js";
import { playersNum } from "./controllers/startPage.js";
import { nameDoneBtn } from "./controllers/namePage.js";
import { betDoneBtn } from "./controllers/betPage.js";

document
  .querySelector(".playing-btn-hit")
  .addEventListener("click", eventManager.hitEvent.bind(eventManager));
document
  .querySelector(".playing-btn-stay")
  .addEventListener("click", eventManager.stayEvent.bind(eventManager));

document
  .querySelector(".playing-btn-double")
  .addEventListener("click", eventManager.doubleEvent.bind(eventManager));

document
  .querySelector(".next-round-btn")
  .addEventListener("click", eventManager.nextRoundEvent.bind(eventManager));

document.querySelector(".play-btn").addEventListener("click", playersNum);

document.querySelector(".name-done-btn").addEventListener("click", nameDoneBtn);

document.querySelector(".bet-btn").addEventListener("click", betDoneBtn);
