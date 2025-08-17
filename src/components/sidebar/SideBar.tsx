import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import { CreatedClassesList } from "../lists/CreatedClassesList";
import { JoinedClassesList } from "../lists/JoinedClassesList";
import { JoinClassModal } from "../modals/JoinClassModal";
import CreateClassButton from "../CreateClassButton";

const SideBar = () => {
  const menu = (
    <>
      <JoinClassModal />
      <CreateClassButton />
      <CreatedClassesList />
      <JoinedClassesList />
    </>
  );

  return (
    <aside className="h-full  p-2 md:p-5">
      <div className="md:hidden bg-secondary">
        <Sheet>
          <SheetTrigger className="cursor-pointer">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left" className="max-w-sm p-4">
            <SheetHeader>
              <SheetTitle className="text-center">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4  flex flex-col items-center gap-3">{menu}</div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden h-full flex-col items-center md:flex gap-3">
        {menu}
      </div>
    </aside>
  );
};

export default SideBar;
