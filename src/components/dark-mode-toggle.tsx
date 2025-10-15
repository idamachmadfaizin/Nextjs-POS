"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideMonitor, LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactElement, useCallback, useEffect, useState } from "react";

export function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateTheme = useCallback(() => {
    switch (theme) {
      case "system":
        setTheme("light");
        break;
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      default:
        setTheme("system");
        break;
    }
  }, [setTheme, theme]);

  const iconMap: Record<string, ReactElement> = {
    system: <LucideSun />,
    light: <LucideMoon />,
    dark: <LucideSun />,
  };

  const textMap: Record<string, string> = {
    system: "light",
    light: "dark",
    dark: "light",
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <LucideMonitor />
      </Button>
    );
  }

  const current = resolvedTheme ?? "system";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={updateTheme}>
          {iconMap[current]}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Change to {textMap[current]}</p>
      </TooltipContent>
    </Tooltip>
  );
}
