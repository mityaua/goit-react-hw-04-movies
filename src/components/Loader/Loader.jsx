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
