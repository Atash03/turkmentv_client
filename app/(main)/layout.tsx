import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import Nav from "@/components/Nav";
import MainProvider from "@/providers/MainProvider";

interface IProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: IProps) => {
  return (
    <div className="z-20 relative">
      <MainProvider>
        <div className="bg-white dark:bg-black transition-all min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileMenu />
        </div>
      </MainProvider>
    </div>
  );
};

export default RootLayout;
