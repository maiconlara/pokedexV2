"use client";

import Image from "next/image";
import { useQueryState } from "nuqs";
import { useTranslation } from "next-i18next";
interface TypeButtonProps {
  type: string;
  title: string;
}

const TypeButton = ({ type, title }: TypeButtonProps) => {
  const { t } = useTranslation();

  const setTypeParam = useQueryState("type")[1];

  const handleTypeParam = () => {
    setTypeParam(title);
  };

  return (
    <div
      onClick={handleTypeParam}
      className="w-full flex flex-row gap-3 items-center rounded-lg px-2 py-1 transition-colors cursor-pointer hover:bg-white/10"
    >
      <Image src={type} alt="" width={24} height={24}></Image>
      <p className="font-medium text-base">{t(title)}</p>
    </div>
  );
};
export default TypeButton;
