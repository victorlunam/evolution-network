import { Fragment, Key, useEffect, useState } from "react";
import {
  StyledTable,
  StyledTableCell,
  StyledTableColumnHeader,
  StyledTableContainer,
  StyledTableHeaderRow,
  StyledTableRow,
  StyledTableRowGroup,
} from "./table.styles";
import { NormalizeData, TableChangeEvent, TableProps } from "./types";
import { TABLE_FIELD_DETAIL, normalizeData } from "./utils";

const Table = <T extends Record<string, any>>({
  columns,
  data,
  dataItemKey,
  detail: Detail,
}: TableProps<T>) => {
  const [innerData, setInnerData] = useState<NormalizeData<T>[]>([]);

  useEffect(() => {
    setInnerData(normalizeData(data));
  }, [data]);

  const handleChange = ({
    rowIndex,
    field,
    value,
  }: TableChangeEvent<NormalizeData<T>>) => {
    const copyData = innerData.slice();
    copyData[rowIndex][field] = value;

    setInnerData(copyData);
  };

  return (
    <StyledTableContainer>
      <StyledTable>
        <StyledTableRowGroup as="thead">
          <StyledTableHeaderRow>
            {columns.map((column) => (
              <StyledTableColumnHeader key={column.field || column.title}>
                {column.title ?? ""}
              </StyledTableColumnHeader>
            ))}
          </StyledTableHeaderRow>
        </StyledTableRowGroup>

        <StyledTableRowGroup as="tbody">
          {innerData.length === 0 && (
            <StyledTableRow>
              <StyledTableCell
                css={{ textAlign: "center" }}
                colSpan={columns.length}
              >
                Sin Datos
              </StyledTableCell>
            </StyledTableRow>
          )}
          {innerData.length > 0 &&
            innerData.map((item, itemIndex) => (
              <Fragment key={item[dataItemKey]}>
                <StyledTableRow>
                  {columns.map((column, columnIndex) => {
                    if ("cell" in column && column.cell) {
                      return (
                        <column.cell
                          key={column.field as Key}
                          field={column.field}
                          dataItem={item}
                          rowIndex={itemIndex}
                          colIndex={columnIndex}
                          onChange={handleChange}
                        />
                      );
                    }

                    return (
                      <StyledTableCell key={column.field}>
                        {item[column.field ?? ""] ?? null}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>

                {item[TABLE_FIELD_DETAIL] && (
                  <StyledTableRow>
                    <StyledTableCell
                      css={{ textAlign: "center" }}
                      colSpan={columns.length}
                    >
                      {Detail ? <Detail dataItem={item} /> : "detail"}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </Fragment>
            ))}
        </StyledTableRowGroup>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default Table;
