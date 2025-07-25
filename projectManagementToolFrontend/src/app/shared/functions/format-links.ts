export const getDomainFromLink = (url: string): string | null => {
  const regex = /^(https?:\/\/)?([^\/]+)\/?.*$/;
  const match = url.match(regex);

  if (match && match[2]) {
    return match[2]; // Gib die Domain zurück
  }

  return null; // if link is not of valid pattern
};
