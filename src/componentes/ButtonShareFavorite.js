import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function ButtonShareFavorite() {
  const { location } = useHistory();
  const [copyUrl, setCopy] = useState(false);

  const handleShareBtn = async () => {
    const TIME = 2000;
    const urlCopied = `http://localhost:3000${location.pathname}`;
    setCopy(true);
    await copy(urlCopied);
    setTimeout(() => setCopy(false), TIME);
    console.log(copy(urlCopied));
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      </button>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareBtn }
      >
        <img src={ shareIcon } alt="shareicon" />
      </button>
      {copyUrl && <span>Link copied!</span>}
    </div>
  );
}
