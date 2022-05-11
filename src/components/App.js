import React from 'react';
import Confetti from 'react-confetti';

import { nanoid } from 'nanoid';

import './../styles/global.css';

import { Die } from './Die/Die';

export const App = () => {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolledTimes, setRolledTimes] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(() =>
    JSON.parse(localStorage.getItem('bestScore'))
  );
  React.useEffect(() => {
    localStorage.setItem('bestScore', JSON.stringify(bestScore));
  }, [bestScore]);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSameValues = dice.every(die => die.value === dice[0].value);

    if (allHeld === true && allSameValues) {
      setTenzies(true);
      if (bestScore === 0) {
        setBestScore(rolledTimes);
      } else if (bestScore > rolledTimes && bestScore !== 0) {
        setBestScore(rolledTimes);
      }
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  const rollDice = () => {
    if (!tenzies) {
      setDice(prevState =>
        prevState.map(die => {
          return !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die;
        })
      );
      setRolledTimes(prevValue => prevValue + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice);
      setRolledTimes(0);
    }
  };

  const holdDice = id => {
    setDice(prevState =>
      prevState.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const diceElements = dice.map(die => (
    <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <div className="gameBoard">
        <h1>Tenzies</h1>
        <p className="description">
          Roll until all dice are the same. Click each die to freeze it at its current value between
          rolls.
        </p>
        <div className="tiles">{diceElements}</div>
        <button className="rollBtn" onClick={rollDice}>
          {tenzies ? 'Again' : 'Roll'}
        </button>
      </div>
      <div className="score">
        <h3>Moves: {rolledTimes}</h3>
        <div className="bestScore">
          <h3>Best Score: {bestScore}</h3>
          <h3 className="restartScore" onClick={() => setBestScore(0)}>
            ↺
          </h3>
        </div>
      </div>
    </div>
  );
};
