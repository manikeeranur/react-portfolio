import React from "react";
import SectionHeader from "../common/SectionHeader";
import Carousel from "../common/Carousel";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Arun Kumar",
    role: "CEO, Impacteers Club",
    quote: "Manikandan is an exceptional developer who delivers high-quality work on time. Highly recommended!",
  },
  {
    id: "t2",
    name: "Rajesh N.",
    role: "Product Manager",
    quote: "Great experience working with Manikandan. He understands requirements perfectly and delivers beyond expectations.",
  },
  {
    id: "t3",
    name: "Karthik S.",
    role: "Founder",
    quote: "Professional, reliable and highly skilled in frontend development. Will work with him again on future projects.",
  },
];

const TestimonialCard = ({ t }) => (
  <div className="testimonial-card">
    <i className="fa fa-quote-left testimonial-quote-icon" aria-hidden="true" />
    <p className="testimonial-quote">{t.quote}</p>
    <div className="testimonial-author">
      <span className="testimonial-avatar">{t.name[0]}</span>
      <div>
        <div className="testimonial-name">{t.name}</div>
        <div className="testimonial-role">{t.role}</div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div className="section-card" id="testimonials" ref={ref}>
      <div className="home-container">
        <SectionHeader number="06" title="What Clients Say" viewAllText="View all testimonials" viewAllTo="testimonials" />
        <div className={`skills-reveal ${isVisible ? "is-visible" : ""}`}>
          <Carousel
            items={TESTIMONIALS}
            perView={{ base: 1, md: 3 }}
            gap={24}
            renderItem={(t) => <TestimonialCard t={t} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
