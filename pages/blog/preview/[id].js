import Layout from '../../../components/Layout';

export default function blogId({blog}) {
  return (
    <Layout title="PREVIEW">
      <p>このページはPREVIEWです。</p>
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.publishedAt}</p>
        <p>{blog.introduction}</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async context => {
  const id = context.params.id;
  const { draftKey } = context.query;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(`${process.env.CMS_API_URL}/${id}?draftKey=${draftKey}`, key)
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      blog: data,
    },
  };
}
