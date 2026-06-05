import * as React from 'react';

interface FavoriteIconProps extends React.SVGProps<SVGSVGElement> {
  isFavorite?: boolean;
}

const FavoriteIcon = ({ isFavorite, ...props }: FavoriteIconProps) => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path
      d="M26.62 34.81C26.28 34.93 25.72 34.93 25.38 34.81C22.48 33.82 16 29.69 16 22.69C16 19.6 18.49 17.1 21.56 17.1C23.38 17.1 24.99 17.98 26 19.34C27.01 17.98 28.63 17.1 30.44 17.1C33.51 17.1 36 19.6 36 22.69C36 29.69 29.52 33.82 26.62 34.81Z"
      stroke={isFavorite ? 'red' : 'white'}
      strokeWidth="2"
      fill={isFavorite ? 'red' : 'transparent'}
    />
  </svg>
);

export default FavoriteIcon;
