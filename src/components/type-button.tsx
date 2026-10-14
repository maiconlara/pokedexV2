"use client";

import Image from "next/image";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTranslation } from "next-i18next";
interface TypeButtonProps {
  type: string;
  title: string;
}

const TypeButton = ({ type, title }: TypeButtonProps) => {
  const { t } = useTranslation();

  const [params, setParams] = useQueryStates({
    type: parseAsString,
    page: parseAsInteger,
  });
  const isActive = (params.type ?? "all") === title;

  const handleTypeParam = () => {
    setParams({ type: title === "all" ? null : title, page: null });
  };

  return (
    <button
      type="button"
      onClick={handleTypeParam}
      aria-pressed={isActive}
      className={`w-full flex flex-row gap-3 items-center rounded-lg px-2 py-1 transition-colors cursor-pointer hover:bg-white/10 ${
        isActive ? "bg-white/10 text-blue-400" : ""
      }`}
    >
      <Image src={type} alt="" width={24} height={24}></Image>
      <p className="font-medium text-base">{t(title)}</p>
    </button>
  );
};
export default TypeButton;
