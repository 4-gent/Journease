import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/privacy"); // Replace '/target-page' with the path you want to redirect to
  };

  return (
    <section className="hero">
      <h1>Your journey, your way</h1>
      <p>
        Finding where you need to go can be overwhelming with a plethora of
        options out there. Journease simplifies this process, making your
        journey easier and more personalized.
      </p>
      <button onClick={handleClick}>Start your journey now</button>
    </section>
  );
}
