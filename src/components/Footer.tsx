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
    <footer className="relative flex flex-row flex-wrap items-center justify-center gap-3 p-4 text-center md:gap-6 md:p-8">
      {socialMediaItems.map(({ label, href }) => (
        <a
          key={label}
          className="select-none text-xl outline-0 hover:animate-glow active:animate-glow md:text-2xl"
          href={href}
          target="_blank">
          {label}
        </a>
      ))}
    </footer>
  );
}
