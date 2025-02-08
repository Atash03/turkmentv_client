import Loader from "@/components/Loader";
import TossPage from "@/components/toss";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string }>;

const Page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  let type: "bije" | "cekilis";

  if (searchParams?.cekilis) {
    type = "cekilis";
  } else if (searchParams?.bije) {
    type = "bije";
  } else {
    notFound();
  }

  return (
    <Suspense fallback={<Loader />}>
      <TossPage
        type={type}
        id={searchParams?.cekilis ? searchParams?.cekilis : searchParams?.bije}
      />
    </Suspense>
  );
};

export default Page;
