"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { INavGroup } from "@/types/nav";
import Link from "next/link";

export function NavMain({ groups }: { groups: INavGroup[] }) {
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
            <SidebarMenuButton asChild>
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
