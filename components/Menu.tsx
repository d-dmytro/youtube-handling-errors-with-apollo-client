import React from 'react';
import Link from 'next/link';
import styles from './Menu.module.css';

const Menu = () => {
  return (
    <ul className={styles.menu}>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
