import { CellProps, StyledTableCell } from "@components/Table";
import { User } from "@nextui-org/react";
import { MLMOrganization } from "@models/mlmOrganization";

const DetailCell = ({ dataItem, field }: CellProps<MLMOrganization>) => {
  const cellValue = (dataItem[field!] as string) ?? "";

  return (
    <StyledTableCell
      css={{
        textAlign: "initial",
      }}
    >
      <User
        squared
        text={cellValue.charAt(0)}
        name={cellValue}
        css={{ p: 0 }}
      />
    </StyledTableCell>
  );
};

export default DetailCell;
