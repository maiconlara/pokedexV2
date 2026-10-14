import { ReactNode } from "react";
import Link from "next/link";
import { ChevronIcon } from "@/assets/chevron-icon";

interface FeatureCardProps {
  href: string;
  title: string;
  description: string;
  action: string;
  preview: ReactNode;
  previewBackground: string;
  footer?: ReactNode;
}

const FeatureCard = ({
  href,
  title,
  description,
  action,
  preview,
  previewBackground,
  footer,
}: FeatureCardProps) => {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[#121326] shadow-xl transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      <div
        style={{ background: previewBackground }}
        className="flex h-40 items-center justify-center overflow-hidden px-6"
      >
        {preview}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{description}</p>
        {footer}
        <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-bold text-blue-400 transition-colors group-hover:text-blue-300">
          {action}
          <ChevronIcon className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};
export default FeatureCard;
