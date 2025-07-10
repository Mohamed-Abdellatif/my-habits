import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink, Outlet, useLocation } from "react-router";

export default function NavbarLayout() {
  const location = useLocation();
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Habit Tracker</h1>
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/"
                    className={location.pathname === "/" ? "text-blue-700 border" : ""}
                  >
                    Habits
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/add"
                    className={
                      location.pathname === "/add"
                        ? "text-blue-700 border"
                        : ""
                    }
                  >
                    Add Habit
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/calendar"
                    className={
                      location.pathname === "/calendar"
                        ? "text-blue-700 border"
                        : ""
                    }
                  >
                    Calendar
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
}
