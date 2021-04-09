import { createPortal } from 'react-dom';
import Template from 'react-loader-spinner';

import styles from './Loader.module.scss';

const loaderRoot = document.querySelector('#loader-root');

const Loader = () => {
  return createPortal(
    <div className={styles.Loader}>
      <Template type="Audio" color="#02be6e" height={100} width={100} />
    </div>,
    loaderRoot,
  );
};

export default Loader;

// const Loader = () => {
//   return createPortal(
//     <>
//       <div className={styles.Container}>
//         <div className={styles.SpinnerContainer}>
//           <div className={styles.SpinnerPath}>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//           </div>
//         </div>
//       </div>

//       <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//         <defs>
//           <filter id="gooey">
//             <feGaussianBlur
//               in="SourceGraphic"
//               stdDeviation="10"
//               result="blur"
//             />
//             <feColorMatrix
//               in="blur"
//               mode="matrix"
//               values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
//               result="goo"
//             />
//             <feBlend in="SourceGraphic" in2="goo" />
//           </filter>
//         </defs>
//       </svg>
//     </>,
//     loaderRoot,
//   );
// };

// export default Loader;
