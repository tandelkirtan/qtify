import React from 'react';
import styles from './Navigation.module.css';

function RightNavigation() {
  return (
    <div className={`right-navigation ${styles.navigationButton} ${styles.rightNavigation}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19.5" fill="black" stroke="#34C94B"/>
        <path d="M17.5 14L23.5 20L17.5 26" stroke="#34C94B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export default RightNavigation;