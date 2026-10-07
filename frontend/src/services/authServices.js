import api from "./api";

// Login API
export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  console.log(response)

  return response.data;
};