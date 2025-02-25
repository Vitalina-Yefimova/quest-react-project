const EllipseGreyIcon = (props) => (
  <svg
    width="28px"
    height="28px"
    viewBox="0 0 35 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Ellipse 3" filter="url(#filter0_d_10858_159)">
      <circle cx={18} cy={14} r={14} fill="#C6C4C2" />
      <circle cx={18} cy={14} r={13.5} stroke="black" />
    </g>
    <defs>
      <filter
        id="filter0_d_10858_159"
        x={0}
        y={0}
        width={36}
        height={36}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_10858_159"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_10858_159"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default EllipseGreyIcon;
