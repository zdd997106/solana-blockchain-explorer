import pluralize from 'pluralize';

/**
 * Return a string with the time difference in a human-readable format.
 */
export function timeAgo(diff: number) {
  if (diff < intervals.second) return 'Just now';
  const hitInterval = Object.entries(intervals).findLast(([_, value]) => diff >= value);

  // [NOTE] Error prevention, this should never happen
  if (!hitInterval) return 'Unknown time';

  const unit = hitInterval[0];
  const value = Math.floor(diff / Number(hitInterval[1]));
  return `${value} ${pluralize(unit, value)} ago`;
}

const intervals = {
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
};

/**
 * Format a number with commas as thousands separators.
 */
export function formatNumber(num: number | bigint) {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
