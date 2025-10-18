"use client";

import {
  LucideArchive,
  LucideBlocks,
  LucideDollarSign,
  LucideEgg,
  LucideHelpCircle,
  LucideHome,
  LucideSearch,
  LucideSettings,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { INav } from "@/types/nav";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

type IData = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  nav: INav;
};

const data: IData = {
  user: {
    name: "Johny",
    email: "me@example.com",
    avatar: "/avatars/johny.jpg",
  },
  nav: {
    main: [
      {
        key: "dashboard",
        items: [
          {
            title: "Dashboard",
            href: "/",
            icon: LucideHome,
          },
          {
            title: "POS",
            href: "#",
            // icon: IconCurrencyBitcoin,
            icon: LucideDollarSign,
          },
        ],
      },
      {
        key: "inventory",
        groupLabel: "Inventory",
        items: [
          {
            title: "Products",
            href: "/products",
            icon: LucideArchive,
          },
          {
            title: "Categories",
            href: "/categories",
            icon: LucideBlocks,
          },
        ],
      },
    ],
    secondary: [
      {
        title: "Settings",
        href: "#",
        icon: LucideSettings,
      },
      {
        title: "Get Help",
        href: "#",
        icon: LucideHelpCircle,
      },
      {
        title: "Search",
        href: "#",
        icon: LucideSearch,
      },
    ],
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <LucideEgg className="!size-5" />
                <span className="text-base font-semibold">
                  {process.env.NEXT_PUBLIC_APP_NAME}.
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={data.nav.main} />
        <NavSecondary items={data.nav.secondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
