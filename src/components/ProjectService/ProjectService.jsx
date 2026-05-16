"use client";

import CountUp from "react-countup";

export default function ProjectService() {
  return (
    <div className="text-white text-4xl font-bold">
      <p></p>
      <p>
        Projects Completed: <CountUp end={2500} duration={2.5} />
      </p>
    </div>
  );
}
