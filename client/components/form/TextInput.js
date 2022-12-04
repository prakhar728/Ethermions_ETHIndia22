import React from "react";

const TextInput = ({
  name,
  title,
  type,
  value,
  handleChange,
  placeholder,
  titleDescription,
  disabled,
}) => {
  return (
    <>
      <label className="inputLabel">
        {title}:<div className="inputDescription">{titleDescription}</div>
        <input
          className="inputBox"
          name={name}
          type={type ? type : "text"}
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder={placeholder}
          disabled={disabled ? disabled : false}
        />
      </label>
    </>
  );
};

export default TextInput;
