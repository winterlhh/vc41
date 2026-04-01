import Image from 'next/image';
import { SocialButton } from '@ds/storybook';
import styles from './page.module.scss';
import LikeButtonClient from './LikeButtonClient';
import { getProfileData, getSocialLinks, getStrapiMediaUrl } from '../../lib/strapi';
import fallback from './profile.data.json';

const InstagramIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="40" rx="12" stroke="white" strokeWidth="3" />
    <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="3" />
    <circle cx="36" cy="12" r="3" fill="white" />
  </svg>
);

const MediumIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="14" cy="24" rx="10" ry="12" fill="white" />
    <ellipse cx="30" cy="24" rx="5" ry="11" fill="white" />
    <ellipse cx="42" cy="24" rx="2" ry="10" fill="white" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="40" rx="4" stroke="white" strokeWidth="3" />
    <path d="M14 20V34" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <circle cx="14" cy="14" r="3" fill="white" />
    <path
      d="M22 34V26C22 22.6863 24.6863 20 28 20C31.3137 20 34 22.6863 34 26V34"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path d="M22 20V34" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon />,
  medium:    <MediumIcon />,
  linkedin:  <LinkedinIcon />,
};

export default async function ProfilePage() {
  // Fetch both resources in parallel; each returns null / [] on failure.
  const [profileData, socialLinksData] = await Promise.all([
    getProfileData(),
    getSocialLinks(),
  ]);

  const profile = {
    name:          profileData?.name          ?? fallback.profile.name,
    bio:           profileData?.bio           ?? fallback.profile.bio,
    avatarSrc:     profileData?.avatar
                     ? getStrapiMediaUrl(profileData.avatar.url)
                     : fallback.profile.avatarSrc,
    avatarAlt:     profileData?.avatarAlt
                     || profileData?.avatar?.alternativeText
                     || fallback.profile.avatarAlt,
    backgroundSrc: profileData?.backgroundSrc ?? fallback.profile.backgroundSrc,
    backgroundAlt: profileData?.backgroundAlt ?? fallback.profile.backgroundAlt,
  };

  const rawLinks = socialLinksData.length > 0 ? socialLinksData : fallback.socialLinks;

  const likeLabel = profileData?.likeLabel ?? fallback.actions.likeLabel;

  const socialLinks = rawLinks.map((link) => ({
    ...link,
    icon: iconMap[link.platform],
  }));

  return (
    <div className={styles.profilePage}>
      <Image
        src={profile.backgroundSrc}
        alt={profile.backgroundAlt}
        fill
        className={styles.backgroundImage}
        priority
      />

      <div className={styles.profileCard}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Image
              src={profile.avatarSrc}
              alt={profile.avatarAlt}
              width={120}
              height={120}
              priority
            />
          </div>
          <div className={styles.info}>
            <h1 className={styles.userName}>{profile.name}</h1>
            <p className={styles.userBio}>{profile.bio}</p>
          </div>
        </div>

        <div className={styles.links}>
          {socialLinks.map((link) => (
            <SocialButton
              key={link.platform}
              label={link.label}
              href={link.href}
              icon={link.icon}
              className={styles.socialButton}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <LikeButtonClient
            label={likeLabel}
            targetId={profileData?.documentId ?? 'default'}
            initialCount={profileData?.likeCount ?? 0}
          />
        </div>
      </div>
    </div>
  );
}
