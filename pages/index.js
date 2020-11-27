import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home({blogs}) {
  return (
    <Layout title="HOME">
      <p>このページはHOMEです。</p>
      <div>
        {blogs.map(blog => (
          <React.Fragment key={blog.id}>
            <Link href="/blog/[id]" as={`blog/${blog.id}`}>
              <a>
                <h2>{blog.title}</h2>
              </a>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(process.env.CMS_API_URL, key)
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      blogs: data.contents,
    }
  }
};
