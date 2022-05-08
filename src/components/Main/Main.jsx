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

  const getMemeImage = () => {
    const memeArr = allMemeImages.data.memes;
    const randomNumber = Math.floor(Math.random() * memeArr.length);

    setMeme(prevState => {
      return { ...prevState, randomImage: memeArr[randomNumber].url };
    });
  };

  const handleChange = event => {
    setMeme(prevState => {
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
          value={meme.topText}
        />
        <input
          onChange={handleChange}
          className={styles.formInput}
          type="text"
          placeholder="Insert Bottom Text"
          name="bottomText"
          value={meme.bottomText}
        />
        <button onClick={getMemeImage} className={styles.formBtn}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className={styles.meme}>
        <p className={cx('memeText', 'top')}>{meme.topText}</p>
        <p className={cx('memeText', 'bottom')}>{meme.bottomText}</p>
        <img src={meme.randomImage} alt="Meme Image" className={styles.memeImage} />
      </div>
    </main>
  );
};
