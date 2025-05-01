"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./MealDetail.css";

const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    title: "",
    description: "",
    stars: 5,
  });
  const [reservationForm, setReservationForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
  });
  const [message, setMessage] = useState("");

  // Fetch meal info
  useEffect(() => {
    const fetchMeal = async () => {
      const res = await fetch(`http://localhost:3001/api/meals/${id}`);
      const data = await res.json();
      setMeal(data);
    };

    fetchMeal();
  }, [id]);

  // Fetch reviews for this meal
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(
        `http://localhost:3001/api/reviews?meal_id=${id}`
      );
      const data = await res.json();
      setReviews(data);
    };

    fetchReviews();
  }, [id]);

  const handleReservationChange = (e) => {
    setReservationForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReviewChange = (e) => {
    setReviewForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number_of_guests: parseInt(reservationForm.guests),
          meal_id: parseInt(id),
          created_date: new Date().toISOString().split("T")[0],
          contact_name: reservationForm.name,
          contact_email: reservationForm.email,
          contact_phonenumber: reservationForm.phone,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Reservation successful!");
        setReservationForm({
          name: "",
          email: "",
          phone: "",
          guests: 1,
        });
      } else {
        setMessage(data.error || "Failed to make reservation.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: reviewForm.title,
          description: reviewForm.description,
          stars: parseInt(reviewForm.stars),
          meal_id: parseInt(id),
          created_date: new Date().toISOString().split("T")[0],
        }),
      });

      if (res.ok) {
        setReviewForm({ title: "", description: "", stars: 5 });
        const updatedReviews = await fetch(
          `http://localhost:3001/api/reviews?meal_id=${id}`
        );
        setReviews(await updatedReviews.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!meal) return <p>Loading meal info...</p>;

  return (
    <div>
      <div className="meal-hero">
        <img
          src={`/assets/meals/${meal.id}.jpg`}
          alt={meal.title}
          className="meal-hero-image"
        />
        <div className="meal-hero-text">
          <h1>{meal.title}</h1>
          <p>
            <strong>{meal.description}</strong>
          </p>
          <p>
            <strong>Location:</strong> {meal.location}
          </p>
          <p>
            <strong>Price:</strong> {meal.price} kr.
          </p>
          <p>
            <strong>Max Reservations:</strong> {meal.max_reservations}
          </p>
        </div>
      </div>
      <div className="review-section">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.title}</strong> ({review.stars} stars)
                <br />
                {review.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}

        <h3>Write a Review</h3>
        <form
          onSubmit={handleReviewSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            name="title"
            placeholder="Title"
            value={reviewForm.title}
            onChange={handleReviewChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={reviewForm.description}
            onChange={handleReviewChange}
            required
          />
          <input
            name="stars"
            type="number"
            min="1"
            max="5"
            value={reviewForm.stars}
            onChange={handleReviewChange}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
      <div className="reservation-section">
        <h2>Make a Reservation</h2>
        <form
          onSubmit={handleReservationSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            name="name"
            placeholder="Name"
            value={reservationForm.name}
            onChange={handleReservationChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={reservationForm.email}
            onChange={handleReservationChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={reservationForm.phone}
            onChange={handleReservationChange}
            required
          />
          <input
            name="guests"
            type="number"
            min="1"
            value={reservationForm.guests}
            onChange={handleReservationChange}
            required
          />
          <button type="submit">Reserve</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default MealDetail;
