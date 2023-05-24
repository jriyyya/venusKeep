export const SERVER_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:3131"
    : "deployment.com/api";
