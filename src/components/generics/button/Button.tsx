import "../../../index.css";
import CustomCursorWrapper from "../customCursor/CustomCursorWrapper";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
}) => {
  return (
    <CustomCursorWrapper>
      <button className={`${className}`} onClick={onClick} type={type}>
        {children}
      </button>
    </CustomCursorWrapper>
  );
};

export default Button;
