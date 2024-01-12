import { useTranslation } from "next-i18next";
import { handleTypeColor } from "@/utils/handleTypeColor";

interface PokemonTypeProps {
  type: string;
}

const PokemonType = ({ type }: PokemonTypeProps) => {
  const { t } = useTranslation();

  const typeColor = handleTypeColor(type);

  return (
    <div
    style={typeColor}
      className="flex min-w-[50px] w-full  
  rounded-full items-center justify-center px-2 py-1 border-1 "
    >
      <p>{t(type)}</p>
    </div>
  );
};
export default PokemonType;
