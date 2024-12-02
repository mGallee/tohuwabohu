const socialMediaItems = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tohuwabohu.vienna',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/tohuwabohu.vienna',
  },
  {
    label: 'Soundcloud',
    href: 'https://soundcloud.com/tohuwabohu-vienna',
  },
  {
    label: 'Telegram',
    href: 'https://t.me/TohuwabohuVienna',
  },
];

export default function Footer() {
  return (
    <footer className="relative flex flex-row flex-wrap items-center justify-center gap-6 p-8 text-2xl">
      {socialMediaItems.map(({ label, href }) => (
        <a
          key={label}
          className="select-none outline-0 hover:animate-glow active:animate-glow"
          href={href}
          target="_blank">
          {label}
        </a>
      ))}
    </footer>
  );
}
