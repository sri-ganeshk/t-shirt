import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register: T-Shirt",
  description: "Register for your t-shirt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: #fff;
            color: #000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            min-height: 100dvh;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
