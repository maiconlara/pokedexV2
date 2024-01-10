import { types } from "@/components/types";

import TypeButton from "./type-button";

const TypeFilter = () => {
  return (
    <div className="hidden md:flex md:flex-col gap-2 md:w-[30vw] lg:w-[15vw] rounded-lg">
      {types.map((type) => {
        return <TypeButton type={type.type} title={type.name} key={type.id} />;
      })}
    </div>
  );
};
export default TypeFilter;
