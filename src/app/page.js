import AboutUsSlider from "@/components/AboutUsSlider/AboutUsSlider";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import AnyQueries from "@/components/AnyQueries/AnyQueries";
import BenefitOurClients from "@/components/BenefitOurClients/BenefitOurClients";
import CaseStudies from "@/components/CaseStudies/CaseStudies";
import DoDifferently from "@/components/DoDifferently/DoDifferently";
import Footer from "@/components/Footer/Footer";

import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";

import ScrollAnimationSection from "@/components/ScrollAnimationSection/ScrollAnimationSection";
import WeDo from "@/components/WeDo/WeDo";
import WorkProjectSection from "@/components/WorkProjectSection/WorkProjectSection";
import WorkWithUs from "@/components/WorkWithUs/WorkWithUs";
import YouLeadsTimeline from "@/components/YouLeadsTimeline/YouLeadsTimeline";

import React from "react";

function page() {
  return (
    <div className="bg-black">
      <Navbar id="#" />
      <HeroSection></HeroSection>
      <ScrollAnimationSection></ScrollAnimationSection>

      <AnimatedSection id="testimonial">
        <AboutUsSlider></AboutUsSlider>{" "}
      </AnimatedSection>
      <AnimatedSection id="work">
        {" "}
        <WorkProjectSection></WorkProjectSection>{" "}
      </AnimatedSection>
      <AnimatedSection id="case-study">
        {" "}
        <CaseStudies></CaseStudies>{" "}
      </AnimatedSection>
      <DoDifferently></DoDifferently>
      {/* <YouLeadsTimeline></YouLeadsTimeline> */}
      <AnimatedSection>
        <div id="Process">
          <YouLeadsTimeline />
        </div>
      </AnimatedSection>
      <WeDo></WeDo>
      <BenefitOurClients></BenefitOurClients>
      <AnimatedSection id="book-a-call">
        <WorkWithUs></WorkWithUs>
      </AnimatedSection>
      {/* <div id="book-a-call">
         <WorkWithUs></WorkWithUs>
      </div> */}
      <AnyQueries></AnyQueries>
      <Footer></Footer>
    </div>
  );
}

export default page;
