import cn from 'classnames';
import styles from './loader.module.scss';

const Loader = () => {
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.loader)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export { Loader };
