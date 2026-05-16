import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import QueryProvider from "@/provider/QueryProvider";
import CustomCursor from "@/common/CustomCursor/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

// Replace with your real Google Analytics ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export const metadata = {
  metadataBase: new URL("https://www.dworldsolution.com"),

  title: {
    default: "D World Solution | Video Editing & Digital Marketing",
    template: "%s | D World Solution",
  },

  description:
    "D World Solution provides professional video editing, AI video creation, digital marketing, branding, motion graphics, and content creation services.",

  keywords: [
    "video editing",
    "video editor",
    "AI video creator",
    "digital marketing",
    "motion graphics",
    "YouTube video editing",
    "social media marketing",
    "branding agency",
    "content creator",
    "Bangladesh video editor",
    "D World Solution",
  ],

  authors: [
    {
      name: "Siddartha Biswas",
      url: "https://www.dworldsolution.com",
    },
  ],

  creator: "Siddartha Biswas",

  publisher: "D World Solution",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.dworldsolution.com",
  },

  openGraph: {
    title: "D World Solution",

    description: "Professional video editing and digital marketing services for businesses and creators.",

    url: "https://www.dworldsolution.com",

    siteName: "D World Solution",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "D World Solution",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "D World Solution",

    description: "Professional video editing and digital marketing services.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}>
        <QueryProvider>
          <CustomCursor />
          {children}
        </QueryProvider>

        {/* Google Analytics */}
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
