import "./globals.css";

export const metadata = {
  title: "Vex Alchemy",
  description: "Procedural CGI & Motion Design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
