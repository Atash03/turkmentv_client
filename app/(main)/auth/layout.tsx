interface IProps {
  children: React.ReactNode;
}

function RootLayout({ children }: IProps) {
  return (
    <div className="h-screen">
      <div className="container h-full">
        <div className="inner h-full">{children}</div>
      </div>
    </div>
  );
}

export default RootLayout;
