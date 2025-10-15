"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function AppBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const paths = segments.map((segment, index) => ({
    name: decodeURIComponent(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, i) => (
          <>
            {i === paths.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {path.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link href={path.href as never} className="capitalize">
                    {path.name}
                  </Link>
                </BreadcrumbLink>

                <BreadcrumbSeparator />
              </>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
