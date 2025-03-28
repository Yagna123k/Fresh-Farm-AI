"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
} from "@tabler/icons-react"

import {
  IconCloud,
  IconFlask,
  IconTrendingUp,
  IconHeart,
  IconUsers,
  IconCpu,
  IconLanguage,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Crop Quality",
      url: "/crop-quality",
      icon: IconCamera,
    },
    {
      title: "Weather",
      url: "/weather",
      icon: IconCloud,
    },
    {
      title: "Farming Tips",
      url: "/farming-tips",
      icon: IconFlask,
    },
    {
      title: "Market Prices",
      url: "/market-prices",
      icon: IconTrendingUp,
    },
    {
      title: "Farm Health",
      url: "/farm-health",
      icon: IconHeart,
    },
    {
      title: "Community",
      url: "/community",
      icon: IconUsers,
    },
    {
      title: "Automation",
      url: "/automation",
      icon: IconCpu,
    },
    {
      title: "Language",
      url: "/language",
      icon: IconLanguage,
    },
  ],
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
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Fresh Farm AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
