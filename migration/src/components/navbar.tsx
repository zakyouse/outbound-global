import { Button } from "@heroui/button";
// import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
// import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { NavbarMenuToggle } from "@heroui/navbar";
// import { link as linkStyles } from "@heroui/theme";
// import clsx from "clsx";
import { BsFillTelephoneFill } from "react-icons/bs";

import logo from "../images/logo.png";

import { useConsultation } from "@/contexts/consultationContext";
import { siteConfig } from "@/config/site";
// import { ThemeSwitch } from "@/components/theme-switch";
// import {
//   TwitterIcon,
//   GithubIcon,
//   DiscordIcon,
//   HeartFilledIcon,
//   SearchIcon,
// } from "@/components/icons";
export const Navbar = () => {
  // const searchInput = (
  //   <Input
  //     aria-label="Search"
  //     classNames={{
  //       inputWrapper: "bg-default-100",
  //       input: "text-sm",
  //     }}
  //     endContent={
  //       <Kbd className="hidden lg:inline-block" keys={["command"]}>
  //         K
  //       </Kbd>
  //     }
  //     labelPlacement="outside"
  //     placeholder="Search..."
  //     startContent={
  //       <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
  //     }
  //     type="search"
  //   />
  // );
  const { setConsultation } = useConsultation();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" shouldHideOnScroll={true}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="-m-8 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <img alt="Logo" className="h-10" src={logo} />
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-4 ">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link className="text-lg" color="foreground" href={item.href}>
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>
      <NavbarMenuToggle className="z-30 md:hidden cursor-pointer" />
      <div className="flex items-center gap-6">
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          {/* <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
          <NavbarItem className="hidden md:flex">
            <Button
              isExternal
              as={Link}
              className="text-sm font-normal text-mywhite bg-mygreen"
              startContent={<BsFillTelephoneFill />}
              variant="flat"
              onPress={() => setConsultation(true)}
            >
              Book Appointment
            </Button>
          </NavbarItem>
        </NavbarContent>
      </div>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="text-mygreen" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
