import * as React from "react";
import "./index.scss";

interface RowProps {
  children: React.ReactNode;
  className?: string;
  props?: React.ReactNode;
}

export const Row: React.SFC<RowProps> = ({
  children,
  className = "",
  ...props
}) => {
  const rowClassNames = ["mako-grid__row"]
    .concat(className)
    .join(" ")
    .trim();
  return (
    <div className={rowClassNames} {...props}>
      {children}
    </div>
  );
};
