import AffiliateDisclaimer from "./shared/AffiliateDisclaimer";
import Logo from "./shared/Logo";

export default function Footer() {
  return (
    <footer className="bg-muted/50 mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          <AffiliateDisclaimer />
          <p className="text-sm">
            &copy; {new Date().getFullYear()} JudgeKro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
