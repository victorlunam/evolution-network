import { CellProps, StyledTableCell } from "@components/Table";
import { styled } from "@nextui-org/react";
import { MLMModel } from ".";

const StyledBadge = styled("span", {
  display: "inline-block",
  textTransform: "uppercase",
  padding: "$2 $3",
  margin: "0 2px",
  fontSize: "10px",
  fontWeight: "$bold",
  borderRadius: "14px",
  letterSpacing: "0.6px",
  lineHeight: 1,
  boxShadow: "1px 2px 5px 0px rgb(0 0 0 / 5%)",
  alignItems: "center",
  alignSelf: "center",
  color: "$white",
  variants: {
    type: {
      complete: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      incomplete: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
    },
  },
  defaultVariants: {
    type: "incomplete",
  },
});

const StateCell = ({ field, dataItem }: CellProps<MLMModel>) => {
  const type = dataItem[field!] ? 'complete' : 'incomplete';
  const cellValue = dataItem[field!] ? 'ACTIVE' : 'INACTIVE';


  console.log(cellValue)

  return (
    <StyledTableCell>
      <StyledBadge type={type}>{cellValue}</StyledBadge>
    </StyledTableCell>
  );
};

export default StateCell;
