import styles from "./Button.module.scss";

type ButtonStlye = "basic" | "primary" | "secondary";

interface ButtonProps {
  style: ButtonStlye;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  customStyle?: React.CSSProperties;
}

const Button = ({
  style = "basic",
  onClick,
  disabled = false,
  customStyle,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${styles[style]}`}
      onClick={onClick}
      disabled={disabled}
      style={customStyle}
    >
      {children}
    </button>
  );
};

export default Button;
