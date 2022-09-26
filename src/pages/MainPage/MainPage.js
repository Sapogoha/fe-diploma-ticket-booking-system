import React from 'react';
import Layout from '../../components/Layout/Layout';
import AboutUs from '../../components/AboutUs/AboutUs';
import Reviews from '../../components/Reviews/Reviews';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import MainSearchBlock from '../../components/MainSearchBlock/MainSearchBlock';

import styles from './MainPage.module.scss';

function MainPage() {
   const body = (
      <>
         <div id="about">
            <AboutUs />
         </div>
         <div id="how-it-works">
            <HowItWorks />
         </div>
         <div id="reviews">
            <Reviews />
         </div>
      </>
   );
   return (
      <Layout pic="main" body={body}>
         <div className={styles.wrapper}>
            <h1 className={styles.title}>
               Вся жизнь -{' '}
               <span className={styles['title-bold']}>путешествие!</span>
            </h1>
            <div className={styles.search}>
               <MainSearchBlock width="normal" />
            </div>
         </div>
      </Layout>
   );
}

export default MainPage;