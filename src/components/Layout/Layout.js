import React from 'react';
import PropTypes from 'prop-types';

import HeaderNavigation from './Navigation/HeaderNavigation';
import Footer from './Footer/Footer';

import styles from './Layout.module.scss';

function Layout({ pic, children, body }) {
   return (
      <div className={styles.wrapper}>
         <div
            className={`${styles.wrapper__top} ${
               styles[`wrapper__top-${pic}`]
            }`}
         >
            <HeaderNavigation />
            {children}
         </div>
         {body}
         <Footer />
      </div>
   );
}

Layout.propTypes = {
   pic: PropTypes.string.isRequired,
   children: PropTypes.node.isRequired,
   body: PropTypes.element.isRequired,
};

export default Layout;
