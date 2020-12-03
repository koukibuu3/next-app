import Layout from '../../components/Layout';

export default function blogId({blog}) {
  return (
    <Layout title="BLOG">
      <p>このページはBLOGです。</p>
      {/* MEMO 存在チェック入れないとbuildが成功しない */}
      { blog && (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.publishedAt}</p>
          <p>{blog.introduction}</p>
        </div>
      )}
    </Layout>
  );
}

export const getStaticPaths = async () => {
  let paths = [];

  if (process.env.BLOG_ID) {
    // MEMO 環境変数に値がセットされていた場合、その記事のみをビルド対象記事にする
    paths = [`/blog/${process.env.BLOG_ID}`];
  } else {
    const key = {
      headers: {'X-API-KEY': process.env.CMS_API_KEY},
    };
    const data = await fetch(process.env.CMS_API_URL, key)
      .then(res => res.json())
      .catch(() => null);
    paths = data.contents.map(content => `/blog/${content.id}`);
  }

  // fallbackを false にすると事前に生成しておいたPathしかアクセスできなくなる
  return {paths, fallback: false};
}

export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.CMS_API_KEY},
  };
  const data = await fetch(`${process.env.CMS_API_URL}/${id}`, key)
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      blog: data,
    },
  };
}
