import { SERVER_URL } from "../config";

const bin = {
  async add(value: string) {
    const data = await fetch(`${SERVER_URL}/bin/add`, {
      body: JSON.stringify({ value: value }),
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    return await data.json();
  },
  async seek(index?: number) {
    const data = await fetch(`${SERVER_URL}/bin/seek/${index || ""}`, {
      method: "GET",
    });

    return await data.json();
  },
};

export default { bin };
