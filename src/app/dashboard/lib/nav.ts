export function isActive(pathname: string, href: string) {
  const segmentCount = href.split("/").filter(Boolean).length;

  if (segmentCount === 1) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(href + "/");
}
