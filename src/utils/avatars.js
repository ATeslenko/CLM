const avatars = [
  '/avatar-1.png',
  '/avatar-2.png',
  '/avatar-3.png',
  '/avatar-4.png'
];

export const getRandomAvatar = (seed) => {
  const index = seed % avatars.length;
  return avatars[index];
};

export const getRandomAvatarByString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return getRandomAvatar(Math.abs(hash));
};
