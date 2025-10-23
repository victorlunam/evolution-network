import { DetailProps, Table, TableColumn } from "@components/Table";
import DetailCell from "./DetailCell";
import PhoneCell from "./PhoneCell";
import StateCell from "./StateCell";
import ActionCell from "./ActionCell";
import { useRequest } from "ahooks";
import { MLMController } from "@controllers/index";
import { MLMOrganization } from "@models/mlmOrganization";

const columns: TableColumn<MLMOrganization>[] = [
  { field: "fullName", title: "NAMES", cell: DetailCell },
  { field: "phone", title: "PHONE", cell: PhoneCell },
  { field: "isVerified", title: "STATUS", cell: StateCell },
  { title: "ACTIONS", cell: ActionCell },
];

const MLMTableDetail = ({ dataItem }: DetailProps<MLMOrganization>) => {
  const { data } = useRequest(() =>
    MLMController.searchOrganization(dataItem.childrenId),
  );

  return <MLMTable data={data?.value ?? []} />;
};

type MLMTableProps = {
  data: MLMOrganization[];
};

const MLMTable = ({ data }: MLMTableProps) => {
  return (
    <Table
      columns={columns}
      data={data}
      dataItemKey="id"
      detail={MLMTableDetail}
    />
  );
};

export default MLMTable;
