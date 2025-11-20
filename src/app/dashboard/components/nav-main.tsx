"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { isActive } from "../lib/nav";
import { INavGroup } from "../types/nav";

export function NavMain({ groups }: { groups: INavGroup[] }) {
  const pathname = usePathname();

  return groups.map((group) => (
    <SidebarGroup
      key={group.key}
      className="group-data-[collapsible=icon]:hidden"
    >
      {group.groupLabel && (
        <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
      )}
      <SidebarMenu>
        {group.items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton isActive={isActive(pathname, item.href)} asChild>
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
