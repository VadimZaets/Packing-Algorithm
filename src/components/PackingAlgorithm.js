import React, { useEffect, useState } from "react";

const PackingAlgorithm = () => {
  const [sheets, setSheets] = useState([]);

  const sheetWidth = 20;
  const sheetHeight = 40;
  const sheetArea = sheetHeight * sheetWidth;

  const blocks = [
    { width: 5, height: 7, count: 50 },
    { width: 3, height: 4.5, count: 70 },
    { width: 9, height: 2, count: 50 },
  ];
  useEffect(() => {
    packBlocks();
  }, []);
  const packBlocks = () => {
    let currentBlock = { top: 0, left: 0, right: 0, bottom: 0 };
    let blockCoordinates = [];
    const newSheets = [];
    for (const block of blocks) {
      const blockArea = block.width * block.height;

      for (let i = 0; i < block.count; i++) {
        let sheetFound = false;

        for (const sheet of newSheets) {
          if (sheet.areaUsed + blockArea <= sheetArea) {
            sheet.blocks.push({ ...block });
            sheet.areaUsed += blockArea;
            sheetFound = true;
            break;
          }
        }

        // If no sheet can accommodate the block, create a new sheet
        if (!sheetFound) {
          newSheets.push({ blocks: [{ ...block }], areaUsed: blockArea });
        }
      }
    }

    setSheets(newSheets);
  };

  return (
    <div>
      {sheets.map((sheet, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #000",
            margin: "10px",
            width: `${sheetWidth}in`,
            height: `${sheetHeight}in`,
          }}
        >
          <h3>Sheet {index + 1}</h3>
          {sheet.blocks.map((block, blockIndex) => (
            <div
              key={blockIndex}
              style={{
                border: "1px solid #ccc",
                margin: "5px",
                width: `${block.width}in`,
                height: `${block.height}in`,
              }}
            >
              Block
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PackingAlgorithm;
