import { useState } from "react";
import Link from "next/link";
import { logout } from "@/utils/api";


interface NavListItem {
    label: string;
    icon: string;
    href?: any;
    onClick?: () => void;
}

type MainLayoutProps = {
    title: string;
    children: React.ReactNode;
};


const handleLogout = () => {
    logout();
    window.location.href = '/auth/signin';
};

const NavListItems: NavListItem[] = [
    { label: 'Your Profile', icon: '/assets/profile.svg', href: '/profile' },
    { label: 'Request Payment', icon: '/assets/repayment.svg', href: '/request-payments' },
    { label: 'Payments', icon: '/assets/payment.svg', href: '/payments' },
    { label: 'Bank Accounts', icon: '/assets/bank.svg', href: '/payment-methods' },
]


const MainLayout = ({ title, children }: MainLayoutProps): JSX.Element => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <main className="container px-6 md:px-12 box-border overscroll-auto sm:w-11/12">
            {/* Navbar */}

            <nav className="inline-flex md:block items-center fixed top-0 left-0 z-10 w-full sm:left-[20.65rem] sm:w-[77%] bg-white">
                <div className="md:hidden">
                    <button
                        aria-controls="logo-sidebar"
                        type="button"
                        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        className="relative top-1 left-3">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                </div>
                <div className="px-12 py-8">
                    <h3 className="text-[20px] font-semibold leading-6 text-ms-black"> {title} </h3>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 bg-white overflow-auto md:overflow-y-hidden left-0 z-40 w-full sm:w-[23%] border-r border-[#EFF1F6] h-screen transition-transform ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="px-8 md:px-16 py-6 flex justify-between items-center">
                    <div className="flex items-center ">
                        <img src={'/assets/payment.svg'} alt="geegerpay logo" className="w-[50px] h-[50px]" />
                        <span className="ml-3 text-2xl font-semibold text-ms-black"> GeegerPay </span>
                    </div>


                    <button
                        aria-controls="close-sidebar"
                        type="button"
                        className="md:hidden"
                        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg>
                    </button>
                </div>
                <div className="h-full py-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        {NavListItems.slice(0, 4).map((item, index) => (
                            <li className="hover:border-ms-orange border-l-[3px] border-white" key={index}>
                                <Link href={item.href} className="flex items-center p-2 text-ms-gray-400 text-base hover:text-ms-orange px-8 md:px-16" >
                                    <img
                                        src={item.icon} alt="dashboard"
                                        className="w-[20px] h-[20px] text-gray-500 transition duration-75"
                                    />
                                    <span className="ml-3 text-base"> {item.label} </span>
                                </Link>
                            </li>
                        ))}


                        <li className="hover:border-ms-orange border-l-[3px] border-white">
                            <a className="flex items-center p-2 text-ms-gray-400 cursor-pointer text-base hover:text-ms-orange px-8 md:px-16" onClick={handleLogout} >
                                <img
                                    src="/assets/logout.svg" alt="dashboard "
                                    className="w-[14px] h-[14px] text-gray-500 transition duration-75"
                                />
                                <span className="ml-3 text-base"> Logout </span>
                            </a>
                        </li>



                    </ul>

                </div>
            </aside>
            {/* Sidebar ends here */}
            <div className="relative md:ml-[20.5rem] md:mt-[6rem] h-screen w-[89%]">
                {children}
            </div>

        </main>
    );
};

export default MainLayout;
