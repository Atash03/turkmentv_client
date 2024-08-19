import MaterialsProvider from "@/providers/MaterialsProvider";

interface IProps {
  children: React.ReactNode;
}

function RootLayout({ children }: IProps) {
  return (
    <div>
      <MaterialsProvider>{children}</MaterialsProvider>
    </div>
  );
}

export default RootLayout;
