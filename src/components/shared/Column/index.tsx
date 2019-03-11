import * as React from "react";

import "./index.scss";

type Width = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Offset = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface ColumnProps {
  children?: React.ReactNode | string;
  className?: string;
  offset?: Offset;
  width?: Width;
  props?: React.ReactNode;
}

export const Column: React.SFC<ColumnProps> = ({
  children,
  className = "",
  width,
  offset,
  ...props
}) => {
  const widthClass = width ? `mako-grid__col-${width}` : "";
  const offsetClass = offset ? `col-start-${offset}` : "";
  const colClassNames = [widthClass, offsetClass]
    .filter(Boolean)
    .concat(className)
    .join(" ")
    .trim();
  return (
    <div className={colClassNames} {...props}>
      {children}
    </div>
  );
};
