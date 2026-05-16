"use client";
import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const SmartCount = ({ end, duration = 3, suffix = "", prefix = "", separator = ",", decimals = 0 }) => {
  const [hasViewed, setHasViewed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  if (inView && !hasViewed) {
    setHasViewed(true);
  }

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {hasViewed && <CountUp start={0} end={end} duration={duration} prefix={prefix} suffix={suffix} separator={separator} decimals={decimals} />}
    </motion.span>
  );
};

export default SmartCount;
