import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { getPayouts } from "@/utils/api";
import Image from "next/image";

interface Payout {
    id: string;
    payout_type: string;
    amount: number;
    status: string;
    payout_currency: string;
    description: string;

}

const Payments = () => {
    const [loading, setLoading] = useState(true);
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const result = await getPayouts();
                if (result) {
                    setPayouts(result);
                }
            } catch (error: any) {
                console.error("Failed to fetch payments", error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    return (
        <MainLayout title="Payments">
            <div className="flex flex-col w-2/3">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    payouts.map((payout) => (
                        <div className='border border-gray-200 shadow-sm p-3 rounded-sm my-2' key={payout.id}>
                            <div className="flex justify-between items-center">
                                <span>
                                    <Image src={'/assets/payment.svg'} alt="payments" width={20} height={20} />
                                </span>
                                <p className="mb-2 text-lg font-normal tracking-tight">
                                    {payout.description}
                                </p>

                                <p className="mb-2 text-lg font-normal tracking-tight">
                                    {payout.amount} {payout.payout_currency}
                                </p>

                                <p className="mb-2 text-lg font-normal tracking-tight">
                                    {payout.status}
                                </p>


                            </div>
                        </div>
                    ))
                )}
            </div>
        </MainLayout>
    );
}

export default Payments;
