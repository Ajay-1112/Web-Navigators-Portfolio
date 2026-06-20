"use client";

import { FolderOpen, Mail, Wrench } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { scrollToContactSection } from "@/components/contact-link";
import type { PortfolioData } from "@/types/portfolio";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type CommandMenuProps = {
  data: PortfolioData;
};

export function CommandMenu({ data }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable
      );
    };

    const down = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;

      const key = event.key?.toLowerCase();
      if (key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-command-menu", handler);
    return () => window.removeEventListener("open-command-menu", handler);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const goToContact = () => {
    if (pathname === "/") {
      scrollToContactSection();
      return;
    }
    router.push("/#contact");
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={data.ui.commandPlaceholder} />
      <CommandList>
        <CommandEmpty>{data.ui.noProjectsDescription}</CommandEmpty>
        <CommandGroup heading={data.ui.commandTitle}>
          <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
            <FolderOpen />
            <span>{data.ui.commandProjects}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/#services"))}>
            <Wrench />
            <span>{data.ui.commandServices}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(goToContact)}>
            <Mail />
            <span>{data.ui.commandContact}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
