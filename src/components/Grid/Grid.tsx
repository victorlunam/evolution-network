import { CSS, VariantProps, styled } from "@nextui-org/react";
import { FunctionComponent, ReactNode } from "react";

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

const Grid: FunctionComponent<{
  columns?: IntRange<1, 13>;
  rows?: IntRange<1, 13>;
  css?: CSS;
  children?: ReactNode;
}> = styled<string, CSS[]>("div", {
  display: "grid",
  gridGap: "$xs",
  variants: {
    columns: {
      1: {
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
      },
      2: {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      },
      3: {
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      },
      4: {
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      },
      5: {
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
      },
      6: {
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
      },
      7: {
        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
      },
      8: {
        gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
      },
      9: {
        gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
      },
      10: {
        gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
      },
      11: {
        gridTemplateColumns: "repeat(11, minmax(0, 1fr))",
      },
      12: {
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
      },
    },
    rows: {
      1: {
        gridTemplateRows: "repeat(1, minmax(0, 1fr))",
      },
      2: {
        gridTemplateRows: "repeat(2, minmax(0, 1fr))",
      },
      3: {
        gridTemplateRows: "repeat(3, minmax(0, 1fr))",
      },
      4: {
        gridTemplateRows: "repeat(4, minmax(0, 1fr))",
      },
      5: {
        gridTemplateRows: "repeat(5, minmax(0, 1fr))",
      },
      6: {
        gridTemplateRows: "repeat(6, minmax(0, 1fr))",
      },
      7: {
        gridTemplateRows: "repeat(7, minmax(0, 1fr))",
      },
      8: {
        gridTemplateRows: "repeat(8, minmax(0, 1fr))",
      },
      9: {
        gridTemplateRows: "repeat(9, minmax(0, 1fr))",
      },
      10: {
        gridTemplateRows: "repeat(10, minmax(0, 1fr))",
      },
      11: {
        gridTemplateRows: "repeat(11, minmax(0, 1fr))",
      },
      12: {
        gridTemplateRows: "repeat(12, minmax(0, 1fr))",
      },
    },
  },
});

export default Grid;
