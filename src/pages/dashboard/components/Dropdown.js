import React, { useState } from "react";

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedNestedOption, setSelectedNestedOption] = useState("");

  // Rest of the component code
  const options = [
    {
      value: "option1",
      label: "FARMER",
      children: [
        { value: "option1-1", label: "PRODUCE" },
        { value: "option1-2", label: "Option 1 - 2" },
      ],
    },
    {
      value: "option2",
      label: "Option 2",
      children: [
        { value: "option2-1", label: "Option 2 - 1" },
        { value: "option2-2", label: "Option 2 - 2" },
      ],
    },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {selectedOption && (
        <select
          value={selectedNestedOption}
          onChange={(e) => setSelectedNestedOption(e.target.value)}
        >
          <option value="">Select a nested option</option>
          {options
            .find((option) => option.value === selectedOption)
            .children.map((childOption) => (
              <option key={childOption.value} value={childOption.value}>
                {childOption.label}
              </option>
            ))}

          {/* <label htmlFor="dropdown">Select an option:</label>
            <select
              id="dropdown"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="">-- Select --</option>
              <option value="option1">CONSUMER</option>
              <option value="option2">FARMER</option>
              <option value="option3">TRANSPORTER</option>
            </select> */}
        </select>
      )}
    </div>
  );
};

export default Dropdown;
