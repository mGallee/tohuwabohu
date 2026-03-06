import { AnchorHTMLAttributes, JSX } from 'react';
import Link from '@/components/Link';

interface TextWithLinksProps {
  children: string;
  anchorProps?: Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'children'
  >;
}

export default function TextWithLinks({
  children,
  anchorProps,
}: TextWithLinksProps) {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const trailingPunctuationRegex = /[),.;!?]+$/;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(children)) !== null) {
    if (match.index > lastIndex) {
      parts.push(children.slice(lastIndex, match.index));
    }
    const rawUrl = match[0];
    const cleanUrl = rawUrl.replace(trailingPunctuationRegex, '');
    const trailing = rawUrl.slice(cleanUrl.length);
    parts.push(
      <Link
        key={match.index}
        href={cleanUrl}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}>
        {cleanUrl}
      </Link>,
    );
    if (trailing) {
      parts.push(trailing);
    }
    lastIndex = urlRegex.lastIndex;
  }

  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }

  return parts;
}
