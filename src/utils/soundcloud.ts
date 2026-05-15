export function getSoundCloudPlayerUrl(urlSearchParam: string) {
  const url = new URL('https://w.soundcloud.com/player/');
  url.searchParams.set('color', '#0f172a');
  url.searchParams.set('auto_play', 'false');
  url.searchParams.set('hide_related', 'true');
  url.searchParams.set('show_artwork', 'true');
  url.searchParams.set('show_comments', 'false');
  url.searchParams.set('show_user', 'false');
  url.searchParams.set('show_reposts', 'false');
  url.searchParams.set('show_teaser', 'true');
  url.searchParams.set('show_playcount', 'false');
  url.searchParams.set('download', 'false');
  url.searchParams.set('sharing', 'false');
  url.searchParams.set('buying', 'false');
  url.searchParams.set('single_active', 'true');
  url.searchParams.set('visual', 'true');
  url.searchParams.set('url', urlSearchParam);
  return url;
}

export async function extractSoundcloudTrackId(url: string): Promise<string> {
  const parsed = new URL(url);
  const host = parsed.hostname.toLowerCase();
  const isSoundCloudHost =
    host === 'soundcloud.com' || host.endsWith('.soundcloud.com');

  if (parsed.protocol !== 'https:' || !isSoundCloudHost) {
    throw new Error('Only https://soundcloud.com URLs are allowed.');
  }

  const response = await fetch(parsed.toString(), {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch SoundCloud page: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();

  const hydrationMatch = html.match(
    /window\.__sc_hydration\s*=\s*(\[[\s\S]+?]);/,
  );
  if (hydrationMatch) {
    try {
      const hydration: {
        hydratable: string;
        data: Record<string, unknown>;
      }[] = JSON.parse(hydrationMatch[1]);
      const soundEntry = hydration.find(
        (entry) => entry.hydratable === 'sound',
      );
      if (soundEntry?.data?.id) {
        return String(soundEntry.data.id);
      }
    } catch {
      // continue to fallback patterns
    }
  }

  const fallbackPatterns = [
    /"id"\s*:\s*(\d{7,}).*?"kind"\s*:\s*"track"/,
    /"kind"\s*:\s*"track".*?"id"\s*:\s*(\d{7,})/,
    /soundcloud:\/\/sounds:(\d+)/,
  ];

  for (const pattern of fallbackPatterns) {
    const match = html.match(pattern);
    if (match) {
      return match[1];
    }
  }

  throw new Error(
    'Could not extract track ID from the provided SoundCloud URL.',
  );
}
