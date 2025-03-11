import { FC, SVGProps } from 'react';

interface Welcome2Props extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const Welcome2: FC<Welcome2Props> = ({ size = 112, ...props }) => {
  return (
    <svg {...props} width={size} height={size} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 112 112' fill='none'>
      <path
        d='M73.58 54.7C68.81 53.99 66.43 48.45 69.28 44.56C69.93 43.68 70.39 43.19 70.39 43.19L84.67 28.91L83.08 27.32L68.8 41.6C68.8 41.6 68.35 42.02 67.55 42.62C63.6 45.56 57.87 43.18 57.3 38.29C57.18 37.27 57.12 36.2 57.12 35.05V0.5H54.87V35.06C54.87 36.19 54.81 37.25 54.69 38.25C54.12 43.2 48.26 45.63 44.36 42.53C43.57 41.9 42.78 41.2 41.98 40.4L28.9 27.32L27.31 28.91L40.39 41.99C41.2 42.8 41.92 43.61 42.55 44.41C45.61 48.27 43.24 54 38.36 54.72C37.36 54.87 36.75 54.88 36.75 54.88H0.5V57.13H36.76C36.76 57.13 37.39 57.15 38.42 57.3C43.19 58.01 45.57 63.55 42.72 67.44C42.07 68.32 41.61 68.81 41.61 68.81L27.33 83.09L28.92 84.68L43.2 70.4C43.2 70.4 43.64 69.98 44.45 69.38C48.4 66.44 54.13 68.82 54.7 73.71C54.82 74.73 54.88 75.8 54.88 76.95V111.51H57.13V76.95C57.13 75.82 57.19 74.76 57.31 73.76C57.88 68.81 63.74 66.38 67.64 69.48C68.43 70.11 69.22 70.82 70.02 71.61L83.1 84.69L84.69 83.1L71.61 70.02C70.8 69.21 70.08 68.4 69.45 67.6C66.39 63.74 68.76 58.01 73.64 57.29C74.64 57.14 75.25 57.13 75.25 57.13H111.51V54.88H75.25C75.25 54.88 74.62 54.86 73.59 54.71L73.58 54.7Z'
        fill='currentColor'
      />
    </svg>
  );
};
