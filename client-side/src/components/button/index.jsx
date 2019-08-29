import React from 'react';
import './button.css';

const Button = (props) => {
  const {
    className,
    children,
    href,
    onClick,
    variant,
    value,
    ...rest
  } = props;

  const classStack = className + ' ' + variant;

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      className={classStack}
      href={href}
      onClick={onClick}
      variant={variant}
      value={value}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Button.defaultProps = {
  className: 'button',
  variant: 'secondary',
};

// primary, secondary, transparent

export default Button;
