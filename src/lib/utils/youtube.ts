// Note: The following is called JSDoc. We need to learn more about it in the future.
/**
 * Extracts the YouTube video ID from various YouTube URL formats.
 * @param url The full YouTube video URL.
 * @returns The YouTube video ID (string) or null if not found.
 */
export function getYouTubeVideoId(url: string): string | null {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/i;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

/**
 * Constructs the YouTube embed URL for use in an iframe.
 * @param videoId The extracted YouTube video ID.
 * @returns The YouTube embed URL.
 */
// export function getYouTubeEmbedUrl(videoId: string): string {
//   // Use youtube-nocookie.com for better privacy compliance
//   return `https://www.youtube-nocookie.com/embed/${videoId}`;
// }
