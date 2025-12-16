"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";

type RowType = {
  item: string;
  ideal: string;
  buffer: string;
};

const Page = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [allowance, setAllowance] = useState("");
  const [savings, setSavings] = useState("");
  const [notes, setNotes] = useState("");

  const [row, setRow] = useState<RowType[]>([
    { item: "", ideal: "", buffer: "" },
  ]);

  const handleRowChange = (
    index: number,
    field: keyof RowType,
    value: string
  ) => {
    const updated = [...row];
    updated[index] = { ...updated[index], [field]: value };
    setRow(updated);
  };

  const addRow = () => {
    setRow((prev) => [...prev, { item: "", ideal: "", buffer: "" }]);
  };


  const downloadPdf = () => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  let y = 20;

  // -------- TITLE --------
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Vacation", pageWidth / 2, y, { align: "center" });

  y += 12;

  // -------- BASIC INFO --------
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(`Name: ${name}`, 20, y);
  doc.text(`Date: ${date}`, pageWidth - 70, y);

  y += 8;
  doc.text(`Allowance: ${allowance}`, 20, y);
  doc.text(`Savings: ${savings}`, pageWidth - 70, y);

  y += 12;

  // -------- TABLE HEADER --------
  doc.setFont("helvetica", "bold");
  doc.text("Item", 20, y);
  doc.text("Ideal", 90, y);
  doc.text("Buffer", 150, y);

  y += 6;
  doc.line(20, y, pageWidth - 20, y);
  y += 6;

  doc.setFont("helvetica", "normal");

  // -------- TABLE ROWS --------
 // -------- TABLE ROWS (NO OVERLAP FIX) --------
row.forEach((r) => {
  // column widths
  const itemWidth = 55;
  const idealWidth = 45;
  const bufferWidth = 40;

  // wrap text
  const itemText = doc.splitTextToSize(r.item || "-", itemWidth);
  const idealText = doc.splitTextToSize(r.ideal || "-", idealWidth);
  const bufferText = doc.splitTextToSize(r.buffer || "-", bufferWidth);

  // calculate row height
  const rowHeight =
    Math.max(itemText.length, idealText.length, bufferText.length) * 6;

  // page overflow check
  if (y + rowHeight > pageHeight - 15) {
    doc.addPage();
    y = 15;

    // re-draw table header on new page
    doc.setFont("helvetica", "bold");
    doc.text("Item", 20, y);
    doc.text("Ideal", 90, y);
    doc.text("Buffer", 150, y);

    y += 6;
    doc.line(20, y, pageWidth - 20, y);
    y += 6;

    doc.setFont("helvetica", "normal");
  }

  // draw text
  doc.text(itemText, 20, y);
  doc.text(idealText, 90, y);
  doc.text(bufferText, 150, y);

  // move y for next row
  y += rowHeight + 4;
});


  // -------- NOTES --------
  if (notes.trim()) {
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 20;
    }

    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Notes:", 20, y);

    y += 6;
    doc.setFont("helvetica", "normal");
    const notesText = doc.splitTextToSize(notes, pageWidth - 40);
    doc.text(notesText, 20, y);
  }

  doc.save("Vacation.pdf");
};


  return (
    <div className="min-h-screen bg-[#FCF8FA] flex flex-col items-center p-5">
      <h2 className="font-bold text-4xl text-black mb-4">Vacation</h2>

      <div className="w-[80%]">
        {/* INPUTS */}
        <div className="grid grid-cols-12 gap-1 p-1">
          <div className="col-span-6 border">
            <input
              className="w-full p-2 text-black outline-0"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-span-6 border">
            <input
            title="Date"
              type="date"
              className="w-full p-2 text-black outline-0"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="col-span-6 border">
            <input
              className="w-full p-2 text-black outline-0"
              placeholder="Enter Allowance"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
            />
          </div>

          <div className="col-span-6 border">
            <input
              className="w-full p-2 text-black outline-0"
              placeholder="Enter Savings"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="grid grid-cols-12 gap-0.5 p-1">
          <div className="col-span-4 bg-violet-900 text-white p-2 text-center">
            ITEM
          </div>
          <div className="col-span-4 bg-violet-900 text-white p-2 text-center">
            IDEAL
          </div>
          <div className="col-span-4 bg-violet-900 text-white p-2 text-center">
            BUFFER
          </div>

          {row.map((r, index) => (
            <React.Fragment key={index}>
              <div className="col-span-4 border p-2">
                <textarea
                title="item input"
                  className="w-full text-black outline-0"
                  value={r.item}
                  onChange={(e) =>
                    handleRowChange(index, "item", e.target.value)
                  }
                />
              </div>
              <div className="col-span-4 border p-2">
                <textarea
                title="ideal input"
                  className="w-full text-black outline-0"
                  value={r.ideal}
                  onChange={(e) =>
                    handleRowChange(index, "ideal", e.target.value)
                  }
                />
              </div>
              <div className="col-span-4 border p-2">
                <textarea
                title="buffer input"
                  className="w-full text-black outline-0"
                  value={r.buffer}
                  onChange={(e) =>
                    handleRowChange(index, "buffer", e.target.value)
                  }
                />
              </div>
            </React.Fragment>
          ))}

          {/* NOTES */}
          <div className="col-span-12 my-2">
            <textarea
              className="w-full border rounded-lg p-3 text-black"
              placeholder="NOTES"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* BUTTONS */}
          <div className="col-span-12 flex justify-center gap-3 my-2">
            <button
              onClick={addRow}
              className="bg-violet-900 cursor-pointer text-white px-5 py-2 rounded-lg"
            >
              Add Row
            </button>
            <button
                onClick={downloadPdf}
              className="bg-violet-900 cursor-pointer text-white px-5 py-2 rounded-lg"
            >
              Download Pdf
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
