type AuthLayoutProps = {
    children: React.ReactNode;
};


const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
    return (
        <section className="relative ">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center ">
                    <img src={'/assets/payment.svg'} alt="geegerpay logo" className="w-[50px] h-[50px]" />
                    <span className="ml-3 text-2xl font-semibold text-ms-black"> GeegerPay </span>
                </div>
                <h1 className="text-4xl font-semibold text-center text-ms-black"> Welcome to GeegerPay </h1>
                <p className="text-lg font-normal text-center text-ms-black"> Please sign in to continue </p>
                <div className="flex justify-center mt-8">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-lg shadow-lg p-6">

                            <main>{children}</main>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthLayout;