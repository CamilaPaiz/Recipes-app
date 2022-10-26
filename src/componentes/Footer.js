import React from 'react';
import { useHistory } from 'react-router-dom';
import '../style/footer.css';

function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className="footer">
      <h1>Footer</h1>
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src="../images/drinkIcon.svg"
          alt="Drink"
        />
      </button>
      <button type="button" onClick={ () => history.push('/meals') }>
        <img
          data-testid="meals-bottom-btn"
          src="../images/mealIcon.svg"
          alt="Meals"
        />
      </button>
    </div>
  );
}

export default Footer;
