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
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(children)) !== null) {
    if (match.index > lastIndex) {
      parts.push(children.slice(lastIndex, match.index));
    }
    parts.push(
      <Link
        key={match.index}
        href={match[0]}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}>
        {match[0]}
      </Link>,
    );
    lastIndex = urlRegex.lastIndex;
  }

  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }

  return parts;
}
