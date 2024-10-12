import { useLocation, Link } from "react-router-dom";

interface InternalLinkProps {
  path: string;
  children: React.ReactNode;
}

export default function InternalLink({ path, children }: InternalLinkProps) {
  const currentLocationPath = useLocation().pathname;

  return (
    <Link to={path}>
      <div
        className={`${
          currentLocationPath === path
            ? "bg-blue-500 text-white"
            : "bg-white text-black hover:text-white"
        } hover:bg-blue-700 font-bold p-2 rounded w-fit flex items-center`}
      >
        {children}
      </div>
    </Link>
  );
}
