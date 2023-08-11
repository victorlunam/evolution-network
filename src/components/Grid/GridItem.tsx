import { CSS, styled } from "@nextui-org/react";

const GridItem = styled<string, CSS[]>("div", {
  variants: {
    colSpan: {
      1: {
        gridColumn: "span 1",
      },
      2: {
        gridColumn: "span 2",
      },
      3: {
        gridColumn: "span 3",
      },
      4: {
        gridColumn: "span 4",
      },
      5: {
        gridColumn: "span 5",
      },
      6: {
        gridColumn: "span 6",
      },
      7: {
        gridColumn: "span 7",
      },
      8: {
        gridColumn: "span 8",
      },
      9: {
        gridColumn: "span 9",
      },
      10: {
        gridColumn: "span 10",
      },
      11: {
        gridColumn: "span 11",
      },
      12: {
        gridColumn: "span 12",
      },
    },
    rowSpan: {
      1: {
        gridRow: "span 1",
      },
      2: {
        gridRow: "span 2",
      },
      3: {
        gridRow: "span 3",
      },
      4: {
        gridRow: "span 4",
      },
      5: {
        gridRow: "span 5",
      },
      6: {
        gridRow: "span 6",
      },
      7: {
        gridRow: "span 7",
      },
      8: {
        gridRow: "span 8",
      },
      9: {
        gridRow: "span 9",
      },
      10: {
        gridRow: "span 10",
      },
      11: {
        gridRow: "span 11",
      },
      12: {
        gridRow: "span 12",
      },
    },
  },
});

export default GridItem;
