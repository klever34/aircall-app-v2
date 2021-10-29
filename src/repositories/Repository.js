import axios from "axios";
import { BASE_URL } from "../constants";

export const customHeaders = {
  Accept: "application/json",
};

export const baseUrl = `${BASE_URL}`;

export default axios.create({
  BASE_URL,
  headers: customHeaders,
});
