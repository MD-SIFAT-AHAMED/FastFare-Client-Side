import React, { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import headerImg from "../../../assets/customer-top.png";
const CommentSwiper = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rosel Ahamed 1",
      title: "CTO",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "Awlad Hossin 2",
      title: "Senior Product Designer",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      image: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Nasir Uddin 3",
      title: "CEO",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back and spine.",
      image: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      name: "Rosel Ahamed 4",
      title: "CTO",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 5,
      name: "Rosel Ahamed 5",
      title: "CTO",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 6,
      name: "Rosel Ahamed 6",
      title: "CTO",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
      image: "https://i.pravatar.cc/100?img=1",
    },
  ];

  const [active, setActive] = useState(1);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="py-16 bg-gray-100 text-center">
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        className="max-w-screen-2xl w-11/12 mx-auto"
      >
        <img className="mx-auto mb-6" src={headerImg} alt="" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#03373d]">
          What our customers are sayings
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        {/* Testimonial Cards */}

        <div className="relative flex items-center justify-center">
          <div className="flex gap-4 overflow-hidden w-full max-w-4xl justify-center">
            {[...Array(3)].map((_, i) => {
              const index =
                (active - 1 + i + testimonials.length) % testimonials.length;
              const isActive = i === 1;

              // Responsive visibility logic
              const isHiddenOnMobile = i !== 1; // Only show center on mobile

              return (
                <div
                  key={testimonials[index].id}
                  className={`w-[260px] md:w-[280px] lg:w-[300px] p-6 rounded-xl shadow-md bg-white transition-all duration-500
            ${isActive ? "opacity-100 scale-100 z-10" : "opacity-50 scale-90"}
            ${isHiddenOnMobile ? "hidden sm:block" : "block"}`}
                >
                  <FaQuoteLeft className="text-2xl text-gray-300 mb-4" />
                  <p className="text-gray-700 mb-6 text-sm">
                    {testimonials[index].text}
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[index].image}
                      alt={testimonials[index].name}
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-[#03373d]">
                        {testimonials[index].name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonials[index].title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-center gap-6 mt-10 text-[#89c74a] text-xl">
          <button onClick={handlePrev}>
            <MdArrowBackIos />
          </button>
          {/* Dots */}
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === active ? "bg-[#89c74a]" : "bg-gray-300"
              }`}
            ></button>
          ))}
          <button onClick={handleNext}>
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSwiper;
