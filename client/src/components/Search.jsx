import React from "react";

const Search = ({ startInput, endInput, date, handleClick, text, handleChange }) => {
  return (
    <>
      <div className="covid--apiCall">
        <span>{text.startText}</span>
        <input ref={startInput} type="date" defaultValue={date.startData} name="startData" onChange={handleChange} />
      </div>
      <div className="covid--apiCall">
        <span>{text.endText}</span>
        <input ref={endInput} type="date" defaultValue={date.endData} name="endData" onChange={handleChange} />
      </div>
      <div className="covid--apiCall">
        <button type="button" onClick={handleClick}>
          검색
        </button>
      </div>
    </>
  );
};

export default Search;
