import { useTranslation } from 'next-i18next'

interface PokemonTypeProps {
  type: string;
}

const PokemonType = ({ type }: PokemonTypeProps) => {

  const {t} = useTranslation()

//  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  return <div className="flex min-w-[50px] w-full bg-[#ad985e] 
  rounded-full items-center justify-center px-2 py-1 border-1 border-[#927d44]">
    <p>
    {t(type)}
    {/* {formattedType} */}
    </p>
    </div>;
};
export default PokemonType;
