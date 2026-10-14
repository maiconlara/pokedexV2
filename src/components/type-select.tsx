"use client";

import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTranslation } from "next-i18next";
import { types } from "@/components/types";

const ALL_TYPES = "all";

const TypeSelect = () => {
  const { t } = useTranslation();
  const [params, setParams] = useQueryStates({
    type: parseAsString,
    page: parseAsInteger,
  });
  const selectedType = params.type ?? ALL_TYPES;

  return (
    <Select
      aria-label="Filtrar por tipo"
      items={types}
      radius="lg"
      disallowEmptySelection
      selectedKeys={[selectedType]}
      onSelectionChange={(keys) => {
        if (keys === "all") return;
        const [nextType] = Array.from(keys);
        if (!nextType) return;
        setParams({
          type: nextType === ALL_TYPES ? null : String(nextType),
          page: null,
        });
      }}
      renderValue={(items) =>
        items.map(
          (item) =>
            item.data && (
              <div key={item.key} className="flex items-center gap-2">
                <Image src={item.data.type} alt="" width={20} height={20} />
                <span className="font-medium text-gray-200">
                  {t(item.data.name)}
                </span>
              </div>
            )
        )
      }
      className="w-full md:hidden"
      classNames={{
        trigger: [
          "min-h-[40px]",
          "h-10",
          "shadow-xl",
          "bg-[#121326]",
          "data-[hover=true]:bg-[#1a1b38]",
        ],
        selectorIcon: "text-gray-300",
      }}
    >
      {(item) => (
        <SelectItem
          key={item.name}
          textValue={t(item.name)}
          startContent={
            <Image src={item.type} alt="" width={20} height={20} />
          }
        >
          {t(item.name)}
        </SelectItem>
      )}
    </Select>
  );
};
export default TypeSelect;
