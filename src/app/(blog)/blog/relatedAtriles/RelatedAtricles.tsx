import React from "react";

const RelatedArticles = () => {
  const articles = [
    {
      title: "Article 1",
      description: "This is article 1",
      link: "/article-1",
    },
    {
      title: "Article 2",
      description: "This is article 2",
      link: "/article-2",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Related Articles</h2>
      {articles.map((article, index) => (
        <div key={index} className="p-4 border rounded-md">
          <h3 className="text-xl font-semibold">{article.title}</h3>
          <p className="text-gray-600">{article.description}</p>
          <a href={article.link} className="text-blue-500 hover:underline">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};
export default RelatedArticles;
