import Navigation from '../Navigation';
import styles from './AppBar.module.scss';

const AppBar = () => {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
};

export default AppBar;
