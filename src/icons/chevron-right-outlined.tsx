import createSvgIcon from '@material-ui/core/utils/createSvgIcon';

export const ChevronRightOutlined = createSvgIcon(
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 5l7 7-7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>,
  'ChevronRightOutlined'
);