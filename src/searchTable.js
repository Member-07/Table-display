import React, { useState, useRef } from "react";
import { Input, Button } from "antd";

const icon = (
  <svg width="24" height="24" fill-rule="evenodd" clip-rule="evenodd">
    <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
  </svg>
);

export const SearchTable = (data) => {
  const [searchText, setSearchText] = useState();
  const inputRef = useRef();
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const getColumnSearchProps = () => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={inputRef}
            placeholder={`Search ${[data]}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => {
              handleSearch(selectedKeys, confirm);
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => {
              handleSearch(selectedKeys, confirm);
            }}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            {"Search"}
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {"Reset"}
          </Button>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {icon}
      </div>
    ),
    onFilter: (value, record) => {
      return record.toString().toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: (visibles) => {
      if (visibles) {
        setTimeout(() => inputRef.current.select());
      }
    },
    render: (text) => <div>{text}</div>,
  });
  return getColumnSearchProps(data);
};

export default SearchTable;
