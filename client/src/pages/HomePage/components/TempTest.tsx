import { useRef, useState } from "react";
import api from "../../../utils/api";

export default function TempTest() {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [response, setResponse] = useState<{
    index?: number;
    value?: string;
    error?: string;
    bin?: string[];
  }>();

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <div className="flex gap-x-5">
          <input
            type="text"
            className="border border-black px-2"
            ref={inputRef}
          />
          <button
            className="bg-teal-500 rounded-md px-6 py-2 text-white"
            onClick={async () => {
              setResponse(await api.bin.add(inputRef.current.value));
            }}
          >
            Add
          </button>

          <button
            className="bg-teal-500 rounded-md px-6 py-2 text-white"
            onClick={async () => {
              const index = Number(inputRef.current.value);
              index
                ? setResponse(await api.bin.seek(index))
                : setResponse({ error: "index can only be a number" });
            }}
          >
            Search
          </button>
        </div>
        <div className="">
          <button
            className="bg-blue-500 rounded-md px-6 py-2 text-white"
            onClick={async () => {
              setResponse(await api.bin.seek());
            }}
          >
            List All
          </button>
        </div>
      </div>
      <div className="my-12 p-1">
        {response && (
          <>
            {response.index && (
              <p className="bg-[#33aa4545] p-4 rounded-md">
                New Data added at index {response.index}
              </p>
            )}
            {response.value && (
              <p className="bg-[#3344a545] p-4 rounded-md">
                Data at index {inputRef.current.value} is : {response.value}
              </p>
            )}
            {response.error && (
              <p className="bg-[#d3234545] p-4 rounded-md">
                Error : {response.error}
              </p>
            )}
            {response.bin && (
              <p className="bg-[#c7d32345] p-4 rounded-md">
                Here is your whole bin : <br /> <br />
                {response.bin.map((item, index) => (
                  <p key={index} className="border-b border-slate-600 py-2">
                    <b>{index + 1}</b>. {item}
                  </p>
                ))}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
