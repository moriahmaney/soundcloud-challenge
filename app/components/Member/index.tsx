import styles from './styles.module.css';
import localFont from 'next/font/local';

const MasonSerif = localFont({ src: '../../../public/fonts/MasonSerif-Regular.ttf' });


async function getMemberDetails(url: string) {
  const res = await fetch(url);

  return res.json();
}

type MemberProps = {
  url: string
}

export default async function Member({url}: MemberProps) {
  const member = await getMemberDetails(url);

  return (
    <li className={[styles.container, MasonSerif.className].join(' ')}>
      <h2 className={styles.heading}>{member.name}</h2>
      <p className={styles.text}>{member.died ? `Death: ${member.died}`: `Alive`}</p>
    </li>

  );
}
