export const Button = ({ children, textOnly, className, ...props }) => {
  const cssClasses = `${textOnly ? 'text-button' : 'button'}`.concat(
    className ? ` ${className}` : ''
  );

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};
