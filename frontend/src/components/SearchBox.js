import React, { useState } from "react";

export default function SearchBox(props) {
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/allsearchdevices/cpu/${cpu}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => {
            setCpu(e.target.value);
            setRam(e.target.value);
          }}
        />
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
