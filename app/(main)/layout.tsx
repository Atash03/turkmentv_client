import Buble from "@/components/Buble";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import Nav from "@/components/Nav";
import GlobalContext from "@/context/GlobalContext";
import MainProvider from "@/providers/MainProvider";

interface IProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: IProps) => {
  return (
    <div className="z-20 relative">
      <MainProvider>
        {/* <Buble /> */}
        <div className="bg-white dark:bg-black transition-all h-full">
          <h1 className="hidden">Turkmen TV</h1>
          <Nav />
          <main className="min-h-[50vh]">{children}</main>
          <Footer />
          <MobileMenu />
        </div>
      </MainProvider>
    </div>
  );
};

export default RootLayout;
