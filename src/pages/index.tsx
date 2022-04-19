import { trpc } from "~/utils/trpc";
import React from "react";

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["reports.get-all"]);
  const client = trpc.useContext();
  const { mutate } = trpc.useMutation("reports.create", {
    onSuccess: (data) => {
      console.log("created with:", data);
      client.invalidateQueries(["reports.get-all"]);
    },
  });

  if (isLoading || !data) return <div>Loading...</div>;

  console.log(data);
  return (
    <div className="flex flex-col p-8">
      <div className="">
        <h2 className="text-2xl">Reports:</h2>
        {data.map((report) => {
          return <div key={report.id}>{report.description}</div>;
        })}
      </div>
      <div className="">
        <button
          className=""
          onClick={() => {
            const values = ["temperature", "humidity"].map((type) => {
              const value = Math.random() * 100;
              return { type, value };
            });
            mutate({
              measurements: values,
              description: "Sunny Weather Today!",
            });
          }}
        >
          Create report
        </button>
      </div>
    </div>
  );
}
