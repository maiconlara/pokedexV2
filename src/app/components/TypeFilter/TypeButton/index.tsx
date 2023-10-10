import Image from "next/image";

interface TypeButtonProps {
  type: string;
  title: string;
}

const TypeButton = ({ type, title }: TypeButtonProps) => {
  return (
    <div className="w-full flex flex-row gap-3 md:w-[200px] h-[30px] items-center">
      <Image src={type} alt="" width={24} height={24}></Image>
      <p className="font-medium text-base">{title}</p>
    </div>
  );
};
export default TypeButton;
