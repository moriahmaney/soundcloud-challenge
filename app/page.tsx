import Link from 'next/link';
import localFont from 'next/font/local';

import styles from './page.module.css';
import Member from './components/Member';

const GoTFont = localFont({ src: '../public/fonts/game-of-thrones.ttf' });

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
        <h1 className={GoTFont.className}><Link href='/'>An Interface of Ice and Fire</Link></h1>
      </div>
      <div className={styles.container}>
        {houses.map((house: House) => {
          return (
            <div key={house.name} className={styles.card}>
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
        <div className={styles.navContainer}>
          <Link href={`houses/2`}>Next Page</Link>
        </div>
      </div>
    </main>
  );
}
