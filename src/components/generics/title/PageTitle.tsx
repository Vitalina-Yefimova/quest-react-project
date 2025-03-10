import "../../../index.css";

interface PageTitleProps {
  className: string;
  overline: string;
  title: string;
}

export default function PageTitle({
  overline,
  title,
  className = "",
}: PageTitleProps): React.ReactElement {
  return (
    <div className={`${className}`}>
      <h4 className="text-[#F2890F] text-sm font-medium leading-[144%]">
        {overline}
      </h4>
      <h1 className="text-[#FFF] text-6xl not-italic font-extrabold leading-[70.4px]">
        {title}
      </h1>
    </div>
  );
}
