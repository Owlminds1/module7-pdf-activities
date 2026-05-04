"use client";

import { Swiper, SwiperClass, SwiperSlide} from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef, useState } from "react";
import Table from "./table";


const Slide = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);



  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
  };


  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5 flex-col gap-5">
      <div>
        <h4 className="text-3xl capitalize font-bold text-center text-black">
Vacation
        </h4>

     
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

             <div className="w-full flex justify-center items-center">
               <ul className="list-disc space-y-2 px-3 w-[50%] ">
                <li className="text-lg text-black font-medium ">
                   List how much money you like to set aside for each item. For example: 100 dollars
                </li> 
                
                
                <li className="text-lg text-black font-medium ">
                  List how much money you will keep as a buffer. For example: 20% of the total amount
                </li>
                
                <li className="text-lg text-black font-medium ">
                 Enter your total vacation allowance. For example: vacation allowance of 100 dollars
                </li> 
                
                
                <li className="text-lg text-black font-medium ">
                Make notes such as: focus on needs not wants!
                </li>
              </ul>
             </div>
            </SwiperSlide>
 <SwiperSlide>
              <Table/>
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
