import React from "react";
import { ImCross } from "react-icons/im";
import { BsCheckCircle } from "react-icons/bs";
const SingleList = ({ text, color }) => {
  return (
    <li
      style={{
        color: color,
        listStyle: "none",
        paddingLeft: "5px",
        paddingTop: "2px",
      }}
    >
      {text}
    </li>
  );
};

export default function FormValidation({ validationsData }) {
  return (
    <ul>
      {validationsData.map((x) => (
        <div className="d-flex ">
          <div
            className={`p-0 m-0 ${x.valid ? "text-success" : "text-danger"}`}
          >
            {x.valid ? <BsCheckCircle /> : <ImCross />}
          </div>
          <SingleList color={x.valid ? "green" : "red"} text={x.text} />
        </div>
      ))}
    </ul>
  );
}
