import { useState } from "react";
import axios from "axios";

export default function AddStudent() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    class_name: "",
    region: "",
    username: "",
    password: ""
  });

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  async function handleSubmit() {
    try {
      const res = await axios.post("http://localhost:5000/students/add", form);
      alert(res.data.message);
    } catch (err) {
      alert("Error adding student");
    }
  }

  return (
    <div style={{width:"300px"}}>
      {Object.keys(form).map(key => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={form[key]}
          onChange={handleChange}
        />
      ))}

      <button onClick={handleSubmit}>სტუდენტის დამატება</button>
    </div>
  );
}