import { DropletSvg } from '@/lib/components/svgs';
import styles from './drops.module.css';

interface RaindropsProps {
  fill?: string;
}

export default function Raindrops({ fill = '#176b87' }: RaindropsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.drop}>
        <DropletSvg fill={fill}></DropletSvg>
      </div>
      <div className={styles.drop}>
        <DropletSvg fill={fill}></DropletSvg>
      </div>
      <div className={styles.drop}>
        <DropletSvg fill={fill}></DropletSvg>
      </div>
      <div className={styles.drop}>
        <DropletSvg fill={fill}></DropletSvg>
      </div>
      <div className={styles.drop}>
        <DropletSvg fill={fill}></DropletSvg>
      </div>
      <div className={styles.drop}>
        <DropletSvg fill={fill}></DropletSvg>
      </div>
      <div className={styles.drop}>
        <DropletSvg fill={fill}></DropletSvg>
      </div>
      <div className={styles.drop}>
        <DropletSvg fill={fill}></DropletSvg>
      </div>
    </div>
  );
}
