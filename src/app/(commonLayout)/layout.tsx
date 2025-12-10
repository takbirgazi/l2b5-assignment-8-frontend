import CommonLayoutHeader from "@/components/shared/CommonLayout/Header";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <CommonLayoutHeader />
            {children}
        </>
    );
};

export default CommonLayout;