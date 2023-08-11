import { Link as RRDLink } from "react-router-dom";
import { Avatar, Dropdown, Navbar, Text } from "@nextui-org/react";
import { useAuth } from "@store/index";
import BrandLogo from "@components/BrandLogo/";

const menuItems = [
  {
    label: "Inicio",
    path: "/home",
  },
  {
    label: "Herramientas",
    path: "/tools",
  },
  {
    label: "MLM",
    path: "/mlm",
  },
];

const Navigation = () => {
  const { user, signOut } = useAuth();

  return (
    <Navbar isBordered>
      <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
      <Navbar.Brand>
        <BrandLogo to="/home" />
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
        {menuItems.map((menu) => (
          <Navbar.Item key={menu.path} to={menu.path}>
            <RRDLink to={menu.path}>{menu.label}</RRDLink>
          </Navbar.Item>
        ))}
      </Navbar.Content>

      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                size="md"
                text={user?.names.charAt(0)}
                // src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="primary"
            onAction={(actionKey) => {
              const selector: Record<string, Function> = {
                signOut,
              };

              selector[(actionKey as string) ?? ""]?.();
            }}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }} textValue={user!.shortName}>
              <Text b color="inherit" css={{ d: "flex" }}>
                {user!.shortName}
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                @{user!.username}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" css={{ height: "$18" }} textValue="Configuración">
              Configuración
            </Dropdown.Item>
            <Dropdown.Item key="signOut" withDivider color="error" textValue="Configuración">
              Cerrar Sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>

      <Navbar.Collapse>
        {menuItems.map((menu) => (
          <Navbar.CollapseItem key={menu.path}>
            <RRDLink
              to={menu.path}
              style={{
                color: "inherit",
                minWidth: "100%",
              }}
            >
              {menu.label}
            </RRDLink>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
