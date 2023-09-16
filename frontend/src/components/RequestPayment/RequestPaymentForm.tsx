import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { getRequiredFields } from '@/utils/api';

type RequiredField = {
    name: string;
    regex: string;
    is_required: boolean;
    type: string;
};

type FormData = {
    [key: string]: string;
};

const RequestPaymentForm = () => {
    const { handleSubmit, control } = useForm<FormData>();
    const [requiredFields, setRequiredFields] = useState<RequiredField[] | null>(null);
    const [payoutAmount, setPayoutAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const handlePayoutAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPayoutAmount(Number(e.target.value));
        setShowForm(true); // Show the form once payoutAmount is set
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
    };

    useEffect(() => {
        if (showForm && payoutAmount !== null) {
            const fetchRequiredFields = async () => {
                try {
                    const data = await getRequiredFields('us_general_bank', payoutAmount, 'individual', 'US', 'USD');
                    console.log('Required fields:', data);
                    if (data && data.data) {
                        setRequiredFields(data.data.beneficiary_required_fields);
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

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const combinedData = { ...senderInfo, ...data };
        console.log('Combined Data:', combinedData);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <label htmlFor="payoutAmount">Payout Amount</label>
                    <input
                        type="number"
                        id="payoutAmount"
                        name="payoutAmount"
                        onChange={handlePayoutAmountChange}
                    />
                    {showForm && (
                        <form onSubmit={handleSubmit(onSubmit)} className='flex max-w-md flex-col my-8 gap-4 h-screen border-2 border-red-700'>
                            {requiredFields?.map((field: RequiredField) => (
                                <div key={field.name}>
                                    <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900">{field.name}</label>
                                    <Controller
                                        name={field.name}
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: field.is_required, pattern: new RegExp(field.regex) }}
                                        render={({ field }) => (
                                            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' {...field} type="text" />
                                        )}
                                    />
                                </div>
                            ))}
                            <button className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-2/5 mr-auto px-5 py-2.5 text-center" type="submit">Submit</button>
                        </form>
                    )}

                </div>
            )}
        </div>
    );
};

export default RequestPaymentForm;
