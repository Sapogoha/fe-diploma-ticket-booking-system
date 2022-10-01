import React from 'react';
import PropTypes from 'prop-types';

import HeaderNavigation from './Navigation/HeaderNavigation';
import Footer from './Footer/Footer';

import styles from './Layout.module.scss';

function Layout({ pic, children, body }) {
   return (
      <div className={styles.wrapper}>
         <header className={`${styles.header} ${styles[`header-${pic}`]}`}>
            <HeaderNavigation />
            {children}
         </header>
         <main>{body}</main>
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
