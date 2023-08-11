import { Button, Input, Modal, Row, Text } from "@nextui-org/react";
import Dropdown from "@components/Dropdown";
import { Grid } from "@components/Grid";
import { useRequest, useSetState } from "ahooks";
import {
  AuthController,
  DepartmentController,
  DistrictController,
  ProvinceController,
} from "@controllers/index";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import signUpRequestSchema, { SignUpRequest } from "@models/signUpRequest";
import { createFullName, createShortName } from "@utils/createNames";
import { useState } from "react";
import { Form, FormSubmitEvent, useValidation } from "@components/Form";
import useAuth from "@store/auth";

type UserModalProps = {
  onSave: () => void;
  onClose: () => void;
};

const UserModal = ({ onSave, onClose }: UserModalProps) => {
  const { user } = useAuth();
  const [error, setError] = useState<string>();
  const { register } = useValidation(signUpRequestSchema);
  const [locationState, setLocationState] = useSetState({
    departmentId: "",
    provinceId: "",
  });

  const { data: departmentList } = useRequest(() =>
    DepartmentController.search("35d4897e-3d95-46db-9b20-c48643417cb6"),
  );
  const { data: provinceList } = useRequest(
    () => ProvinceController.search(locationState.departmentId),
    {
      ready: Boolean(locationState.departmentId),
      refreshDeps: [locationState.departmentId],
    },
  );
  const { data: districtList } = useRequest(
    () => DistrictController.search(locationState.provinceId),
    {
      ready: Boolean(locationState.provinceId),
      refreshDeps: [locationState.provinceId],
    },
  );

  const onSubmit = async ({
    values,
    error,
  }: FormSubmitEvent<SignUpRequest>) => {
    if (error) {
      setError(error);

      return;
    }

    const usernameAvailable = await AuthController.usernameAvailable(
      values.username,
    );

    if (!usernameAvailable.value) {
      setError("El usuario no esta disponible");

      return;
    }

    const res = await AuthController.signUp({
      registerBy: user!.username,
      dni: values.dni,
      names: values.names,
      lastNames: values.lastNames,
      fullName: createFullName(values.names, values.lastNames),
      shortName: createShortName(values.names, values.lastNames),
      dateOfBirth: values.dateOfBirth,
      departmentId: values.departmentId,
      provinceId: values.provinceId,
      districtId: values.districtId,
      address: values.address,
      phone: values.phone,
      email: values.email,
      emailConfirmation: values.emailConfirmation,
      username: values.username,
      password: values.password,
    });

    if (!res.value) {
      setError(res.message);

      return;
    }

    setError(undefined);
    onSave();
    onClose();
  };

  return (
    <Modal
      aria-labelledby="modal-new-partner"
      width="100%"
      css={{
        w: "max(350px, 50%)",
        m: "auto",
      }}
      closeButton
      open
      onClose={onClose}
    >
      <Form onSubmit={onSubmit} schema={signUpRequestSchema}>
        <Modal.Header>
          <Text>Nuevo Socio</Text>
        </Modal.Header>

        <Modal.Body>
          <Grid columns={2}>
            <Input
              {...register("names")}
              aria-label="Nombres"
              placeholder="Nombres"
              fullWidth
            />
            <Input
              {...register("lastNames")}
              aria-label="Apellidos"
              placeholder="Apellidos"
              fullWidth
            />

            <Input
              {...register("dni")}
              aria-label="dni"
              placeholder="DNI"
              maxLength={8}
              fullWidth
            />
            <Input
              {...register("dateOfBirth")}
              type="date"
              aria-label="Fecha de Nacimiento"
              placeholder="Fecha de Nacimiento"
              fullWidth
            />

            <Row
              css={{
                gridColumn: "span 2",
                gap: "$xs",
              }}
              wrap="wrap"
            >
              <Dropdown
                css={{
                  flex: "1",
                }}
                name="departmentId"
                placeholder="Departamento"
                data={departmentList?.value ?? []}
                dataItemKey="id"
                textField="name"
                onChange={(id) => setLocationState({ departmentId: id })}
              />
              <Dropdown
                css={{
                  flex: "1",
                }}
                name="provinceId"
                placeholder="Provincia"
                data={provinceList?.value ?? []}
                dataItemKey="id"
                textField="name"
                disabled={!locationState.departmentId}
                onChange={(id) => setLocationState({ provinceId: id })}
                resetFrom={locationState.departmentId}
              />
              <Dropdown
                css={{
                  flex: "1",
                }}
                name="districtId"
                placeholder="Distrito"
                data={districtList?.value ?? []}
                dataItemKey="id"
                textField="name"
                disabled={!locationState.provinceId}
                resetFrom={locationState.provinceId}
              />
            </Row>

            <Input
              {...register("address")}
              aria-label="Dirección"
              placeholder="Dirección"
              fullWidth
            />
            <Input
              {...register("phone")}
              aria-label="Celular"
              placeholder="Celular"
              fullWidth
            />

            <Text
              css={{
                gridColumn: "span 2",
                textAlign: "center",
              }}
            >
              Accesos
            </Text>

            <Input
              {...register("username")}
              aria-label="Usuario"
              placeholder="Usuario"
              fullWidth
            />
            <Input.Password
              {...register("password")}
              aria-label="Contraseña"
              placeholder="Contraseña"
              fullWidth
            />

            <Input
              {...register("email")}
              aria-label="Email"
              placeholder="Email"
              fullWidth
            />
            <Input
              {...register("emailConfirmation")}
              aria-label="Confirme Email"
              placeholder="Confirme Email"
              fullWidth
            />
          </Grid>

          {error && (
            <Text color="error" size="$xs">
              {error}
            </Text>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button auto flat color="error" onPress={onClose}>
            Cerrar
          </Button>
          <Button auto type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserModal;
