import { SERVER_URL } from "../config";
import useAuth from "../contexts/AuthContext";

const bin = {
  async add(id: string | null, value: string) {
    const data = await fetch(`${SERVER_URL}/bin/${id}/add`, {
      body: JSON.stringify({ value: value }),
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    return await data.json();
  },
  async seek(id: string | null, index?: number) {
    if (index == 0) {
      const data = await fetch(`${SERVER_URL}/bin/${id}/seek/${index}`, {
        method: "GET",
      });
      return await data.json();
    } else {
      const data = await fetch(`${SERVER_URL}/bin/${id}/seek/${index || ""}`, {
        method: "GET",
      });
      return await data.json();
    }
  },
};

export default { bin };
