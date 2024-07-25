import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image } from "@nextui-org/react";

const NavBarNUI = ({ hasKey }) => {
  return (
    <Navbar position="static" className="bg-slate-950">
      <NavbarBrand>
        <Image
          className="h-14 w-14 mx-4 self-center"
          alt="Char Mix Logo"
          src="/public/charMixLogo.png"
        />
        <p className="font-bold text-inherit">Char Mix</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {!hasKey && (
            <Button color="primary" href="#" variant="flat">
              Insira sua chave
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBarNUI;
