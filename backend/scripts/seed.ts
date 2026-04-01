/**
 * Seed script — run AFTER Strapi is up and public permissions are enabled.
 *
 * Usage:
 *   npm run seed
 *
 * Prerequisites:
 *   1. Strapi is running on http://localhost:1337
 *   2. Public role has find/findOne/create/update permissions for
 *      both `api::profile.profile` and `api::social-link.social-link`
 *      (Admin Panel → Settings → Users & Permissions → Roles → Public)
 */

const BASE_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';

const socialLinksData = [
  { platform: 'instagram', label: 'Instagram', href: 'https://instagram.com', order: 1 },
  { platform: 'medium',    label: 'Medium',    href: 'https://medium.com',    order: 2 },
  { platform: 'linkedin',  label: 'Linkedin',  href: 'https://linkedin.com',  order: 3 },
];

const profileData = {
  name: 'Harry',
  bio: "Hi I'm Harry!",
  avatarAlt: 'Harry',
  backgroundSrc: '/profile-bg.jpg',
  backgroundAlt: 'Background',
  likeLabel: 'Like',
  // avatar is a media field — upload an image via the Strapi Admin Media Library
  // and assign it to the Profile entry after seeding.
};

async function post(path: string, body: unknown) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: body }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${path} failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function put(path: string, body: unknown) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: body }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT ${path} failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function get(path: string) {
  const res = await fetch(`${BASE_URL}/api${path}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${path} failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function seed() {
  console.log(`\n🌱 Seeding Strapi at ${BASE_URL}\n`);

  // 1. Create social links and collect their IDs
  const socialLinkIds: number[] = [];

  for (const link of socialLinksData) {
    try {
      const result = await post('/social-links', link);
      const id = result.data?.id ?? result.data?.documentId;
      socialLinkIds.push(id);
      console.log(`✅ social-link created: ${link.platform} (id: ${id})`);
    } catch (err) {
      console.error(`❌ Failed to create social-link ${link.platform}:`, err);
    }
  }

  // 2. Check if profile already exists (Single Type)
  let profileExists = false;
  try {
    const existing = await get('/profile');
    profileExists = !!existing?.data;
  } catch {
    profileExists = false;
  }

  // 3. Create or update profile (Single Type uses PUT to upsert)
  try {
    const payload = {
      ...profileData,
      socialLinks: socialLinkIds,
    };

    const result = profileExists
      ? await put('/profile', payload)
      : await put('/profile', payload); // Single Type always uses PUT

    console.log(`✅ profile ${profileExists ? 'updated' : 'created'}:`, result?.data?.id ?? result?.data?.documentId);
  } catch (err) {
    console.error('❌ Failed to seed profile:', err);
  }

  console.log('\n✨ Seed complete!\n');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
