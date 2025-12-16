import React, { RefObject, useEffect, useState } from "react";
import Swiper from "swiper";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type myProps = {
  swiperRef: RefObject<Swiper | null>;
};

const Table = ({ swiperRef }: myProps) => {
  const [rows, setRows] = useState([
    { item: "", price: "", reason: "" },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { item: "", price: "", reason: "" }]);
  };

  // update swiper height
  useEffect(() => {
    swiperRef.current?.updateAutoHeight();
  }, [rows]);

  // --------------------------
  // PDF GENERATE (TEXT ONLY)
  // --------------------------
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
   doc.text("Gift Card", doc.internal.pageSize.getWidth() / 2, 15, {
  align: "center",
});


// Convert rows to array form
    const tableRows = rows.map((r) => [r.item, r.price, r.reason]);
    autoTable(doc, {
      startY: 25,
      head: [["Item", "Price", "Reason"]],
      body: tableRows,
      headStyles:{
halign:"center"
      },
      styles:{
        fontSize:8.5
      }
    });

    doc.save("Gift_card.pdf");
  };

  // --------------------------
  // input update handler
  // --------------------------
  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...rows];
    // @ts-ignore
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="grid grid-cols-12 w-[80%] gap-0">

        {/* Headers */}
        <div className="col-span-4 bg-violet-900 text-white text-center p-2 font-bold">
          Item
        </div>
        <div className="col-span-4 bg-violet-900 text-white text-center p-2 font-bold">
          Price
        </div>
        <div className="col-span-4 bg-violet-900 text-white text-center p-2 font-bold">
          Reason
        </div>

        {/* rows */}
        {rows.map((row, index) => (
          <React.Fragment key={index}>
            <div className="col-span-4 border p-2">
              <textarea
                value={row.item}
                onChange={(e) => handleChange(index, "item", e.target.value)}
                className="w-full outline-0 text-center p-2 text-black placeholder:text-gray-600"
                placeholder="Write Item..."
              />
            </div>

            <div className="col-span-4 border p-2">
              <textarea
                value={row.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
                className="w-full outline-0 text-center p-2 text-black placeholder:text-gray-600"
                placeholder="Write Price..."
              />
            </div>

            <div className="col-span-4 border p-2">
              <textarea
                value={row.reason}
                onChange={(e) => handleChange(index, "reason", e.target.value)}
              className="w-full outline-0 text-center p-2 text-black placeholder:text-gray-600"
                placeholder="Write Reason..."
              />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Buttons */}
      <div className="text-center mt-5 space-x-4">
        <button
          onClick={handleAddRow}
          className="bg-violet-900 hover:bg-violet-800 cursor-pointer text-white px-5 py-2 rounded"
        >
          Add Row
        </button>

        <button
          onClick={generatePDF}
          className="bg-violet-900 hover:bg-violet-800 cursor-pointer text-white px-5 py-2 rounded"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default Table;
