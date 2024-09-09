import axios from "axios";
import { useNavigate } from "react-router-dom";
import userSession from "./userSession";

const useApi = () => {
  const navigate = useNavigate();

  const call = async (method, path, payload, isFormData = false) => {
    const url = `${import.meta.env.VITE_API_URL}${path}`;
    const headers = {
      "Content-Type": isFormData === false ? "application/json" : "multipart/form-data",
      Authorization: `Bearer ${userSession.token()}`,
    };

    const options = {
      method: method,
      headers: headers,
    };
    if (payload) {
      if (isFormData) {
        let formData = new FormData();
        Object.keys(payload).forEach((key) => {
          formData.append(key, payload[key]);
        });
        options.data = formData;
      } else {
        options.data = JSON.stringify(payload);
      }
    }

    try {
      const response = await axios({
        url: url,
        ...options,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`${error.response.status}: ${error.response.statusText}`);
        switch (error.response.status) {
          case 401:
          case 403:
            userSession.clearAuthSession();
            navigate("/login");
            break;
          // Add more cases as needed
          case 404:
            throw {
              status: error.response.status,
              message: error.response.data || "An error occurred",
            };
          case 422:
            throw {
              status: error.response.status,
              message: error.response.data || "An error occurred",
            };
          default:
            navigate("/error", {
              state: {
                status: error.response.status,
                message: error.response.data.message || "An error occurred",
              },
            });
            break;
        }
      } else {
        console.error("Error: ", error.message);
        navigate("/error", {
          state: {
            status: "Unknown",
            message: error.message || "An error occurred",
          },
        });
      }
      throw error;
    }
  };

  return {
    get: async (path, payload) => {
      return await call("GET", path, payload);
    },
    post: async (path, payload, isFormData) => {
      return await call("POST", path, payload, isFormData);
    },
    put: async (path, payload, isFormData) => {
      return await call("PUT", path, payload, isFormData);
    },
    delete: async (path, payload) => {
      return await call("DELETE", path, payload);
    },
  };
};

export default useApi;
