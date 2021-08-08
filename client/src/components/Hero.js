import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Welcome on FlipFlap</h1>

    <p className="lead">
      Compose your own magazine with FlipFlap !
    </p>
  </div>
);

export default Hero;
