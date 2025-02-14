import React, { FC } from "react";
import Layout from "../components/layout";
import { Header } from "../components/blog/header";
import Link from "next/link";
import Head from "next/head";
import { Config } from "../components/blog/config";
import Tags from "../components/blog/tags";

const Blogs: FC = () => {
  const links = Config.map((v, i) => {
    return (
      <React.Fragment key={i}>
        <Tags tags={v.tags} />
        <Link href={v.link}>
          <a className="text-lg mb-8 ml-0">{v.title}</a>
        </Link>
      </React.Fragment>
    );
  });

  return (
    <Layout>
      <Head>
        <title>Blogs - Lachlan Stephan</title>
      </Head>
      <section>
        <Header title="This is a collection of writings and thoughts" />
        <aside className="flex flex-col">{links}</aside>
      </section>
    </Layout>
  );
};

export default Blogs;
