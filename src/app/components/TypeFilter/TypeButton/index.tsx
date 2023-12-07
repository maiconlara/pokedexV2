import Image from "next/image";

interface TypeButtonProps {
  type: string;
  title: string;
}

const TypeButton = ({ type, title }: TypeButtonProps) => {
  return (
    <div className="w-full flex flex-row gap-3 md:w-[150px] items-center rounded-lg px-2 py-1 cursor-pointer hover:bg-white/10">
      <Image src={type} alt="" width={24} height={24}></Image>
      <p className="font-medium text-base">{title}</p>
    </div>
  );
};
export default TypeButton;
