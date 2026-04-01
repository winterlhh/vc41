'use client';

import { useState } from 'react';
import { LikeButton } from '@ds/storybook';
import { likeProfile, unlikeProfile } from '../../lib/strapi';

function getLikedKey(targetId: string) {
  return `liked-${targetId}`;
}

interface Props {
  label: string;
  targetId: string;
  initialCount: number;
}

export default function LikeButtonClient({ label, targetId, initialCount }: Props) {
  const [liked, setLiked] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem(getLikedKey(targetId)) === 'true',
  );
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    if (loading) return;
    setLoading(true);

    if (!liked) {
      setLiked(true);
      setCount((c) => c + 1);
      try {
        const newCount = await likeProfile();
        if (newCount !== null) {
          setCount(newCount);
          localStorage.setItem(getLikedKey(targetId), 'true');
        } else {
          setLiked(false);
          setCount((c) => Math.max(0, c - 1));
        }
      } catch (err) {
        console.error('[LikeButtonClient like]', err);
        setLiked(false);
        setCount((c) => Math.max(0, c - 1));
      }
    } else {
      setLiked(false);
      setCount((c) => Math.max(0, c - 1));
      try {
        const newCount = await unlikeProfile();
        if (newCount !== null) {
          setCount(newCount);
          localStorage.removeItem(getLikedKey(targetId));
        } else {
          setLiked(true);
          setCount((c) => c + 1);
        }
      } catch (err) {
        console.error('[LikeButtonClient unlike]', err);
        setLiked(true);
        setCount((c) => c + 1);
      }
    }

    setLoading(false);
  }

  const displayLabel = count > 0 ? `${label} ${count}` : label;

  return (
    <LikeButton
      liked={liked}
      onToggle={handleToggle}
      label={displayLabel}
      disabled={loading}
    />
  );
}
