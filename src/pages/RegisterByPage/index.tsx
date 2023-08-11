import { useState } from "react";
import logo from "@assets/images/logo-v1.png";
import { Button, Card, Container, Input, Row, Text } from "@nextui-org/react";
import Centered from "@components/Centered";
import Page from "@components/Page";
import { Form, FormSubmitEvent, useValidation } from "@components/Form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Grid } from "@components/Grid";
import { useRequest, useSetState } from "ahooks";
import {
  AuthController,
  DepartmentController,
  DistrictController,
  ProvinceController,
} from "@controllers/index";
import Dropdown from "@components/Dropdown";
import { SignUpRequest, signUpRequestSchema } from "@models/index";
import { createFullName, createShortName } from "@utils/index";

const RegisterByPage = () => {
  const params = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async ({
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
      registerBy: params!.username,
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
    navigate("/login", {
      replace: true,
    });
  };

  if (!params?.username) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Page>
      <Centered
        css={{
          bg: "$brandBlue",
        }}
      >
        <Container
          css={{
            mw: "650px",
          }}
        >
          <Form onSubmit={handleSubmit} schema={signUpRequestSchema}>
            <Card>
              <Card.Header
                css={{
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "min(80%,325px)",
                    margin: "auto",
                  }}
                >
                  <Text
                    h1
                    css={{
                      textAlign: "end",
                      mt: "8px",
                      fontSize: 20,
                      "@xsMax": {
                        fontSize: 15,
                      },
                    }}
                    weight="bold"
                  >
                    Bienvenido a
                  </Text>
                </div>

                <img
                  alt="evolution network logo"
                  src={logo}
                  style={{
                    width: "min(80%,325px)",
                    margin: "auto",
                  }}
                />
              </Card.Header>

              <Card.Body>
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
              </Card.Body>

              <Card.Footer css={{ justifyContent: "center" }}>
                <Button auto type="submit">
                  Guardar
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        </Container>
      </Centered>
    </Page>
  );
};

export default RegisterByPage;
