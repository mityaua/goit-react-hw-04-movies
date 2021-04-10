import styles from './PageNotFound.module.scss';

const PageNotFound = () => (
  <h1 className={styles.error}>
    Error 404: Page Not Found{' '}
    <span role="img" aria-label="sheep">
      😮
    </span>
  </h1>
);

export default PageNotFound;
