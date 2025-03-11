import { FC, SVGProps } from 'react';

interface PickupLocationProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const PickupLocation: FC<PickupLocationProps> = ({ size = 16, ...props }) => {
  return (
    <svg {...props} width={size} height={size} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 7.00094C7.00019 6.05491 7.26877 5.12834 7.77454 4.32886C8.2803 3.52938 9.0025 2.88978 9.85726 2.48436C10.712 2.07894 11.6642 1.92433 12.6034 2.03849C13.5425 2.15265 14.4299 2.5309 15.1627 3.1293C15.8954 3.72769 16.4433 4.52169 16.7428 5.41906C17.0423 6.31643 17.0811 7.28035 16.8546 8.19888C16.6282 9.1174 16.1458 9.95283 15.4634 10.6081C14.7811 11.2634 13.9269 11.7117 13 11.9009V17.0009C13 17.2662 12.8946 17.5205 12.7071 17.708C12.5196 17.8956 12.2652 18.0009 12 18.0009C11.7348 18.0009 11.4804 17.8956 11.2929 17.708C11.1054 17.5205 11 17.2662 11 17.0009V11.9009C9.87081 11.6701 8.85599 11.0563 8.12714 10.1635C7.3983 9.27063 7.00014 8.15349 7 7.00094ZM9.489 16.1009C9.50889 16.2308 9.50299 16.3634 9.47163 16.491C9.44028 16.6186 9.38408 16.7387 9.30626 16.8446C9.22843 16.9505 9.1305 17.04 9.01807 17.108C8.90564 17.176 8.7809 17.2212 8.651 17.2409C7.373 17.4359 6.358 17.7299 5.691 18.0559C5.356 18.2199 5.157 18.3689 5.054 18.4779C5.04683 18.4854 5.03982 18.4931 5.033 18.5009C5.066 18.5399 5.123 18.5969 5.223 18.6699C5.503 18.8769 5.972 19.1049 6.641 19.3139C7.968 19.7289 9.863 20.0009 12 20.0009C14.137 20.0009 16.032 19.7289 17.359 19.3139C18.029 19.1049 18.497 18.8769 18.777 18.6699C18.877 18.5969 18.934 18.5399 18.967 18.5009C18.9602 18.4931 18.9532 18.4854 18.946 18.4779C18.843 18.3689 18.644 18.2199 18.309 18.0559C17.642 17.7299 16.627 17.4359 15.349 17.2409C15.2177 17.2229 15.0912 17.179 14.977 17.1116C14.8628 17.0443 14.7632 16.955 14.6838 16.8488C14.6045 16.7426 14.547 16.6217 14.5149 16.4931C14.4827 16.3645 14.4764 16.2308 14.4963 16.0997C14.5163 15.9686 14.5621 15.8429 14.6311 15.7297C14.7001 15.6165 14.7909 15.5182 14.8983 15.4404C15.0056 15.3626 15.1274 15.307 15.2564 15.2767C15.3855 15.2464 15.5193 15.2421 15.65 15.2639C17.038 15.4739 18.272 15.8109 19.189 16.2599C19.646 16.4839 20.073 16.7599 20.397 17.1019C20.727 17.4489 21 17.9219 21 18.5009C21 19.3119 20.476 19.9009 19.966 20.2779C19.436 20.6699 18.733 20.9799 17.956 21.2229C16.386 21.7129 14.282 22.0009 12 22.0009C9.718 22.0009 7.613 21.7129 6.045 21.2229C5.267 20.9799 4.565 20.6699 4.035 20.2779C3.524 19.9009 3 19.3119 3 18.5009C3 17.9209 3.273 17.4489 3.603 17.1009C3.928 16.7589 4.354 16.4839 4.811 16.2609C5.728 15.8109 6.963 15.4749 8.349 15.2639C8.47889 15.244 8.61142 15.2499 8.73902 15.2813C8.86662 15.3127 8.9868 15.3689 9.09267 15.4467C9.19854 15.5245 9.28804 15.6224 9.35604 15.7349C9.42405 15.8473 9.46923 15.971 9.489 16.1009Z'
        fill='currentColor'
      />
    </svg>
  );
};
