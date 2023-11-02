"use client";
import { GET_REPORTER_ANALYTICS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import {
  Bar,
  BarChart,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MoonLoader } from "react-spinners";



const page = () => {
  const { data, loading, error } = useQuery(GET_REPORTER_ANALYTICS);
  const override= {
    display: "block",
    margin: "15% auto",
    borderColor: "green",
  };
  if(error){
    return(
      <h1>{error}</h1>
    )
  }
  return loading ? (
    <MoonLoader
    color="green"
    loading={true}
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  ) : (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center md:p-10 lg:p-20">
        <div className="flex items-center flex-col gap-10">
          <h1 className="">Reporters by Count of Reports</h1>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data.analyticsData.reporterData}
              {...{
                overflow: "visible",
              }}
            >
              <XAxis dataKey="reporter">
                <Label
                  value={"Reporter"}
                  offset={5}
                  position={"bottom"}
                  style={{
                    fill: "white",
                  }}
                />
              </XAxis>
              <YAxis />
              <Tooltip />
              <Bar dataKey="noOfReports" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div> 
        <div className="flex items-center flex-col gap-10">
          <h1>Date by Count of Reports</h1>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data.analyticsData.dateData}
              {...{
                overflow: "visible",
              }}
            >
              <XAxis dataKey="date">
                <Label
                  value={"Date (YYYY-MM-DD)"}
                  style={{
                    fill: "white",
                  }}
                  offset={5}
                  position={"bottom"}
                />
              </XAxis>
              <YAxis />
              <Tooltip />
              <Line dataKey="noOfReports" fill="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center flex-col gap-10">
          <h1>Count of Reports by body part</h1>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart
              {...{
                overflow: "visible",
              }}
            >
              <Tooltip />
              <Pie
                data={data.analyticsData.injuryData}
                dataKey="noOfReports"
                nameKey="body_part"
                fill="#1E2F97"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default page;
