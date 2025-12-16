"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import suggestionData from "@/src/layout-C52-L3-PCA/suggestion.json";

const Slide = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [inputVal, setInputVal] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
  };

  const handleAdd = () => {
    let val = inputVal.trim();

    if (!val) {
      setErrorMsg("You can not add a empty question.  ");
      return;
    }

    const isDuplicate = list.some(
      (i) => i.toLowerCase() === inputVal.toLowerCase()
    );
    if (isDuplicate) {
      setErrorMsg("This Question is already exist in the list.");
      return;
    }
    setList((prev) => [...prev, inputVal]);
    setInputVal("");
    setErrorMsg("");
  };

  const hadleAddPdf = () => {
    if (list.length === 0) return;

    const doc = new jsPDF();
    const title = "Student Questions";
    doc.setFontSize(18);

    // Title width measure
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);

    // Center X position
    const x = (pageWidth - titleWidth) / 2;

    doc.text(title, x, 20); // centered title at y=20

    doc.setFontSize(12);

    let y = 30;

    list.forEach((i, index) => {
      const wrappedText = doc.splitTextToSize(i, 180);

      if (y + wrappedText.length * 8 > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${index + 1}.`, 10, y);
      doc.text(wrappedText, 20, y);

      y += wrappedText.length * +6;
    });

    doc.save("student-questions.pdf");
    setShow(true);
  };

  useEffect(() => {
    swiperRef.current?.updateAutoHeight();
  }, [handleAdd]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5 flex-col gap-5">
      <div>
        <h4 className="text-3xl font-bold text-center text-black">
          {activeSlide === 0 ? "Ask" : "Suggestive responses"}
        </h4>

        {/* <p className="text-black text-lg ">
          {activeSlide === 0
            ? "Pick five items in your room that you’d like to sell. "
            : activeSlide === 1
            ? " Enter your responses in the following table. You can price items at 5, 10, and 15. Make sure to give reasons. "
            : ""}
        </p> */}
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
              <div className="grid grid-cols-12 place-items-center w-full gap-5 p-3 ">
                <div className="col-span-12 w-1/2 flex justify-center flex-col items-center  gap-1 ">
                  <div className="flex justify-center items-center gap-2">
                    <textarea
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Enter Your Question "
                      className="min-w-[400px] outline-0 ring-1 ring-violet-900 focus:ring-2 rounded-lg  text-black text-lg p-2 placeholder:text-gray-600 "
                    />

                    <div className="text-center w-full ">
                      <button
                        onClick={handleAdd}
                        className="text-white bg-violet-900 px-5 py-2 rounded-lg cursor-pointer"
                      >
                        Add Question
                      </button>
                    </div>
                  </div>

                  <p className="text-red-400 text-left px-3 w-full font-bold ">
                    {errorMsg}
                  </p>
                </div>

                <div className="col-span-12 w-1/2 flex justify-center items-center flex-col gap-5 ">
                  <ul className="list-disc w-full space-y-3 px-5">
                    {list.map((i, index) => (
                      <li key={index} className="text-black text-lg   ">
                        {i}
                      </li>
                    ))}
                  </ul>

                  <div className="text-center w-full flex gap-2 justify-center items-center ">
                    <button
                      onClick={hadleAddPdf}
                      className={`${
                        list.length === 0 ? "invisible" : "visible"
                      } text-white bg-violet-900 px-5 py-2 rounded-lg cursor-pointer`}
                    >
                      save as pdf
                    </button>
                    {show ? (
                      <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className={`${
                          list.length === 0 ? "invisible" : "visible"
                        } text-white bg-violet-900 px-5 py-2 rounded-lg cursor-pointer`}
                      >
                        Suggestive Responses
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 place-items-center w-full gap-5 p-3 ">
                <div className="col-span-12 w-1/2 flex justify-center items-center flex-col gap-5 ">
                  <ul className="list-disc w-full space-y-3">
                    {suggestionData.map((i, index) => (
                      <li key={index} className="text-black text-lg ">
                        {i}
                      </li>
                    ))}
                  </ul>
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
              activeSlide < 1 && show ? "visible" : "invisible"
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
