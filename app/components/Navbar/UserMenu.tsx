"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import { signOut } from "next-auth/react";

import useRegistermodel from "@/app/hooks/useRegisterModel";
import useLoginmodel from "@/app/hooks/useLoginModel";
import useRentmodel from "@/app/hooks/useRentModel";

import { SafeUser } from "@/app/types";
import Link from "next/link";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModel = useRegistermodel();
  const loginModel = useLoginmodel();
  const rentModel = useRentmodel();

  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-3/4 
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <Link href="/trips">
                  <MenuItem label="My trips" onClick={() => {}} />
                </Link>
                <Link href="/favorites">
                  <MenuItem label="My favorites" onClick={() => {}} />
                </Link>
                <Link href="/reservations">
                  <MenuItem label="My reservations" onClick={() => {}} />
                </Link>
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Airbnb my Home" onClick={rentModel.onOpen} />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModel.onOpen} />
                <MenuItem label="Signup" onClick={registerModel.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
