import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormData = {
    [key: string]: string;
};

const RequestPaymentForm = () => {
    const { handleSubmit, control, reset } = useForm<FormData>();
    const [showForm, setShowForm] = useState(false);
    const [tempPayoutAmount, setTempPayoutAmount] = useState<string>("");

    const handleTempPayoutAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempPayoutAmount(e.target.value);
    };

    const handlePayoutAmountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowForm(true);
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        toast.success('Payout successfully created!');
        reset();
    };

    return (
        <div>
            <form onSubmit={handlePayoutAmountSubmit}>
                <label htmlFor="payoutAmount">Payout Amount</label>
                <input
                    type="text"
                    id="payoutAmount"
                    name="payoutAmount"
                    value={tempPayoutAmount}
                    onChange={handleTempPayoutAmountChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5'
                />
            </form>

            {showForm && (
                <form onSubmit={handleSubmit(onSubmit)} className='flex max-w-md flex-col my-8 gap-4 h-screen'>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input {...field} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' />
                            )}
                        />
                    </div>
                    <button className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-2/5 mr-auto px-5 py-2.5 text-center" type="submit"> Request Payment</button>
                </form>
            )}
        </div>
    );
};

export default RequestPaymentForm;
