import { trpc } from "../utils/trpc";

export default function Home () {
  const { data, isLoading } = trpc.useQuery(["reports.get-all"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col p-8">
      <h2 className="text-2xl">Reports:</h2>
      {data.map((report) => {
        return (
          <div key={report.id}>
            {report.description}
          </div>
        );
      })}
    </div>
  )
}