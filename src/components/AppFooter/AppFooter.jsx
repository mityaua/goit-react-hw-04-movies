import styles from './AppFooter.module.scss';

const AppFooter = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        &copy; {new Date().getFullYear()} Trending movies
      </p>
    </footer>
  );
};

export default AppFooter;
