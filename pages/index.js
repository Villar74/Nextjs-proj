import Layout from '../components/Layout';
import Link from 'next/link';
import 'isomorphic-unfetch';
import useSWR from 'swr';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Index() {
  const {data, error} = useSWR('https://api.tvmaze.com/search/shows?q=batman', fetcher);
  // The following line has optional chaining, added in Next.js v9.1.5,
  // is the same as `data && data.author`
  console.log(data)
  let shows = [], emptyData = '';
  if (data){
    emptyData = '';
    shows = data.map(entry => entry.show)
  } else {
    emptyData = 'Loading...';
  }

  if (error) emptyData = 'Failed to fetch the quote.';

  return (
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <Link href="/p/[id]" as={`/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <p>{emptyData}</p>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>)
}
