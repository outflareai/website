// Shared by the build and the browser, so it imports nothing.
// 1, 999, 1.2k, 12k: short enough for a header button.
export function formatStars(n: number): string {
	if (n < 1000) return String(n);
	const k = n / 1000;
	return `${k < 10 ? Math.floor(k * 10) / 10 : Math.floor(k)}k`;
}
