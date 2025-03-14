import "../../../index.css";

interface DividerVectorProps {
  className: string;
}

export default function DividerVector({
  className = "",
}: DividerVectorProps): React.ReactElement {
  return <div className={`${className}`}></div>;
}
