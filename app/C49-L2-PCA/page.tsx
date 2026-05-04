"use client";

import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type DayKeys = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type DayData = Record<DayKeys, string>;

const Page = () => {
  const [data, setData] = useState<DayData>({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name as DayKeys]: value,
    }));
  };

  const generatePDF = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });

    pdf.setFontSize(22);
    pdf.text("Cup of kindness", 210, 40, { align: "center" });

    // Convert day-value pairs into table rows
    const rows = Object.entries(data).map(([day, text]) => [day, text]);

    autoTable(pdf, {
      head: [["Day", "Your Kindness Plan"]],
      body: rows,
      startY: 80,
      styles: { cellWidth: "wrap" },
      columnStyles: {
        1: { cellWidth: 350 }, // long text auto-wraps
      },
      margin: { top: 60 },
    });

    pdf.save("Cup-of-Kindness.pdf");
  };

  return (
    <div className="min-h-screen bg-[#fff] flex justify-center items-center p-5 flex-col">
      <div>
        <h2 className="font-bold text-4xl text-black">Cup of kindness</h2>
      </div>

      <div className="col-span-12 w-full flex justify-center items-center ">
        {/* Inputs (unchanged) */}
        <input
          name="Monday"
          onChange={handleChange}
          placeholder="Monday"
          className="absolute border min-w-[250px] p-2 text-black backdrop-blur-lg
            bottom-[10%] min-h-[50px] left-[40%] rounded-b-full z-10"
        />

        <input
          name="Tuesday"
          onChange={handleChange}
          placeholder="Tuesday"
          className="absolute border min-w-[290px] p-2 text-black backdrop-blur-lg
            bottom-[19%] min-h-[50px] left-[39%] rounded-b-[40px] z-10"
        />

        <input
          name="Wednesday"
          onChange={handleChange}
          placeholder="Wednesday"
          className="absolute border min-w-[320px] p-2 text-black backdrop-blur-lg
            bottom-[28%] min-h-[50px] left-[38%] rounded-b-[40px] z-10"
        />

        <input
          name="Thursday"
          onChange={handleChange}
          placeholder="Thursday"
          className="absolute border min-w-[330px] p-2 text-black backdrop-blur-lg
            bottom-[36%] min-h-[50px] left-[38%] rounded-b-[40px] z-10"
        />

        <input
          name="Friday"
          onChange={handleChange}
          placeholder="Friday"
          className="absolute border min-w-[350px] p-2 text-black backdrop-blur-lg
            bottom-[45%] min-h-[50px] left-[37.5%] rounded-lg rounded-t-3xl z-10"
        />

        <div className="relative w-[730px] h-[700px]">
          <Image src="/C49Images/cup.jpeg" fill alt="images" />
        </div>

        <div className="text-center absolute bottom-[-10px] left-[44%]">
          <button
            onClick={generatePDF}
            className="text-white min-w-[150px] bg-violet-900 rounded-lg px-5 py-2 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
