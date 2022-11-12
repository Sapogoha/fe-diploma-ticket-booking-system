import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import links from '../../data/links';

import styles from './Error.module.scss';

function Error() {
   const navigate = useNavigate();
   const title = useRef(document.createElement('section'));
   useEffect(() => {
      title.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
   }, []);
   return (
      <section ref={title}>
         <h2 className={styles.text}>Извините, такая страница не найдена</h2>
         <div className={styles.buttonWrapper}>
            <button onClick={() => navigate(links.main)} type="button">
               на главную
            </button>
         </div>
      </section>
   );
}

export default Error;
