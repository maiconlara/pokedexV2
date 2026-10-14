import { ReactNode } from "react";

interface DetailSectionProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

const DetailSection = ({ title, children, action }: DetailSectionProps) => {
  return (
    <section className="flex flex-col gap-5 rounded-2xl bg-[#121326] p-5 md:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold text-lg">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
};
export default DetailSection;
