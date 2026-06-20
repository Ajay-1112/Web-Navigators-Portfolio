"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps, forwardRef } from "react";

type ContactLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: string;
};

export function scrollToContactSection() {
  const contact = document.getElementById("contact");
  if (!contact) return false;
  contact.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", "#contact");
  return true;
}

export const ContactLink = forwardRef<HTMLAnchorElement, ContactLinkProps>(
  function ContactLink({ href: _href, onClick, ...props }, ref) {
    const pathname = usePathname();

    return (
      <Link
        ref={ref}
        href="/#contact"
        scroll={pathname !== "/"}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;

          if (pathname === "/") {
            event.preventDefault();
            scrollToContactSection();
          }
        }}
        {...props}
      />
    );
  },
);
