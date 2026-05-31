'use client';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'var(--accent-primary)',
  speed = '6s',
  thickness = 1,
  children,
  innerClassName = '',
  ...rest
}) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[50px] ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className={`relative z-1 bg-background text-primary text-center rounded-[50px] ${innerClassName}`}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
