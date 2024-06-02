export const fetchCache = "force-no-store";
import { axiosInstance } from "./axiosConfig";

const EditorAPI = () => {
  // Get all the articles
  const allArticles = async () => {
    try {
      let res = await axiosInstance.get(`/api/editor/dashboard`);
      let body = res.data;
      return body;
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  // Publish an Article
  const publishAnArticle = async (id: String, newStatus: Boolean) => {
    try {
      let response = await axiosInstance.put("/api/editor/article", {
        _id: id,
        isPublished: newStatus,
        publishDate: Date.now(),
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  // Create new Article

  const createNewArticle = async (data: any) => {
    try {
      let response = await axiosInstance.post("/api/editor/article", data);
      return response.data;
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  // Update an Article
  const updateAnArticle = async (data: any) => {
    try {
      let response = await axiosInstance.put("/api/editor/article", data);
      return response.data;
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  return { allArticles, publishAnArticle, createNewArticle, updateAnArticle };
};

export default EditorAPI;
