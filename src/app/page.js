"use client";
import { GET_REPORTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Table } from "antd";
import { useUser } from "@auth0/nextjs-auth0/client";
import ClipLoader from "react-spinners/ClipLoader";
import { GridLoader, MoonLoader, PulseLoader } from "react-spinners";


const ReportsTable = () => {

  const columns1 = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'operations',
      render: () => <a href="#">Delete</a>,
    },
  ];
  
  const override= {
    display: "block",
    margin: "15% auto",
    borderColor: "green",
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive:['md'],
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      responsive:['lg'],
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Body Part",
      dataIndex: "injuries",
      key: "body_part",
      render: (text, record) =>
        text.map((injury) => injury.body_part).join(", "),
    },
    {
      title: "Description",
      dataIndex: "injuries",
      key: "description",
      render: (text, record) =>
        text.map((injury) => injury.description).join(", "),
    }
  ];
  const { data, loading, error } = useQuery(GET_REPORTS);
  const { user, isLoading } = useUser();

  if (loading || isLoading) {
    return <MoonLoader
    color="green"
    loading={true}
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  }
  if (error) {
    return <h1>Error: ${error}</h1>;
  }
  if (!data) {
    return <h1>Failed to fetch data</h1>;
  }
  return (
    <div className="md:p-20 md:pb-0 p-5">
        <Table
          dataSource={data.allReports}
          columns={columns}
          pagination={false}
          mobileBreakPoint={768}
          bordered={true}
        />
    </div>
  );
};

export default ReportsTable;