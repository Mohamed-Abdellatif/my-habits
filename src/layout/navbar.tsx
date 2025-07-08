import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink, Outlet } from "react-router";
import { cn } from "@/lib/utils";

export default function NavbarLayout() {
  const navItemClass = cn(
    "text-sm font-medium transition-colors px-4 py-2 rounded-md",
    "hover:text-primary hover:bg-muted",
    "data-[active=true]:bg-muted data-[active=true]:text-primary"
  );

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
                    className={({ isActive }) =>
                      cn(navItemClass, isActive && "bg-muted text-primary")
                    }
                  >
                    Habits
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/add"
                    className={({ isActive }) =>
                      cn(navItemClass, isActive && "data-[active=true]")
                    }
                  >
                    Add Habit
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/check"
                    className={({ isActive }) =>
                      cn(navItemClass, isActive && "data-[active=true]")
                    }
                  >
                    Complete Habit
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/calendar"
                    className={({ isActive }) =>
                      cn(navItemClass, isActive && "data-[active=true]")
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
