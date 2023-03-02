import React from "react";

const List = ({ data }) => {
  return (
    <tr>
      <td>{data?.name}</td>
      <td>{data?.language}</td>
      <td>{data?.description}</td>
      <td>{data?.size}</td>
    </tr>
  );
};

export default List;
