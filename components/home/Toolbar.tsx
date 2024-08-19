"use client";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

const Toolbar = () => {
  return (
    <div className="bg-[#E2E2E2] rounded-[20px] py-[10px] px-3 flex items-center gap-5 fixed top-5 right-5 w-32 justify-center">
      <Link href={"/"}>
        <FiSearch
          height={20}
          width={20}
          color="#121268"
          className="block w-5 h-5"
        />
      </Link>
      <Link href={"/"}>
        <AiOutlineUser
          height={20}
          width={20}
          color="#121268"
          className="block w-[22px] h-[22px]"
        />
      </Link>
    </div>
  );
};

export default Toolbar;
