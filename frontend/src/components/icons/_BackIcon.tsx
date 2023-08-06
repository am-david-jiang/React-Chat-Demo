import { _IconProps } from "./Icon";

export default function _BackIcon(props: _IconProps) {
  // const normalColor = "#464646";
  // const size = 24;

  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19 12H5M5 12L12 19M5 12L12 5'
        stroke={props.color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
