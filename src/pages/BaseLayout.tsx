import { Outlet } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InternalLink from "../components/InternalLink";

export default function BaseLayout() {
  const urlPaths = {
    favorites: "/favorites",
    home: "/",
  };

  return (
    <div className="bg-gray-100 min-h-[100vh] w-full flex flex-col">
      <header className=" ">
        <div className="bg-blue-500 text-white px-4 py-2">
          <h1 className="text-2xl">Wildlife Ranker</h1>
        </div>
        <section className="flex gap-2 mt-2 px-4">
          <InternalLink path={urlPaths.home}>
            <PetsIcon className="mr-2" />
            Home
          </InternalLink>
          <InternalLink path={urlPaths.favorites}>
            <FavoriteIcon className="mr-2" />
            Favorites
          </InternalLink>
        </section>
      </header>
      <main className="grow flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
