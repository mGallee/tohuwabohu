export async function extractSoundcloudTrackId(url: string): Promise<string> {
  const response = await fetch(url, {
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
    const hydration: {
      hydratable: string;
      data: Record<string, unknown>;
    }[] = JSON.parse(hydrationMatch[1]);
    const soundEntry = hydration.find((entry) => entry.hydratable === 'sound');
    if (soundEntry?.data?.id) {
      return String(soundEntry.data.id);
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
