import React from "react";
import Head from "next/head";
export const Header = ({ article }: any) => {
  return (
    <Head>
      <title>{article.title}</title>
      <meta name="description" content={article.subtitle} />
      <meta name="keywords" content={article.title} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.subtitle} />
      <meta property="og:image" content={article.headerImg.url} />
      <meta
        property="og:url"
        content={process.env.BASE_URL! + `/article/${article.articleId}`}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={article.subtitle} />
      <meta name="twitter:image" content={article.headerImg.url} />
    </Head>
  );
};
