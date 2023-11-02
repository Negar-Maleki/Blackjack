"use strict";
import { cardInfo } from "./cardInfo.js";
import * as arrayHelper from "../utilities/arrayHelp.js";

export class Card {
  constructor(value = "A", suit = "❤") {
    this.value = value;
    this.suit = suit;
  }

  toString() {
    return this.value + this.suit;
  }

  get imgAdd() {
    const imgValue = arrayHelper.mapValue(
      cardInfo.values,
      cardInfo.imgValues,
      this.value
    );
    const imgSuit = arrayHelper.mapValue(
      cardInfo.suits,
      cardInfo.imgSuits,
      this.suit
    );
    if (["J", "Q", "K"].includes(this.value)) {
      return `${cardInfo.imgFolder}${imgValue}_of_${imgSuit}2.svg`;
    }
    return `${cardInfo.imgFolder}${imgValue}_of_${imgSuit}.svg`;
  }
}

export class DeckSet {
  constructor(numberOfDecks = 6) {
    this.numberOfDecks = numberOfDecks;
    this.initDeck(numberOfDecks);
  }

  initDeck(numberOfDecks) {
    const cardSet = DeckSet.createDeck();

    this.cards = arrayHelper.makeCopies(cardSet, numberOfDecks);
    this.cards = arrayHelper.shuffle(this.cards);
  }

  static createDeck() {
    let cardSet = [];
    for (const value of cardInfo.values) {
      for (const suit of cardInfo.suits) {
        cardSet.push(new Card(value, suit));
      }
    }
    return cardSet;
  }

  drawCards(i = 2) {
    if (this.cards.length < i) {
      this.initDeck(this.numberOfDecks);
    }
    return this.cards.splice(0, i);
  }
}
