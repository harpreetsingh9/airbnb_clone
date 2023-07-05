import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div
      className=" w-full border-[1px] md:w-auto py-2 rounded-full shadow-sm
     hover:shadow-md transition cursor-pointer"
    >
      <div className=" flex flex-row items-center justify-between">
        <div className=" px-6 text-sm font-semibold">Anywhere</div>
        <div
          className=" hidden sm:block border-x-[1px] flex-1 text-center
         px-6 text-sm font-semibold"
        >
          Any Week
        </div>
        <div className="pl-6 text-sm pr-2 text-gray-600 items-center flex flex-row text-center gap-3">
          <div className="hidden sm:block text-center">Add Guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
