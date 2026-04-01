import styles from './page.module.scss';
import skeletonStyles from './loading.module.scss';

export default function ProfileLoading() {
  return (
    <div className={styles.profilePage}>
      <div className={skeletonStyles.backgroundSkeleton} />

      <div className={styles.profileCard}>
        <div className={styles.profile}>
          <div className={`${styles.avatar} ${skeletonStyles.pulse}`} />
          <div className={styles.info}>
            <div className={`${skeletonStyles.pulse} ${skeletonStyles.nameLine}`} />
            <div className={`${skeletonStyles.pulse} ${skeletonStyles.bioLine}`} />
          </div>
        </div>

        <div className={styles.links}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={`${skeletonStyles.pulse} ${skeletonStyles.linkButton}`} />
          ))}
        </div>

        <div className={`${skeletonStyles.pulse} ${skeletonStyles.likeButton}`} />
      </div>
    </div>
  );
}
