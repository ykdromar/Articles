import { toast } from "react-toastify";
import { useAuth } from "../configs/useAuth";
import { axiosInstance } from "./axiosConfig";
const Auth = () => {
  const [user, setUser, setLoading, setLikedArticles] = useAuth(
    (state: any) => [
      state.user,
      state.setUser,
      state.setLoading,
      state.setLikedArticles,
    ]
  );

  // Function to signup user
  const signup = async (data: any) => {
    setLoading(true);
    try {
      if (data.password !== data.confirm_password) {
        toast.error("Password & Confirm Password not match");
      }
      let response = await axiosInstance.post("/api/user/signup", data);
      let responseBody = response.data;
      if (responseBody.success == true) {
        setUser(responseBody.body.user);
        toast.success("Signed up successfully");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to signup");
    } finally {
      setLoading(false);
    }
  };

  // Function to login user
  const login = async (data: any) => {
    setLoading(true);
    try {
      let response = await axiosInstance.post("/api/user/login", data);
      let responseBody = response.data;
      if (responseBody.success == true) {
        setUser(responseBody.body.user);
        toast.success("Logged in successfully");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to signup");
    } finally {
      setLoading(false);
    }
  };

  // Function to Google Signup/Login of user
  const googleSignup = async (credentialResponse: any) => {
    setLoading(true);
    try {
      let response = await axiosInstance.post(
        "/api/user/googleSignin",
        credentialResponse
      );
      let responseBody = response.data;
      if (responseBody.success == true) {
        setUser(responseBody.body.user);
        toast.success("Logged in successfully");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to signup");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the user details
  const getUser = async () => {
    setLoading(true);
    try {
      let response = await axiosInstance.get("/api/user");
      let responseBody = response.data;
      if (responseBody.success == true) {
        setUser(responseBody.body.user);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Function to logout the user
  const logout = async () => {
    try {
      let response = await axiosInstance.get("/api/user/logout");
      let responseBody = response.data;
      if (responseBody.success == true) {
        setUser(null);
        setLikedArticles([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return {
    signup,
    login,
    googleSignup,
    getUser,
    logout,
  };
};

export default Auth;
