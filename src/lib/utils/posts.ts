export function generateSlug(title: string) {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric chars (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
}

export function getReadTime(text: string): number {
  const wordsPerMinute = 200; // Average total words an adult can read per minute
  const numberOfWords = text.split(/\s/g).length;
  const readingTime = Math.ceil(numberOfWords / wordsPerMinute);
  return readingTime;
}

/**
 * Formats a given Date object or ISO date string into a readable format.
 * Example: 'Jun 17, 2025'
 * @param dateInput The date to format, can be a Date object, string, or number.
 * @returns The formatted date string.
 */
export function formatPostDate(dateInput: Date | string | number): string {
  // Ensure the input is a valid Date object
  const date = new Date(dateInput);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date input provided to formatPostDate:", dateInput);
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
