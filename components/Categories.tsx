"use client";
import Category from "./Category";
import { v4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { Queries } from "@/api/queries";
import Loader from "./Loader";

const Categories = () => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: () => Queries.getCategories(),
  });

  if (isFetching) return <Loader />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-3">
      <Category id={0} name={"Hemme"} key={v4()} isInitial />
      {data
        ? data.data.map((category) => (
            <Category id={category.id} name={category.name} key={v4()} />
          ))
        : null}
    </ul>
  );
};

export default Categories;
