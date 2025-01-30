import { StyledHeader } from "common/constant/constant";
import React, { useState } from "react";
import "./repairInvoice.css";

const RepairInvoiceColumns = (updateData, deleteData) => {
  const [editingId, setEditingId] = useState(null);
  const purityOptions = [
    { value: "24k", label: "24k" },
    { value: "22k", label: "22k" },
    { value: "18k", label: "18k" },
    { value: "14k", label: "14k" },
    { value: "10k", label: "10k" },
  ];

  const EditableCell = ({ row, column, updateData, options }) => {
    const isEditing = editingId === row.productName;
    const handleBlur = (e) => {
      if (
        (column.selector === "rate" ||
          column.selector === "productName" ||
          column.selector === "weight") &&
        (!e.target.value || e.target.value === "0" || e.target.value === "")
      ) {
        alert(`${column.selector} cannot be 0 or empty.`);
        return;
      }

      updateData(row.productName, column.selector, e.target.value);
      setEditingId(null);
    };

    if (options && isEditing) {
      return (
        <select
          defaultValue={row[column.selector]}
          className="form-control"
          onBlur={(e) => {
            updateData(row.productName, column.selector, e.target.value);
            setEditingId(null);
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return isEditing ? (
      <input
        type="text"
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
          setEditingId((prev) =>
            prev === row.productName ? null : row.productName
          )
        }
      >
        {editingId === row.productName ? (
          <i className="fa fa-bookmark" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-pencil" aria-hidden="true"></i>
        )}
      </button>
      <button
        className="btn btn-danger px-2 py-1"
        onClick={() => deleteData(row.productName)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </>
  );
  const imageRenderer = (row) => {
    return <img src={row.imageURL} alt="item" width={50} height={50} />;
  };
  return [
    {
      name: <StyledHeader>Product Image</StyledHeader>,
      selector: "imageURL",
      cell: (row) => imageRenderer(row),
      sortable: false,
    },
    {
      name: <StyledHeader>Product Name</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "productName" }}
          updateData={updateData}
        />
      ),
    },
    {
      name: <StyledHeader>Purity</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "purity" }}
          updateData={updateData}
          options={purityOptions}
        />
      ),
      sortable: true,
    },
    {
      name: <StyledHeader>Weight</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "weight" }}
          updateData={updateData}
        />
      ),

      sortable: true,
    },

    {
      name: <StyledHeader>Cost</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "rate" }}
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

export default RepairInvoiceColumns;
