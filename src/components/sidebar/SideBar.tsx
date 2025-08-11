import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import { CreatedClassesList } from "../CreatedClassesList";
import { JoinedClassesList } from "../JoinedClassesList";

const SideBar = () => {
  const menu = (
    <>
      <CreatedClassesList />
      <JoinedClassesList />
    </>
  );

  return (
    <aside className="h-full  p-2 md:p-5">
      <div className="md:hidden bg-secondary">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="mt-2 transition-opacity hover:opacity-75" />
          </SheetTrigger>
          <SheetContent side="left" className="max-w-sm p-4">
            <SheetHeader>
              <SheetTitle className="text-center">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4">{menu}</div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden h-full flex-col items-center md:flex">{menu}</div>
    </aside>
  );
};

export default SideBar;
