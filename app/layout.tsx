import { BackToTop } from "@/components/back-to-top";
import { CommandMenu } from "@/components/command-menu";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getPortfolioData } from "@/lib/portfolio";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";
import { Toaster } from "sonner";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});


export async function generateMetadata() {
  const data = await getPortfolioData();
  return buildMetadata(data);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPortfolioData();

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable, jakarta.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <HashScrollHandler />
          <ScrollProgress />
          <Navbar data={data} />
          <main className="flex-1">{children}</main>
          <Footer data={data} />
          <BackToTop label={data.ui.backToTop} />
          <WhatsAppFloat number={data.personal.whatsapp} label={data.ui.whatsappLabel} />
          <CommandMenu data={data} />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
