import "../../../index.css";
import CustomCursorWrapper from "../customCursor/CustomCursorWrapper";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <CustomCursorWrapper>
      <button className={`${className}`} onClick={onClick}>
        {children}
      </button>
    </CustomCursorWrapper>
  );
};

export default Button;
