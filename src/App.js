import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "./App.css";
import 'antd/dist/antd.css';
import SearchTable from './searchTable'

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (() => {
      fetch("https://api.publicapis.org/categories")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    })();
  }, []);

  const columns = [
    {
      title: "Name",
      key: 'Name',
      render: (data) => {
        return data
      },
      ...SearchTable('Name'),
    },
  ];

  return (
    <div className="App">
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(data) => data}
      ></Table>
    </div>
  );
}

export default App;
