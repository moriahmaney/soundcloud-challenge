'use client';
import { useState, useEffect } from 'react';

import styles from './page.module.css';
import Member from './components/Member';
import localFont from 'next/font/local';

const GoTFont = localFont({ src: '../public/fonts/game-of-thrones.ttf' });
const MasonSerif = localFont({ src: '../public/fonts/MasonSerif-Regular.ttf' });

async function getHouses() {
  const res = await fetch(`https://anapioficeandfire.com/api/houses/?page=1`);

  return res.json();
}

type House = {
  url: string,
  name: string
  swornMembers: string[]
}

export default async function Home() {
  const houses = await getHouses();
  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={GoTFont.className}>An Interface of Ice and Fire</h1>
      </div>
      <div className={styles.container}>
        {houses.map((house: House) => {
          return (
            <div key={house.name} className={[styles.card, MasonSerif.className].join(' ')}>
              <h1>{house.name}</h1>
              <ul className={styles.memberContainer}>
                {house.swornMembers.length === 0 && <p className={styles.text}>This house has no sworn members.</p>}
                {house.swornMembers.map((member) => {
                  return (
                    /* @ts-expect-error Server Component */
                    <Member url={member} key={member} />
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}
