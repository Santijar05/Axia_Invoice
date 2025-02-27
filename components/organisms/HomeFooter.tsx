import { BrandSection } from "../molecules/homeFooter/BrandSection";
import { LinksColumn } from "../molecules/homeFooter/Links";

interface HomeFooterProps {
    style: string;
}

export default function HomeFooter({style}: HomeFooterProps) {

    const quickLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ]

    const copyrightLinks = [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/about", label: "About" },
    ]

    const socialLinks = [
        { href: "https://twitter.com", label: "Twitter" },
        { href: "https://discord.gg", label: "Discord" },
        { href: "https://github.com", label: "Github" },
    ]

    return (
        <footer className={`${style} py-12 mt-10`}>
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
                    <BrandSection />
                    <LinksColumn
                        title="Quick Links"
                        links={quickLinks}
                    />
                    <LinksColumn
                        title="Copyright & Policies"
                        links={copyrightLinks}
                    />
                    <LinksColumn
                        title="Social"
                        links={socialLinks}
                    />
                </div>
                
                {/* Copyright */}
                <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm">
                    &copy;{new Date().getFullYear()} Axia. All Rights Reserved by Juan Campos Santi Jime.
                </div>
            </div>
        </footer>
    );
}