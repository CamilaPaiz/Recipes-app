import React from 'react';
import { useHistory } from 'react-router-dom';
import '../style/footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import meallIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          className="drinkicon"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drink"
        />
      </button>
      <button type="button" onClick={ () => history.push('/meals') }>
        <img
          className="mealsicon"
          data-testid="meals-bottom-btn"
          src={ meallIcon }
          alt="Meals"
        />
      </button>
    </div>
  );
}

export default Footer;
