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
        <h4 className="text-3xl font-bold text-center text-black">
          {activeSlide === 0
            ? "SELL YOUR ITEMS"
            : activeSlide === 1
            ? "ENTER YOUR ITEMS"
            : ""}
        </h4>

        <p className="text-black text-lg ">
          {activeSlide === 0
            ? "Pick five items in your room that you’d like to sell. "
            : activeSlide === 1
            ? " Enter your responses in the following table. You can price items at 5, 10, and 15. Make sure to give reasons. "
            : ""}
        </p>
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
              <div className="grid grid-cols-12 w-full place-items-center p-2">
                <div className="col-span-6 w-full flex justify-center items-center gap-5">
                  <MyImage path="/C52Images/Sell-Item.jpg" />
                </div>

                <div className="col-span-6 w-full flex flex-col   justify-center items-start gap-5">
                  <h2 className="text-black text-xl font-bold ">
                    For example: among the five items can be a pencil sharpener.
                  </h2>
                  <div className="w-full ">
                    <ul className="list-disc  w-full ">
                      {SlideData.slice(0, visibleCount).map((i, index) => (
                        <li
                          key={index}
                          className="text-lg text-left font-medium text-black"
                        >
                          {i}
                        </li>
                      ))}
                    </ul>

                    {SlideData.length > visibleCount && (
                      <p className="text-gray-800 italic font-normal">
                        (Enter to show more points)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 w-full place-items-center p-2">
                <div className="col-span-12 w-full flex flex-col   justify-center items-center gap-5">
                  <h2 className="text-black text-xl font-bold ">
                    Here are some questions to think about.
                  </h2>

                  <ul className="list-disc space-y-3  w-[40%] ">
                    {Slide2Data.slice(0, visibleCount2).map((i, index) => (
                      <li
                        key={index}
                        className="text-lg text-left font-medium text-black"
                      >
                        {i}
                      </li>
                    ))}
                  </ul>

                  {Slide2Data.length - 1 < visibleCount2 && <Table swiperRef={swiperRef} />}

                  {Slide2Data.length > visibleCount2 && (
                    <p className="text-gray-800 italic font-normal">
                      (Enter to show more points)
                    </p>
                  )}
                </div>
              </div>
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
