import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full">
      <div className="carousel w-full h-[70vh]">
        {/* Slide 1 */}
        <div
          id="slide1"
          className="carousel-item relative w-full h-[70vh] bg-cover"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/nMq8Rvg9/diverse-group-volunteers-matching-green-260nw-2576833387.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-bold mb-4 bg-black/50 px-4 py-2 rounded-lg"
            >
              Reduce Food Waste
            </motion.h1>
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl mb-6 max-w-2xl bg-black/40 px-4 py-2 rounded-lg"
            >
              Connecting restaurants with charities to share surplus meals and fight hunger together.
            </motion.p>
            <motion.a
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              href="/browse"
              className="btn bg-green-600 border-none hover:bg-green-700 text-white"
            >
              Browse Donations
            </motion.a>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          id="slide2"
          className="carousel-item relative w-full h-[70vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/qqscBNz/world-earth-day-concept-green-260nw-2169784725.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-bold mb-4 bg-black/50 px-4 py-2 rounded-lg"
            >
              Build Stronger Communities
            </motion.h1>
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl mb-6 max-w-2xl bg-black/40 px-4 py-2 rounded-lg"
            >
              Every shared plate brings hope. Join us in creating a sustainable and caring society.
            </motion.p>
            <motion.a
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              href="/about"
              className="btn bg-green-600 border-none hover:bg-green-700 text-white"
            >
              Learn More
            </motion.a>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div
          id="slide3"
          className="carousel-item relative w-full h-[70vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/Cs8ZrTkv/photo-1484723091739-30a097e8f929.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-bold mb-4 bg-black/50 px-4 py-2 rounded-lg"
            >
              Empowering Restaurants
            </motion.h1>
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl mb-6 max-w-2xl bg-black/40 px-4 py-2 rounded-lg"
            >
              Restaurants can donate surplus meals easily and make a lasting difference.
            </motion.p>
            <motion.a
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              href="/register"
              className="btn bg-green-600 border-none hover:bg-green-700 text-white"
            >
              Get Started
            </motion.a>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
