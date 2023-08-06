import { _IconProps } from "./Icon";

export default function _AddIcon(props: _IconProps) {
  // const normalColor = "#464646";
  // const hoverColor = "#5e5e5e";
  // const size = 28;

  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 9.33334V18.6667M9.33331 14H18.6666M25.6666 14C25.6666 20.4433 20.4433 25.6667 14 25.6667C7.55666 25.6667 2.33331 20.4433 2.33331 14C2.33331 7.55669 7.55666 2.33334 14 2.33334C20.4433 2.33334 25.6666 7.55669 25.6666 14Z'
        stroke={props.color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
