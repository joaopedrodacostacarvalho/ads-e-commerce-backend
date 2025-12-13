export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <h2>Autenticação</h2>
      {children}
    </section>
  );
}
