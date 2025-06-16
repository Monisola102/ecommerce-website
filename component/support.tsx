"use client";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { ReactNode } from "react";
import { FaPhone } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { CircleMinus, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface objType {
  para1: string;
  para2: string;
  para3: string;
  icon: React.ReactNode;
  link: string;
}

const SupportCard = ({ s }: { s: objType }) => (
  <div className="border rounded border-white bg-white p-[30px]">
    <div className="bg-green-500/60 w-[38px] px-2 py-2 text-black border-none border rounded-md items-center justify-center mb-3">
      {s.icon}
    </div>
    <p className="text-black text-[14px] mb-2">{s.para1}</p>
    <p className="text-black text-[14px] mb-3 font-bold">{s.para2}</p>
    <Link
      className=" bg-green-500/60 shadow-md hover:bg-black  hover:text-green-500 cursor-pointer text-[14px] text-black w-[70%] border-none border rounded p-[10px] "
      href={s.link}
    >
      {s.para3}
    </Link>
  </div>
);

const SupportComp = () => {
  const supports = [
    {
      para1: "Live Chat",
      para2:
        "Get instant help from our support team. Available 24/7 to assist with orders, products, and account issues",
      para3: "Start Chat",
      icon: <IoChatbubbleEllipsesOutline />,
      link: "/chat",
    },
    {
      para1: "Phone Support",
      para2:
        "Speak directly with our customer service representatives for personalized assistance with your concerns",
      para3: "Call Now",
      icon: <FaPhone />,
      link: "/phone",
    },
    {
      para1: "Email Support",
      para2:
        "Send us detailed inquiries and we will respond within 24 hours with comprehend solutions",
      para3: "Send Email",
      icon: <IoMailOutline />,
      link: "/email",
    },
  ];

  const faqs: { question: string; answer: string }[] = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account, going to the “My Orders” section, and clicking on “Track Order” to view the latest status and tracking details.",
    },
    {
      question: "What is your return policy?",
      answer:
        "You can return items within 30 days of delivery as long as they are unused and in original packaging.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping usually takes 3–7 business days depending on your location.",
    },
    {
      question: "How do I cancel my order?",
      answer:
        "To cancel your order, go to 'My Orders' and click 'Cancel' next to the order if it hasn’t been shipped yet.",
    },
  ];

  const [answer, setAnswer] = useState<number | null>(null);
  const handleAnswer = (index: number) => {
    setAnswer((prev) => (prev === index ? null : index));
  };

  return (
    <div className=" h-auto p-[50px] bg-[url('/support.jpg')] bg-cover bg-center">
      <h1 className="text-center text-black font-bold mb-3 text-3xl">
        Support Center
      </h1>
      <p className=" max-w-[400px] text-center mx-auto text-black mb-7 text-sm">
        We are here to help you with all your shopping needs. Get instant
        assistance or browse our comprehensive help resources
      </p>
      <div className="mb-[50px] relative flex items-center">
        <input
          type="text"
          placeholder="Search products,articles,faq,..."
          className="text-black text-[12px] bg-green-500/60 mx-auto  text-sm w-[40%] py-5 px-7 border rounded-3xl border-green-500/60 focus:outline-none"
        />
        <IoSearchOutline className="absolute left-[356px] top-1/2 -translate-y-1/2 text-black-500" />
      </div>

      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supports &&
            supports.map((prod, index) => <SupportCard s={prod} key={index} />)}
        </div>
      </div>
      <h1 className="text-center text-black font-bold text-3xl mt-12">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col bg-white px-8 py-8 gap-4 mt-8  rounded-lg">
        {faqs.map((q, i) => (
          <div
            key={i}
            className="flex justify-between border-b border-green-500/60"
          >
            <p>{q.question}</p>
            <div className="flex gap-2">
            <button onClick={() => handleAnswer(i)} type="button">
              {answer === i ? (
                <CircleMinus className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </button>
            {answer === i && (
              <p className="mt-2 text-sm text-black">{q.answer}</p>
            )}
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SupportComp;
