"use client";

import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  const updateTheme = React.useCallback(() => {
    switch (theme) {
      case "system":
        setTheme("light");
        break;
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("system");
        break;
      default:
        setTheme("system");
        break;
    }
  }, [setTheme, theme]);

  const iconMap: Record<string, React.ReactElement> = {
    system: <Sun />,
    light: <Moon />,
    dark: <Monitor />,
  };

  const textMap: Record<string, string> = {
    system: "light",
    light: "dark",
    dark: "system",
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={updateTheme}>
          {iconMap[theme ?? "system"] ?? iconMap.dark}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Change to {textMap[theme ?? "system"] ?? textMap.dark}</p>
      </TooltipContent>
    </Tooltip>
  );
}
