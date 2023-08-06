import { _IconProps } from "./Icon";

export default function _SendIcon(props: _IconProps) {
  // const normalColor = "#464646";
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
        d='M12.2494 15.7501L24.4994 3.50006M12.3983 16.1328L15.4644 24.0171C15.7345 24.7117 15.8696 25.059 16.0642 25.1604C16.2329 25.2483 16.4338 25.2484 16.6026 25.1607C16.7974 25.0595 16.9328 24.7124 17.2038 24.0182L24.8925 4.31579C25.1371 3.68908 25.2593 3.37573 25.1925 3.1755C25.1344 3.00161 24.9979 2.86514 24.824 2.80705C24.6238 2.74016 24.3104 2.86245 23.6837 3.10702L3.98134 10.7957C3.28709 11.0667 2.93996 11.2021 2.8388 11.3969C2.75111 11.5657 2.75122 11.7666 2.83912 11.9353C2.94051 12.1299 3.28779 12.265 3.98236 12.5351L11.8667 15.6012C12.0077 15.656 12.0782 15.6835 12.1375 15.7258C12.1902 15.7633 12.2362 15.8093 12.2737 15.862C12.316 15.9213 12.3435 15.9918 12.3983 16.1328Z'
        stroke={props.color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}