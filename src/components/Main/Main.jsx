import React from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.css';

const cx = classNames.bind(styles);

export const Main = () => {
  const [allMemes, setAllMemes] = React.useState(undefined);
  const [meme, setMeme] = React.useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  });

  React.useEffect(() => {
    const getMeme = async () => {
      const data = await (await fetch('https://api.imgflip.com/get_memes')).json();

      setAllMemes(data.data.memes);
    };
    getMeme();
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);

    setMeme(prevState => {
      return { ...prevState, randomImage: allMemes[randomNumber].url };
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
