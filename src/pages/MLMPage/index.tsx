import Layout from "@components/Layout";
import { Button, Container, Spacer, useModal } from "@nextui-org/react";
import MLMTable from "./MLMTable";
import UserModal from "./UserModal";
import useAuth from "@store/auth";
import { MLMController } from "@controllers/index";
import { useRequest } from "ahooks";

const MLMPage = () => {
  const { user } = useAuth();
  const {
    setVisible,
    bindings: { open, onClose },
  } = useModal();

  const { data, refresh } = useRequest(() =>
    MLMController.searchOrganization(user!.userId)
  );

  return (
    <Layout>
      <Container display="flex" justify="flex-end">
        <Button onPress={() => setVisible(true)}>Link</Button>
        <Button onPress={() => setVisible(true)}>Agregar</Button>
      </Container>
      <Spacer y={1} />

      <MLMTable data={data?.value ?? []} />

      {open && <UserModal onSave={refresh} onClose={onClose} />}
    </Layout>
  );
};

export default MLMPage;
