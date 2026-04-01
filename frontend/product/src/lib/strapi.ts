const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export function getStrapiMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface StrapiSocialLink {
  id: number;
  documentId: string;
  platform: string;
  label: string;
  href: string;
  order: number;
}

export interface StrapiProfile {
  id: number;
  documentId: string;
  name: string;
  bio: string;
  avatar: StrapiMedia | null;
  avatarAlt: string;
  backgroundSrc: string;
  backgroundAlt: string;
  likeLabel: string;
  likeCount: number;
}

// Strapi v4 wraps fields in `data.attributes`; v5 returns a flat object.
// This helper normalises both formats to a flat shape.
function unwrap<T>(raw: unknown): T | null {
  if (!raw || typeof raw !== 'object') return null;
  const entry = raw as Record<string, unknown>;
  if ('attributes' in entry && typeof entry.attributes === 'object') {
    return { id: entry.id, documentId: entry.documentId, ...entry.attributes } as T;
  }
  return entry as T;
}

export async function getProfileData(): Promise<StrapiProfile | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/profile?populate=avatar`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return unwrap<StrapiProfile>(json?.data);
  } catch {
    return null;
  }
}

export async function getSocialLinks(): Promise<StrapiSocialLink[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/social-links?sort=order:asc`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const json = await res.json();
    const items: unknown[] = Array.isArray(json?.data) ? json.data : [];
    return items
      .map((item) => unwrap<StrapiSocialLink>(item))
      .filter((item): item is StrapiSocialLink => item !== null);
  } catch {
    return [];
  }
}

export async function likeProfile(): Promise<number | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/profile/like`, {
      method: 'POST',
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.likeCount as number) ?? null;
  } catch (err) {
    console.error('[likeProfile]', err);
    return null;
  }
}

export async function unlikeProfile(): Promise<number | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/profile/unlike`, {
      method: 'POST',
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.likeCount as number) ?? null;
  } catch (err) {
    console.error('[unlikeProfile]', err);
    return null;
  }
}

// Kept for backward compatibility — fetches both resources in parallel.
export async function getProfile(): Promise<(StrapiProfile & { socialLinks: StrapiSocialLink[] }) | null> {
  const [profile, socialLinks] = await Promise.all([getProfileData(), getSocialLinks()]);
  if (!profile) return null;
  return { ...profile, socialLinks };
}
