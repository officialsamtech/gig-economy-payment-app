type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
    return (
        <div>
            <main>{children}</main>
            <footer>Copyright © 2023</footer>
        </div>
    );
};

export default MainLayout;
