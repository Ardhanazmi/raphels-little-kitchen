import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem = ({ href, label }: NavItemProps) => {
  return (
    <Link href={href} className="hover:text-brand">
      {label}
    </Link>
  );
};

export default NavItem;
