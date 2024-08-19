import Image from "next/image";

const AsideAdd = () => {
  return (
    <aside className="w-full">
      <Image
        className="w-full h-80% object-cover"
        src={"/aside-add.jpg"}
        alt="aside-add"
        unoptimized
        unselectable="off"
        width={100}
        height={200}
      />
    </aside>
  );
};

export default AsideAdd;
