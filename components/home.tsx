import { FC } from "react";
// import { Texts } from "../components/texts";
// import { textContent } from "../components/textsContent";
import { CommitChart } from "../components/commits/commitChart";
import { Interests } from "../components/interests/interests";
import { About } from "../components/about";
import Head from "next/head";
import Layout from "../components/layout";

// interface textStuff {
// title: string;
// content: string;
// }

export const Home: FC = () => {
  // const texts: textStuff[] = textContent;

  // const textsList = texts.map((val, index) => {
  // return <Texts key={index} title={val.title} text={val.content} />;
  // });

  // Implement if I want about sections
  // <h2 className="text-lg font-bold">About</h2>
  // <br />
  // {textsList}

  return (
    <Layout>
      <Head>
        <title>Home - Lachlan Stephan</title>
      </Head>
      <div className="overflow-hidden">
        <About
          name="Lachlan Stephan"
          desc="Trying to be a decent developer."
        />
        <Interests title="Current interests" />
        <CommitChart />
      </div>
    </Layout>
  );
};
