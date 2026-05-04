"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import SlideData from "@/src/layout-C52-L1-PCA/pointers.json";
import Slide2Data from "@/src/layout-C52-L1-PCA/pointers2.json";
import MyImage from "@/components/myImage";
import Table from "./table";

const Slide = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [visibleCount, setVisibleCount] = useState(0);
  const [visibleCount2, setVisibleCount2] = useState(0);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
  };

  useEffect(
    () => {
      // single keydown listener that always checks the current swiper index
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key !== "Enter" && e.code !== "Enter") return;

        const current = swiperRef.current?.activeIndex ?? activeSlide;

        if (current === 0) {
          setVisibleCount((prev) =>
            prev < SlideData.length ? prev + 1 : prev
          );
        }

        if (current === 1) {
          setVisibleCount2((prev) =>
            prev < Slide2Data.length ? prev + 1 : prev
          );
        }
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
      // note: no activeSlide dependency needed because we read from swiperRef.current
    },
    [
      /* intentionally empty: we read current index from swiperRef */
    ]
  );

  useEffect(() => {
    swiperRef.current?.updateAutoHeight();
  }, [visibleCount]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5 flex-col gap-5">
      <div>
        <h4 className="text-3xl capitalize font-bold text-center text-black">
Gift card
        </h4>
        <p className="text-xl font-bold text-center text-black my-2">
          Your parents have given you a giftcard ($50) for your birthday.
        </p>
        <ul className="list-disc space-y-4 px-6 my-5">
          <li className="text-black text-lg ">You can use it over a period of time.</li>
          <li className="text-black text-lg ">You can purchase anything on a specific website for toys, stationary, books.</li>
          <li className="text-black text-lg ">So you’ve to make wise choices so as to buy items you will need.</li>
        </ul>

     
      </div>

      <div className="w-[90%] flex justify-center items-center flex-col gap-3">
        <div className="w-full shadow-md p-5 min-h-[200px]">
          <Swiper
            loop={false}
            autoHeight
            allowTouchMove={false}
            autoplay={false}
            modules={[Navigation]}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            {/* SLIDE 0 */}

            

            <SwiperSlide>
              <h4 className="text-xl capitalize py-5 font-bold text-center text-black">
Create your list with pricing in this table.

        </h4>
          <Table swiperRef={swiperRef} />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Navigation */}
        <div className="flex justify-between w-full mt-8">
          <span
            onClick={handlePrev}
            className={`${
              activeSlide === 0 ? "invisible" : "visible"
            } cursor-pointer text-black text-4xl border border-black rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowLeft />
          </span>

          <span
            onClick={handleNext}
            className={`${
              activeSlide < 1? "visible" : "invisible"
            } cursor-pointer text-black text-4xl border border-black rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide;
