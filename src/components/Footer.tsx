import { GithubIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

const footerLinks = [
  { label: "About", url: "/" },
  { label: "Features", url: "/" },
  { label: "Customers", url: "/" },
  { label: "Pricing", url: "/" },
  { label: "Help", url: "/" },
  { label: "Careers", url: "/" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#141414] relative py-10 text-sm text-center">
      <div className="container mx-auto">
        <div className="text-xl">MCDMaker.</div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          {footerLinks.map(({ label, url }, index) => (
            <a href={url} key={index}>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <GithubIcon />
          <InstagramIcon />
          <LinkedinIcon />
        </div>
        <p className="mt-6 text-muted-foreground">
          &copy; 2024 Yulian, Inc. All rights reserved.
        </p>
      </div>
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#777_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-0" />
    </footer>
  );
};
