import { CellProps, StyledTableCell } from "@components/Table";
import { MLMModel } from ".";
import { Col, Row, Tooltip } from "@nextui-org/react";
import IconButton from "@components/IconButton";
import { EditIcon, EyeIcon, TrashIcon } from "@components/icons";
import { TABLE_FIELD_DETAIL } from "@components/Table/utils";

const ActionCell = ({ rowIndex, dataItem, onChange }: CellProps<MLMModel>) => {
  const handleShowDetail = () => {
    onChange({
      field: TABLE_FIELD_DETAIL,
      rowIndex,
      value: !dataItem[TABLE_FIELD_DETAIL],
    });
  };

  return (
    <StyledTableCell>
      <Row justify="center" align="center">
        <Col css={{ d: "flex" }}>
          <Tooltip
            content="Detalles"
            onClick={handleShowDetail}
            css={undefined}
            color={undefined}
            contentColor={undefined}
          >
            <IconButton>
              <EyeIcon size={20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip
            content="Editar"
            css={undefined}
            color={undefined}
            contentColor={undefined}
          >
            <IconButton onClick={() => console.log("Edit user", dataItem.id)}>
              <EditIcon size={20} fill="#979797" />
            </IconButton>
          </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
          <Tooltip
            content="Borrar"
            color="error"
            onClick={() => console.log("Delete user", dataItem.id)}
            css={undefined}
            contentColor={undefined}
          >
            <IconButton>
              <TrashIcon size={20} fill="#FF0080" />
            </IconButton>
          </Tooltip>
        </Col>
      </Row>
    </StyledTableCell>
  );
};

export default ActionCell;
