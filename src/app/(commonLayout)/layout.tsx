import CommonLayoutFooter from "@/components/shared/CommonLayout/Footer";
import CommonLayoutHeader from "@/components/shared/CommonLayout/Header";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <CommonLayoutHeader />
            {children}
        <CommonLayoutFooter />
        </>
    );
};

export default CommonLayout;