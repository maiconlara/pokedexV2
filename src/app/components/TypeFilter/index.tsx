import { types } from "@/app/components/TypeFilter/types";

import TypeButton from "./TypeButton";

const TypeFilter = () => {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-col m-4 p-4 gap-4 md:-w-[20vw] rounded-lg">
      {types.map((type) => {
        return <TypeButton type={type.type} title={type.name} key={type.id} />;
      })}
    </div>
  );
};
export default TypeFilter;
