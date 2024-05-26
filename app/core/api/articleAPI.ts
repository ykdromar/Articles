import { axiosInstance } from "./axiosConfig";

const ArticleAPI = () => {
  // Get all the articles
  const getAllArticles = async () => {
    try {
      let res = await axiosInstance.get(`/api/article`);
      let body = res.data;
      return body;
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  // Get an article
  const getAnArticle = async (articleId: string) => {
    try {
      let res = await axiosInstance.get(`/api/article/${articleId}`);
      let body = res.data;
      return body;
    } catch (e) {
      return { success: false };
    }
  };

  return { getAllArticles, getAnArticle };
};

export default ArticleAPI;
