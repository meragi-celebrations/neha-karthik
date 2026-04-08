import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface ContentSectionProps {
  children?: ReactNode;
  className?: string;
  reverse?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imageFull?: boolean;
  title?: string;
  subtitle?: string;
  description?: string;
  label?: string;
  buttonText?: string;
  buttonHref?: string;
  extraContent?: ReactNode;
}

const ContentSection = ({
  className = "",
  reverse = false,
  imageSrc,
  imageAlt = "Section Image",
  imageFull = false,
  title,
  subtitle,
  description,
  label,
  buttonText,
  buttonHref = "#",
  extraContent
}: ContentSectionProps) => {
  return (
    <section className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} bg-white min-h-[600px] border-b border-gray-100 ${className}`}>
      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-20">
        <div className="max-w-xl">
          {label && (
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6">
              {label}
            </p>
          )}
          
          {title && (
            <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
              {title}
            </h2>
          )}
          
          {subtitle && (
            <h3 className="text-2xl md:text-3xl font-serif mb-6 italic text-primary">
              {subtitle}
            </h3>
          )}

          {description && (
            <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-lg mb-10">
              {description}
            </p>
          )}

          {buttonText && (
            <Link 
              href={buttonHref}
              className="inline-flex items-center gap-3 border border-gray-200 px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:border-black transition-all group"
            >
              {buttonText}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          )}

          {extraContent}
        </div>
      </div>

      {/* Media Content */}
      <div className={`flex-1 relative ${imageFull ? 'h-[600px]' : 'h-[500px] m-10'} bg-gray-50 flex items-center justify-center overflow-hidden`}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill={imageFull}
            width={!imageFull ? 600 : undefined}
            height={!imageFull ? 450 : undefined}
            className={`object-cover ${imageFull ? 'contrast-110' : 'hover:scale-105 transition-transform duration-700'}`}
          />
        ) : (
          <div className="w-full h-full bg-gray-100"></div>
        )}
      </div>
    </section>
  );
};

export default ContentSection;
