export const LeftPageButton = () => {
  return (
    <>
      <svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26 17L20 23L26 29"
          stroke="#667085"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="0.25"
          y="0.25"
          width="45.5"
          height="45.5"
          rx="22.75"
          stroke="#A2ADC5"
          strokeWidth="0.5"
        />
      </svg>
    </>
  );
};

export const RightPageButton = () => {
  return (
    <>
      <svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 29L26 23L20 17"
          stroke="#667085"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="45.75"
          y="45.75"
          width="45.5"
          height="45.5"
          rx="22.75"
          transform="rotate(-180 45.75 45.75)"
          stroke="#A2ADC5"
          strokeWidth="0.5"
        />
      </svg>
    </>
  );
};
