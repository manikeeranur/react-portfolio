import axios from "axios";

import React, { useState } from "react";
const MyClubs = () => {
  const [techSkills, setTechSkills] = useState({
    title: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTechSkills({ ...techSkills, [name]: value });
  };
  const AddTechnicalSkills = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/technicalSkills`,
        techSkills
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Title"
        onChange={handleChange}
        name="title"
        value={techSkills.title}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Values"
        onChange={handleChange}
        name="value"
        value={techSkills.value}
      />
      <button onClick={AddTechnicalSkills}>Add</button>
    </div>
  );
};

export default MyClubs;
