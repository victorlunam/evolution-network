import {
  Button,
  Card,
  Container,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import logo from "@assets/brand.png";
import Centered from "@components/Centered";
import Page from "@components/Page";
import { Form, FormSubmitEvent, useValidation } from "@components/Form";
import useAuth from "@store/auth";
import { Navigate, useLocation } from "react-router-dom";
import signInRequestSchema, { SignInRequest } from "@models/signInRequest";
import { useState } from "react";
import { AuthController } from "@controllers/index";

const LoginPage = () => {
  const { state } = useLocation();
  const { register } = useValidation(signInRequestSchema);
  const [error, setError] = useState<string>();
  const { user, signIn } = useAuth();

  const handleSubmit = async ({
    values,
    error,
  }: FormSubmitEvent<SignInRequest>) => {
    if (error) {
      setError(error);

      return;
    }

    const resSession = await AuthController.signIn(values);
    if (!resSession.status) {
      setError(resSession.message);

      return;
    }

    signIn(resSession.value!);
    setError(undefined);
  };

  if (user) {
    const from = state?.from || "/home";

    return <Navigate to={from} replace />;
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
          <Form onSubmit={handleSubmit} schema={signInRequestSchema}>
            <Card>
              <Card.Header style={{
                display: 'flex',
                flexDirection: 'column',
                gap : '1rem',

              }}>
                <img
                  alt="evolution network logo"
                  src={logo}
                  style={{
                    width: "min(20%,325px)",
                    margin: "auto",
                  }}
                />

                Agent Referral System
              </Card.Header>
              <Card.Body>
                <Spacer />
                <Input
                  {...register("username")}
                  aria-label="Usuario"
                  placeholder="Username"
                  fullWidth
                />
                <Spacer />
                <Input.Password
                  {...register("password")}
                  aria-label="Contraseña"
                  placeholder="Password"
                  fullWidth
                />
                <Spacer />
                <Row
                  justify="center"
                  wrap="wrap"
                  css={{
                    gap: "$5",
                  }}
                >
                  <Button type="submit">Login</Button>
                  {/* <Button light>Olvide mi Contraseña</Button> */}
                </Row>

                {error && (
                  <Text color="error" size="$xs">
                    {error}
                  </Text>
                )}
              </Card.Body>
            </Card>
          </Form>
        </Container>
      </Centered>
    </Page>
  );
};

export default LoginPage;
