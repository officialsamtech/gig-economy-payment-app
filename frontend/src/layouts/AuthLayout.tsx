type AuthLayoutProps = {
    children: React.ReactNode;
};


const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
    return (
        <section className="relative ">
            <div className="container mx-auto px-4 py-8">
                <main>{children}</main>
            </div>
        </section>
    );
};

export default AuthLayout;