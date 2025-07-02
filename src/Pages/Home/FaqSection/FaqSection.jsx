import React from "react";

const FaqSection = () => {
  const faqs = [
    {
      id: 1,
      question: "How does this posture corrector work?",
      answer:
        "The posture corrector works by gently aligning your spine and shoulders to encourage proper posture. It provides physical support to reduce slouching and trains your muscles over time to maintain better posture naturally.",
    },
    {
      id: 2,
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, the posture corrector is designed to be adjustable and comfortable for people of various ages and body types. Please check the sizing guide to ensure the best fit.",
    },
    {
      id: 3,
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Many users have reported significant improvements in posture and a reduction in back pain with regular use. It helps train your body to maintain proper alignment, which can ease strain on muscles and joints.",
    },
    {
      id: 4,
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Yes, this posture corrector includes smart features such as gentle vibration alerts that notify you when you're slouching, helping you stay mindful of your posture throughout the day.",
    },
    {
      id: 5,
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can subscribe to back-in-stock notifications by entering your email on the product page. You’ll receive an email alert as soon as it becomes available again.",
    },
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-screen-2xl w-11/12 mx-auto">
        <h2 className="text-center text-3xl md:text-4xl text-[#03373d] font-bold mb-4">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
        {faqs.map((faq,i) => (
          <div
          key={i}
            tabIndex={0}
            className="collapse collapse-arrow  focus:border border-[#03373D] bg-base-100 focus:bg-[#e6f2f3] mb-3"
          >
            <div className="collapse-title text-[#03373D] font-semibold">{faq.question}</div>
            <div className="collapse-content text-[#606060] text-base font-semibold">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
