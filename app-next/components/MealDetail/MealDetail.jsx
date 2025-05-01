"use client";

import { useState } from "react";

const MealDetail = ({ meal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number_of_guests: 1, // You can modify this if you want guests to choose
          meal_id: meal.id,
          created_date: new Date().toISOString().split("T")[0], // today's date in "YYYY-MM-DD" format
          contact_name: formData.name,
          contact_email: formData.email,
          contact_phonenumber: formData.phone,
        }),
      });

      if (res.ok) {
        setMessage("Reservation successful!");
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setMessage("Failed to make reservation.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>{meal.title}</h1>
      <p>{meal.description}</p>
      <p>Price: ${meal.price}</p>

      <h2>Reserve a Seat</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
          }}
        >
          Book Seat
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default MealDetail;
