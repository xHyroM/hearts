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
        <link rel="icon" href="/favicon.ico" />
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
    </div>
  )
}

export default Home
