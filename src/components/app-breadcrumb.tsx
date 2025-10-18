"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Crumb } from "@/types/crumb";

export function AppBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const items = segments.map<Crumb>((segment, index) => ({
    label: decodeURIComponent(segment).replaceAll("-", " "),
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));

  // // use Signal
  // const [crumbItems, setItems] = useState(breadcrumbSignal.value);
  // useSignalEffect(() => {
  //   setItems(breadcrumbSignal.value);
  // });

  // useEffect(() => {
  //   breadcrumbSignal.value = [];
  // }, [pathname]);

  // const crumbs = useMemo(
  //   () => (crumbItems.length ? crumbItems : items),
  //   [crumbItems, items]
  // );

  if (!items.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          return (
            <Fragment key={item.label}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {item.label}
                  </BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink className="capitalize" asChild>
                    <Link href={item.href as never}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="capitalize">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
