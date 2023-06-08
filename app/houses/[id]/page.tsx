import Link from 'next/link';
import localFont from 'next/font/local';

import styles from './styles.module.css';
import Member from '../../components/Member';

const GoTFont = localFont({ src: '../../../public/fonts/game-of-thrones.ttf' });

type House = {
  url: string,
  name: string
  swornMembers: string[]
}

export default async function Page({ params }: { params: { id: string } }) {
  const previousPage = Number(params.id) - 1;
  const nextPage = Number(params.id) + 1;

  const res = await fetch(
    `https://anapioficeandfire.com/api/houses/?page=${params.id}`,
  );
  const data = (await res.json());

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={GoTFont.className}><Link href='/'>An Interface of Ice and Fire</Link></h1>
      </div>
      <div className={styles.container}>
        {data.map((house: House) => {
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
          {previousPage > 1 && <Link href={`houses/${previousPage}`}>Previous Page</Link>}
          {previousPage === 1 && <Link href={`/`}>Previous Page</Link>}
          <Link href={`houses/${nextPage}`}>Next Page</Link>
        </div>

      </div>
  </main>
  );
}