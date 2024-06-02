export const fetchCache = "force-no-store";
import { useAuth } from "../configs/useAuth";
import { axiosInstance } from "./axiosConfig";

const LikeAPI = () => {
  const [setLikedArticles] = useAuth((state: any) => [state.setLikedArticles]);

  // Like an Article
  const likeAnArticle = async (id: String) => {
    try {
      let response = await axiosInstance.post("/api/article/like", {
        article: id,
      });
      let responseBody = response.data;
      return responseBody;
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  // Get all the articles liked by the user
  const fetchLikedArticles = async () => {
    try {
      let response = await axiosInstance.get("/api/article/like");
      let responseBody = response.data;
      if (responseBody.success == true) {
        setLikedArticles(responseBody.body);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { likeAnArticle, fetchLikedArticles };
};
export default LikeAPI;
