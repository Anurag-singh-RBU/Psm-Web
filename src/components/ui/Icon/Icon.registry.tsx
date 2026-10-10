import type { IconDefinition } from "./Icon.types";

export const iconRegistry = {
  check: {
    viewBox: "0 0 24 24",
    content: (
      <path
        d="M5 12.5 9.5 17 19 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
    ),
  },

  close: {
    viewBox: "0 0 24 24",
    content: (
      <>
        <path d="m7 7 10 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.25" />
        <path d="m17 7-10 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.25" />
      </>
    ),
  },

  info: {
    viewBox: "0 0 48 48",
    content: (
      <>
        <path
          d="M19.1333 38.9046L19.146 38.85C19.058 39.221 19 39.602 19 40C19 42.761 21.239 45 24 45C26.761 45 29 42.761 29 40C29 39.603 28.942 39.221 28.854 38.85L28.8744 38.9387"
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit={10}
          strokeWidth={3}
        />
        <path
          d="M42 37V34C42 34 37 30 37 20V16C37 8.82 31.18 3 24 3C16.82 3 11 8.82 11 16V20C11 30 6 34 6 34V37C18 39.667 30 39.667 42 37Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit={10}
          strokeWidth={3}
        />
      </>
    ),
  },

  warning: {
    viewBox: "0 0 24 24",
    content: (
      <>
        <rect x="11" y="2" width="2" height="14" fill="currentColor" />
        <circle cx="12" cy="20.5" r="1.5" fill="currentColor" />
      </>
    ),
  },

  delete: {
    viewBox: "0 0 18 18",
    content: (
      <>
        <path
          d="M3.65771 5L4.1525 14.394C4.2287 15.8554 5.43569 17 6.89859 17H11.1027C12.5656 17 13.7726 15.8555 13.8488 14.3945L14.3436 5H3.65771Z"
          fill="currentColor"
          opacity="0.4"
        />
        <path
          d="M15.2501 5.5H2.75012C2.33602 5.5 2.00012 5.1641 2.00012 4.75C2.00012 4.3359 2.33602 4 2.75012 4H15.2501C15.6642 4 16.0001 4.3359 16.0001 4.75C16.0001 5.1641 15.6642 5.5 15.2501 5.5Z"
          fill="currentColor"
        />
        <path
          d="M11.2501 5.5C10.836 5.5 10.5001 5.1641 10.5001 4.75V2.75C10.5001 2.6123 10.3878 2.5 10.2501 2.5H7.75012C7.61242 2.5 7.50012 2.6123 7.50012 2.75V4.75C7.50012 5.1641 7.16422 5.5 6.75012 5.5C6.33602 5.5 6.00012 5.1641 6.00012 4.75V2.75C6.00012 1.7852 6.78532 1 7.75012 1H10.2501C11.2149 1 12.0001 1.7852 12.0001 2.75V4.75C12.0001 5.1641 11.6642 5.5 11.2501 5.5Z"
          fill="currentColor"
        />
        <path
          d="M7.37415 14C6.97965 14 6.64853 13.6909 6.62613 13.2915L6.37613 8.79149C6.35363 8.37789 6.67003 8.02387 7.08313 8.00097C7.48933 7.98487 7.85075 8.29399 7.87415 8.70849L8.12415 13.2085C8.14665 13.6221 7.83025 13.9761 7.41715 13.999C7.40255 13.9995 7.38885 14 7.37415 14Z"
          fill="currentColor"
        />
        <path
          d="M10.6261 13.9999C10.6115 13.9999 10.5978 13.9995 10.5831 13.999C10.17 13.9761 9.85363 13.6219 9.87613 13.2084L10.1261 8.70844C10.1495 8.29384 10.4982 7.98382 10.9171 8.00092C11.3302 8.02382 11.6466 8.37795 11.6241 8.79145L11.3741 13.2914C11.3516 13.6908 11.0206 13.9999 10.6261 13.9999Z"
          fill="currentColor"
        />
      </>
    ),
  },
} satisfies Record<string, IconDefinition>;
