import type { NextPage } from 'next';
import Head from 'next/head';
import { Table } from 'react-bootstrap';
import absoluteUrl from 'next-absolute-url';
import styles from '../styles/Home.module.css';

export const getServerSideProps = async(ctx: any) => {
	const res = await fetch(`${absoluteUrl(ctx.req).origin}/api/hearts`, { method: 'GET' }).then((res) => res.json());

	return { props: { data: res }};
};

const Home: NextPage = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trospy SMP</title>
        <meta name="description" content="Srdíčka" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <b>TrospySMP - Srdíčka</b>
        </h1>
        
        <div>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>UUID</th>
                <th>NAME</th>
                <th>HEARTS</th>
              </tr>
            </thead>
            <tbody>
              { data.message.map((data: any) =>
                <>
                  <tr key={data.UUID}>
                    <td>{data.UUID}</td>
                    <td>{data.USERNAME}</td>
                    <td>{data.PARSED_HEARTS}</td>
                  </tr>
                </>
                )
              }
            </tbody>
          </Table>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with&nbsp;&nbsp;<img src="https://cdn.discordapp.com/emojis/870042189869248543.gif?size=96&quality=lossless" alt="Heart" className="logo" width='35px' />&nbsp;&nbsp;
          <b>by Hyro & Heny</b><br>
	 Srdíčka se updatují každou půl hodinu.
        </a>
      </footer>
    </div>
  )
}

export default Home
