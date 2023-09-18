import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { getRequiredFields, createPayout } from '@/utils/api';
import { toast } from 'react-toastify';

type FormData = {
    [key: string]: string;
};


const RequestPaymentForm = () => {
    const { handleSubmit, control, reset } = useForm<FormData>();
    const [payoutAmount, setPayoutAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [tempPayoutAmount, setTempPayoutAmount] = useState<string>("");
    const [batchFileHeader, setBatchFileHeader] = useState<string[]>([]);

    const handleTempPayoutAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempPayoutAmount(e.target.value);
    };


    const handlePayoutAmountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPayoutAmount(Number(tempPayoutAmount));
        setShowForm(true);
        setLoading(true);
    };

    // Hardcoded sender information
    const senderInfo: FormData = {
        country: 'US',
        city: 'New York',
        address: '123 Main St',
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '01/01/1990',
        state: 'NY',
        postcode: '10001',
        entity_type: 'individual',
    };

    type BankAccountInfo = {
        [key: string]: string | null;
    };

    const bankAccountInfo: BankAccountInfo = {
        country: localStorage.getItem('beneficiaryCountry'),
        currency: localStorage.getItem('payoutCurrency'),
        first_name: localStorage.getItem('firstName'),
        last_name: localStorage.getItem('lastName'),
        address: localStorage.getItem('address'),
        city: localStorage.getItem('city'),
        state: localStorage.getItem('state'),
        postcode: localStorage.getItem('postcode'),
        account_number: localStorage.getItem('accountNumber'),

    };


    useEffect(() => {
        if (showForm && payoutAmount !== null) {
            const fetchRequiredFields = async () => {
                try {
                    const data = await getRequiredFields('us_general_bank', payoutAmount, 'individual', 'US', 'USD');
                    console.log('Required fields:', data);
                    if (data && data.data) {
                        setBatchFileHeader(data.data.batch_file_header.split(','));
                    }
                } catch (error) {
                    console.error('Failed to fetch required fields', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchRequiredFields();
        }
    }, [payoutAmount, showForm]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const beneficiaryEntityType = localStorage.getItem('beneficiaryEntityType');
        const combinedData = {
            ...data,
            description: data.description,
            ewallet: data.ewallet,
            payout_amount: payoutAmount,
            beneficiary_entity_type: beneficiaryEntityType,
            sender_country: senderInfo.country,
            beneficiary_country: bankAccountInfo.country,
            sender_entity_type: senderInfo.entity_type,
        };
        console.log('Combined Data:', combinedData);
        try {
            const response = await createPayout(combinedData);
            toast.success('Payout successfully created!');
            reset()
            console.log('Payout created:', response);
        } catch (error) {
            console.error('Failed to create payout:', error);
            toast.error('Failed to create payout. Please try again.');
        }
    };

    const formatLabel = (label: string) => {
        let cleanedLabel = label;

        if (label.startsWith("beneficiary.")) {
            cleanedLabel = label.replace("beneficiary.", " ".toUpperCase());
        } else if (label.startsWith("sender.")) {
            cleanedLabel = label.replace(".", " ");
        }

        return cleanedLabel.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
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
                            <div>
                                <label htmlFor="eWallet" className="block mb-2 text-sm font-medium text-gray-900">E-Wallet</label>
                                <Controller
                                    name="ewallet"
                                    control={control}
                                    defaultValue="ewallet_9811b43025f155ec649200b3c5f428b6"
                                    disabled
                                    render={({ field }) => (
                                        <input {...field} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' />
                                    )}
                                />
                            </div>

                            {batchFileHeader?.map((field, index) => {
                                const isSenderField = field.startsWith('sender.');
                                const isBankField = field.startsWith('beneficiary.');
                                const senderFieldKey = isSenderField ? field.slice(7) : field;
                                const bankFieldKey = isBankField ? field.slice(12) : field;
                                const defaultValue = senderInfo[senderFieldKey] || bankAccountInfo[bankFieldKey] || "";

                                return (
                                    <div>
                                        <div key={index}>
                                            <label htmlFor={field} className="block mb-2 text-sm font-medium text-gray-900">{formatLabel(field)}</label>
                                            <Controller
                                                name={field}
                                                control={control}
                                                defaultValue={defaultValue}
                                                render={({ field }) => (
                                                    <input
                                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                                                        {...field}
                                                        type="text"
                                                        disabled={Boolean(isSenderField && defaultValue) || Boolean(isBankField && defaultValue)}
                                                    />
                                                )}
                                            />

                                        </div>
                                    </div>
                                )
                            })}
                            <button className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-2/5 mr-auto px-5 py-2.5 text-center" type="submit"> Request Payment</button>
                        </form>
                    )}

                </div>
            )}
        </div>
    );
};

export default RequestPaymentForm;
