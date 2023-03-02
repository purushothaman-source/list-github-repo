import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { readRepos } from "../../graphql";
import styled from "styled-components";
import List from "../list/list";

export const StyledApp = styled.div`
  display: flex;
  gap: 5px;
  font-size: 23px;
  flex-direction: column;

  table,
  th,
  td {
    text-align: left;
    border: 1px solid black;
  }
  .top-row-wrapper {
    display: flex;
    gap: 5px;
    padding: 5px;
  }
  button,
  input,
  checkbox {
    font: inherit;
  }
`;

const Mainpage = () => {
  const [username, setUserName] = useState("");
  const [fork, setFork] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [loadData, { data }] = useLazyQuery(readRepos, {
    variables: { user_name: username }
  });

  const handleClick = () => {
    loadData({
      variables: {
        user_name: username
      }
    });
    setIsSubmitted(true);
  };

  const sortedData =
    data?.getRepos?.length > 0
      ? data?.getRepos?.slice().sort((a, b) => {
          console.log({ a, b });
          return a.size > b.size ? -1 : b.size > a.size ? 1 : 0;
        })
      : [];

  return (
    <StyledApp>
      <div className="top-row-wrapper">
        <label htmlFor="github-text-input">Github username : </label>
        <input
          id="github-text-input"
          type="text"
          onChange={e => {
            setIsSubmitted(false);
            setUserName(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <label>Include forks : </label>
        <input
          type="checkbox"
          checked={fork}
          onChange={() => setFork(prev => !prev)}
        />
        <button
          onClick={handleClick}
          disabled={!username}
          style={{ background: username ? "lightblue" : "grey" }}
        >
          Submit
        </button>
      </div>

      {data?.getRepos?.length > 0 ? (
        <table>
          <tr>
            <th>Name</th>
            <th>Language</th>
            <th>Description</th>
            <th>Size</th>
          </tr>
          {data &&
            sortedData.map(list => {
              if (!fork && list.fork) return null;
              return <List key={list.id} data={list} />;
            })}
        </table>
      ) : (
        data && data?.getRepos != null && `No repo found for ${username}`
      )}
      {data && username && isSubmitted && !data.getRepos && (
        <div>Not Found</div>
      )}
    </StyledApp>
  );
};

export default Mainpage;
