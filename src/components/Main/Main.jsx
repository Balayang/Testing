import React from 'react';
import classNames from 'classnames/bind';
import memesData from '../data/memesData';
import styles from './Main.module.css';

const cx = classNames.bind(styles);

export const Main = () => {
  const [meme, setMeme] = React.useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  });
  const [allMemeImages] = React.useState(memesData);
  const [inputData, setInputData] = React.useState({
    topText: '',
    bottomText: '',
  });

  const getMemeImage = () => {
    const memeArr = allMemeImages.data.memes;
    const randomNumber = Math.floor(Math.random() * memeArr.length);

    setMeme(prevState => {
      return { ...prevState, randomImage: memeArr[randomNumber].url };
    });
  };

  const handleChange = event => {
    setInputData(prevState => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <input
          onChange={handleChange}
          className={styles.formInput}
          placeholder="Insert Top Text"
          type="text"
          name="topText"
          value={inputData.topText}
        />
        <input
          onChange={handleChange}
          className={styles.formInput}
          type="text"
          placeholder="Insert Bottom Text"
          name="bottomText"
          value={inputData.bottomText}
        />
        <button onClick={getMemeImage} className={styles.formBtn}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className={styles.meme}>
        <p className={cx('memeText', 'top')}>{inputData.topText}</p>
        <p className={cx('memeText', 'bottom')}>{inputData.bottomText}</p>
        <img src={meme.randomImage} alt="Meme Image" className={styles.memeImage} />
      </div>
    </main>
  );
};
