import Navigation from '../Navigation';
import styles from './AppBar.module.scss';

const AppBar = () => {
  return (
    <header className={styles.Header}>
      <Navigation />
    </header>
  );
};

export default AppBar;
