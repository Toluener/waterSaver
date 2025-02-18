"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const images = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Testing = () => {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">Lumlum</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:text-gray-600">
            Home
          </a>
          <a href="#" className="hover:text-gray-600">
            Album
          </a>
          <a href="#" className="hover:text-gray-600">
            Contact
          </a>
        </nav>
      </header>

      {/* Main Section */}
      <main className="text-center px-4">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">
          Capturing the Vibe, Freezing the Moment
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Specialized in capturing amazing pictures and moments you would always
          remember.
        </p>
        <button className="px-6 py-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800">
          Send Us a Message
        </button>
      </main>

      {/* Carousel */}
      <section className="relative w-full max-w-5xl mt-10 overflow-hidden">
        <motion.div
          className="flex space-x-6"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="min-w-[500px] h-[500px] overflow-hidden rounded-3xl"
              style={{
                clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)",
              }}
            >
              <Image
                src={img}
                width={800}
                height={600}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-10 text-center">
        <p className="text-sm text-gray-500">Dec 25, 2024</p>
        <p className="text-lg font-medium">Memories That Last Forever</p>
      </footer>
    </div>
  );
};

export default Testing;
