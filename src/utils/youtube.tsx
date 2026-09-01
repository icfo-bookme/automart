/**
 * Robustly extract a YouTube video ID from common URL formats:
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://www.youtube.com/watch?v=VIDEO_ID&t=1m30s
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://www.youtube.com/shorts/VIDEO_ID
 *  - https://www.youtube.com/live/VIDEO_ID
 *
 * Returns the bare 11-character video ID, or null when nothing valid is found.
 * This fixes the naive `.split("v=")[1]` approach that kept extra params
 * (like `&t=2s`) attached to the ID and broke the embed.
 */
export const getYoutubeVideoId = (
    url: string | null | undefined
): string | null => {
    if (!url) return null;

    try {
        const parsed = new URL(url.trim());
        const host = parsed.hostname.replace(/^www\./i, "");
        let id: string | null = null;

        if (host === "youtu.be") {
            id = parsed.pathname.split("/")[1] || null;
        } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
            if (parsed.pathname.startsWith("/embed/")) {
                id = parsed.pathname.split("/")[2] || null;
            } else if (parsed.pathname.startsWith("/shorts/")) {
                id = parsed.pathname.split("/")[2] || null;
            } else if (parsed.pathname.startsWith("/live/")) {
                id = parsed.pathname.split("/")[2] || null;
            } else {
                // watch?v=... — searchParams strips &t, &list, &feature etc.
                id = parsed.searchParams.get("v");
            }
        }

        return id && /^[\w-]{11}$/.test(id) ? id : null;
    } catch {
        // Fallback for non-URL strings: grab the 11-char id after a known marker
        const match = url.match(
            /(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/
        );
        return match ? match[1] : null;
    }
};

/**
 * Convert a YouTube timestamp param (e.g. "2", "2s", "1m30s", "1h2m3s")
 * into seconds for the embed player's "start" parameter.
 */
const parseTimeToSeconds = (value: string): number | null => {
    const h = /(\d+)h/.exec(value)?.[1];
    const m = /(\d+)m/.exec(value)?.[1];
    const s = /(\d+)s/.exec(value)?.[1];

    if (!h && !m && !s) {
        // Plain number (e.g. t=90) or something unexpected
        const plain = /(\d+)/.exec(value)?.[1];
        return plain ? Number(plain) : null;
    }

    return (
        Number(h || 0) * 3600 +
        Number(m || 0) * 60 +
        Number(s || 0)
    );
};

type YoutubeEmbedOptions = {
    autoplay?: boolean;
    mute?: boolean;
    controls?: boolean;
};

/**
 * Build a valid YouTube embed URL from any supported share/watch URL.
 * Returns null when the video id cannot be resolved.
 */
export const getYoutubeEmbedUrl = (
    url: string | null | undefined,
    options: YoutubeEmbedOptions = {}
): string | null => {
    const id = getYoutubeVideoId(url);
    if (!id) return null;

    const params = new URLSearchParams();
    params.set("autoplay", options.autoplay ? "1" : "0");
    params.set("mute", options.mute ? "1" : "0");
    params.set("controls", options.controls ? "1" : "0");

    // Convert watch-time ("t=2s") -> embed "start" (seconds)
    try {
        const parsed = new URL(url!.trim());
        const t = parsed.searchParams.get("t");
        if (t) {
            const start = parseTimeToSeconds(t);
            if (start !== null && start > 0) params.set("start", String(start));
        }
    } catch {
        /* ignore malformed url */
    }

    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
};
