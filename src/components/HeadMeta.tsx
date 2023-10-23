import Head from "next/head";

const HeadMeta = () => {
  return (
    <Head>
      <title>3X3 PER DAY</title>
      <meta
        name="description"
        content={
          "하루에 3가지의 목표를 달성하세요"
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={"매일 3가지의 성취를 경험하세요"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={"https://3x3perday.vercel.app"} />
      {/* <meta property="og:image" content={image} /> */}
      <meta property="og:article:author" content="3X3 PER DAY" />
    </Head>
  );
};

export default HeadMeta;
