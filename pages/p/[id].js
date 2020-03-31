import Layout from '../../components/Layout';
import Markdown from 'react-markdown';

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <div className="markdown">
      <Markdown
        source={props.show.summary.replace(/<[/]?[pb]>/g, '')}
      />
    </div>
    <style jsx global>{`
        .markdown {
          font-family: 'Arial';
          font-size: 20;
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    <p>{}</p>
    {props.show.image ? <img src={props.show.image.medium} /> : null}
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;
