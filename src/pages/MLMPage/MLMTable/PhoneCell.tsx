import { CellProps, StyledTableCell } from "@components/Table";
import { Text } from "@nextui-org/react";
import { MLMOrganization } from "@models/index";

const PhoneCell = ({ dataItem, field }: CellProps<MLMOrganization>) => {
  const cellValue = (dataItem[field!] as string) ?? "";

  return (
    <StyledTableCell
      css={{
        textAlign: "initial",
      }}
    >
      <Text b>{cellValue}</Text>
    </StyledTableCell>
  );
};

export default PhoneCell;
