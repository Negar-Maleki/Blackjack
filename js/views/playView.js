import * as helper from "../utilities/helper.js";
import { state } from "../controllers/stateManager.js";
import { betView } from "./betView.js";

const playerMainDiv = document.querySelector(".players-main-div");

const dealerCardImgs = document.querySelectorAll(".dealer-cards-img");
const playingBtns = document.querySelectorAll([
  ".playing-btn-double",
  ".playing-btn-stay",
  ".playing-btn-hit",
]);

export function playView() {
  helper.unhide(".game-main-div");
  helper.hide(".bet-main-div");
  helper.unhide(".playing-btn-div");

  dealerCardImgs[0].src = "assets/img/Playing Cards/SVG-cards-1.3/back.svg";
  dealerCardImgs[1].src = state.dealer.hand[1].imgAdd;

  document.querySelectorAll(".card-player").forEach((cardDiv, i) => {
    cardDiv
      .querySelectorAll(".card-img")
      .forEach((img, j) => (img.src = state.players[i].hand[j].imgAdd));
  });

  document.querySelectorAll(".player-section").forEach((playerSec, i) => {
    if (i == 0) helper.activate(playerSec);
    else helper.deactivate(playerSec);
  });

  const elementClassArr = [".player-name-label", ".bet-value", ".bank"];
  const objectElementArr = ["name", "bet", "bank"];

  for (let i = 0; i < state.numPlayers; i++) {
    for (let m = 0; m < elementClassArr.length; m++) {
      const element = helper.getElement([
        ".players-main-div",
        `.player--${i}`,
        elementClassArr[m],
      ]);
      element.textContent = state.players[i][objectElementArr[m]];
    }
  }
}

export const view = {
  hitEventView: function () {
    const cardAddress = state.activePlayer.hand.slice(-1)[0].imgAdd;

    const newImg = document.createElement("img");
    newImg.src = cardAddress;
    newImg.classList.add("player-cards-img", "card-img", "card-img-2");
    const playerCardDiv = document.querySelectorAll(".card-player");
    playerCardDiv[state.activePlayerId].appendChild(newImg);
  },

  updateBankView: function () {
    for (let i = 0; i < state.numPlayers; i++)
      helper.getElement([
        ".players-main-div",
        `.player--${i}`,
        ".bank",
      ]).textContent = state.players[i].bank;
  },
  updateBetView: function () {
    for (let i = 0; i < state.numPlayers; i++)
      helper.getElement([
        ".players-main-div",
        `.player--${i}`,
        ".bet-value   ",
      ]).textContent = state.players[i].bet;
  },
  doubleView: function () {
    this.updateBankView();
    this.updateBetView();

    switchPlayer();
  },
  stayEventView: function () {
    switchPlayer();
  },

  dealerEventView: function () {
    dealerCardImgs[0].src = state.dealer.hand[0].imgAdd;
    for (let i = 0; i < state.dealer.hand.length - 2; i++) {
      const dealerCardDiv = document.querySelector(".card-dealer");
      const newImg = document.createElement("img");
      const cardAddress = state.dealer.hand[i + 2].imgAdd;
      newImg.src = cardAddress;
      newImg.classList.add("dealer-cards-img", "card-img", "card-img-2");
      dealerCardDiv.appendChild(newImg);
    }
  },

  nextRoundView: function () {
    this.resetView();
    betView();
    helper.hide(".playing-btn-div");
    helper.hide(".game-main-div");
    helper.hide(".next-round-btn");
    playingBtns.forEach((playingBtn) => (playingBtn.disabled = false));
  },

  gameEndView: function () {
    showEndMessage();
    helper.unhide(".next-round-btn");
    for (const btn of playingBtns) btn.disabled = true;

    this.updateBankView();

    document
      .querySelectorAll(".player-section")
      .forEach((playerSec) => helper.activate(playerSec));
  },

  resetView: function () {
    const playersCards = [
      ...document.querySelectorAll(".card-player"),
      document.querySelector(".card-dealer"),
    ];

    playersCards.forEach((playerDiv) => {
      playerDiv.querySelectorAll(".card-img").forEach(function (card, i) {
        if (i > 1) card.remove();
      });
    });
    const message = document.querySelectorAll(".message");

    message.forEach((msg) => (msg.innerHTML = "&nbsp;"));
  },
};

function showEndMessage() {
  const messageArr = document.querySelectorAll(".message");
  messageArr.forEach(
    (message, i) => (message.textContent = state.players[i].endMessage())
  );
}

function switchPlayer() {
  if (state.numPlayers > 1 && !state.isLastPlayer) {
    const curPlayer = playerMainDiv.querySelector(
      `.player--${state.activePlayerId}`
    );
    const nextPlayer = playerMainDiv.querySelector(
      `.player--${state.activePlayerId + 1}`
    );

    helper.deactivate(curPlayer);
    helper.activate(nextPlayer);
  }
}
