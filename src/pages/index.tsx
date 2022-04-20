import { trpc } from "~/utils/trpc";
import { InferQueryOutput } from "~/utils/trpc";
import React from "react";
import { format } from "date-fns";
import { WEATHER_IMAGES, MEASUREMENT_TYPES_IMAGES } from "~/utils/constants";
import { round } from "~/utils/util-fns";
/**
 * Workflow:
 * In memory:
 *  - initialize report
 *  - take in measurements
 *  - when done, call mutation
 * - Create report in db
 * -
 **/

type ReportFromServer = InferQueryOutput<"report.get-all">[0];

const ReportListing: React.FC<{ report: ReportFromServer }> = ({ report }) => {
  const img =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Circle-icons-weather.svg/512px-Circle-icons-weather.svg.png";
  const typeImg =
    "https://cdn4.vectorstock.com/i/1000x1000/34/23/thermometer-sun-heat-temperature-icon-vector-22773423.jpg";
  return (
    <div className="flex p-4">
      <div className="w-24 flex items-center justify-center">
        {format(report.createdAt, "MMM d HH:mm")}
      </div>
      <div className="w-12 aspect-square flex items-center mx-5">
        <img src={img} alt={report.description} />
      </div>
      {report.measurement.map((m, idx) => {
        return (
          <div key={idx} className="flex items-center w-32 ml-5">
            <div className="w-12 aspect-square">
              <img src={typeImg} alt={m.type} />
            </div>
            <div className="px-4">{round(m.value, 1)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default function Home() {
  const { data: reports, isLoading } = trpc.useQuery(["report.get-all"]);
  if (isLoading || !reports) return <div>Loading...</div>;

  return (
    <div className="flex flex-col p-8">
      <div className="bg-gray-200 p-4 rounded-xl">
        <h2 className="text-2xl font-semibold ml-5 mt-5">Latest reports</h2>
        {reports.map((report) => {
          return <ReportListing key={report.id} report={report} />;
        })}
      </div>
    </div>
  );
}
