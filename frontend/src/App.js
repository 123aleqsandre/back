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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/students/add", form);
      alert(res.data.message);

      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        class_name: "",
        region: "",
        username: "",
        password: ""
      });

    } catch (err) {
      alert("Error adding student");
    }
  };

  return (
    <div>
      <h2>სტუდენტის დამატება</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key}>
            <input
              name={key}
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              type={key === "password" ? "password" : "text"}
              required
            />
          </div>
        ))}

        <button type="submit">სტუდენტის დამატება</button>
      </form>
    </div>
  );
}