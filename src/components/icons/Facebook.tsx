import { FC, SVGProps } from "react";

interface FacebookProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Facebook: FC<FacebookProps> = ({ size = 16, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M20 10.0004C20 4.47754 15.5229 0.000389099 10 0.000389099C4.47715 0.000389099 0 4.47754 0 10.0004C0 14.9917 3.65686 19.1287 8.4375 19.8789V12.891H5.89844V10.0004H8.4375V7.79726C8.4375 5.29101 9.93043 3.90664 12.2146 3.90664C13.3087 3.90664 14.4531 4.10195 14.4531 4.10195V6.56289H13.1921C11.9499 6.56289 11.5625 7.33373 11.5625 8.12455V10.0004H14.3359L13.8926 12.891H11.5625V19.8789C16.3431 19.1287 20 14.9917 20 10.0004Z"
        fill="currentColor"
      />
      <path
        d="M13.8926 12.8906L14.3359 10H11.5625V8.12416C11.5625 7.33334 11.9499 6.5625 13.1921 6.5625H14.4531V4.10156C14.4531 4.10156 13.3087 3.90625 12.2146 3.90625C9.93043 3.90625 8.4375 5.29062 8.4375 7.79688V10H5.89844V12.8906H8.4375V19.8785C8.94662 19.9584 9.46844 20 10 20C10.5316 20 11.0534 19.9584 11.5625 19.8785V12.8906H13.8926Z"
        fill="#fff"
      />
    </svg>
  );
};
