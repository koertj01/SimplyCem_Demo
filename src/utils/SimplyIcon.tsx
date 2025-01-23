import { Icon, useTheme } from '@mui/material';

interface IProps {
  size?: number; // Optional prop to control the size of the icon
}

const SimplyIcon = ({ size = 24 }: IProps) => {
  const theme = useTheme(); // Access MUI theme for colors

  return (
    <Icon
      style={{ 
        width: size, // Scale the icon based on the size prop
        height: size, 
        backgroundColor: theme.palette.background.paper, // Use MUI theme background color
        borderRadius: '4px', // Optional: Add some styling for better visuals
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 310.000000 296.000000" 
        preserveAspectRatio="xMidYMid meet" 
        style={{ width: '100%', height: '100%' }}
      >
        <g 
          transform="translate(0.000000,296.000000) scale(0.100000,-0.100000)"
          fill="#000000" 
          stroke="none"
        >
          <path d="M0 1480 l0 -1480 1550 0 1550 0 -2 698 c0 383 -3 681 -5 662 -8 -78  ... (SVG path content here) ..." />
        </g>
      </svg>
    </Icon>
  );
};

export default SimplyIcon;
