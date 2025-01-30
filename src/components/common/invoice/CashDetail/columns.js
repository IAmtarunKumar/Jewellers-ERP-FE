import { StyledHeader } from "common/constant/constant";
import React, { useState } from "react";

const Columns = (updateData, deleteData) => {
  const [editingId, setEditingId] = useState(null);

  const EditableCell = ({ row, column, updateData }) => {
    const isEditing = editingId === row.id;
    const handleBlur = (e) => {
      if (
        (column.selector === "date" ||
          column.selector === "givenTo" ||
          column.selector === "amount") &&
        (!e.target.value || e.target.value === "0" || e.target.value === "")
      ) {
        alert(`${column.selector} cannot be 0 or empty.`);
        return;
      }

      updateData(row.id, column.selector, e.target.value);
      setEditingId(null);
    };
    const inputType = column.selector === "date" ? "date" : "text";
    return isEditing ? (
      <input
      type={inputType}
        className="form-control"
        defaultValue={row[column.selector]}
        onBlur={handleBlur}
      />
    ) : (
      <span>{row[column.selector]}</span>
    );
  };
  const ActionButton = ({ row, deleteData }) => (
    <>
      <button
        className="btn btn-primary px-2 py-1 mr-2"
        onClick={() =>
          setEditingId((prev) => (prev === row.id ? null : row.id))
        }
      >
        {editingId === row.id ? (
          <i className="fa fa-bookmark" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-pencil" aria-hidden="true"></i>
        )}
      </button>
      <button
        className="btn btn-danger px-2 py-1"
        onClick={() => deleteData(row.id)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </>
  );

  return [
    {
      name: <StyledHeader>Id</StyledHeader>,
      cell: (row) => row.id,
    },
    {
      name: <StyledHeader>Amount</StyledHeader>,
      cell: (row, index) => (
        <EditableCell
          row={row}
          column={{ selector: "amount" }}
          updateData={updateData}
        />
      ),
    },
    {
      name: <StyledHeader>Given To</StyledHeader>,
      cell: (row, index) => (
        <EditableCell
          row={row}
          column={{ selector: "givenTo" }}
          updateData={updateData}
        />
      ),
      sortable: true,
    },
    {
      name: <StyledHeader>Date</StyledHeader>,
      cell: (row, index) => (
        <EditableCell
          row={row}
          column={{ selector: "date" }}
          updateData={updateData}
        />
      ),
      sortable: true,
    },
    {
      name: <StyledHeader>Action</StyledHeader>,
      cell: (row) => <ActionButton row={row} deleteData={deleteData} />,
    },
  ];
};

export default Columns;
