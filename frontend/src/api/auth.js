import axios from "axios";

// Base URL of the backend server
const API_URL = "http://localhost:4400/api/auth";

/**
 * Register a new user.
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise} - Axios response containing the server's response.
 */
export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

/**
 * Log in an existing user.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise} - Axios response containing the token and user data.
 */
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

/**
 * Log out the user (if server-side logout is required).
 * This function is optional and can be omitted if logout is purely client-side.
 * @returns {Promise} - Axios response for logout request.
 */
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
