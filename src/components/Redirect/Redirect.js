import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import styles from './Redirect.module.scss';

function Redirect({ mainText, btnText, link }) {
   const navigate = useNavigate();
   return (
      <>
         <div className={styles.text}>{mainText}</div>
         <div className={styles.buttonWrapper}>
            <button onClick={() => navigate(link)} type="button">
               {btnText}
            </button>
         </div>
      </>
   );
}

Redirect.propTypes = {
   mainText: PropTypes.string.isRequired,
   btnText: PropTypes.string.isRequired,
   link: PropTypes.string.isRequired,
};

export default Redirect;
