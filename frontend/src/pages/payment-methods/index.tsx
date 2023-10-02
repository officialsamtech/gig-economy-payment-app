import { useEffect, useState } from 'react';
import CreateBeneficiaryForm from '@/components/BankAccounts/CreateBeneficiaryForm';
import { Main } from 'next/document';
import MainLayout from '@/layouts/MainLayout';

type BeneficiaryResponse = {
    id: number,
    currency: string,
    account_number: string,
    bank_name: string,
    entity_type: string,
    country: string,
    category: string,
};

const BankAccount = () => {
    const [beneficiary, setBeneficiary] = useState<BeneficiaryResponse | null>({
        id: 1,
        currency: 'USD',
        account_number: '1234567890',
        bank_name: 'Bank of America',
        entity_type: 'individual',
        country: 'US',
        category: 'personal',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <MainLayout title='Bank Accounts'>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {beneficiary &&
                            (beneficiary.currency || beneficiary.account_number || beneficiary.bank_name || beneficiary.category
                                || beneficiary.country || beneficiary.entity_type)
                            ? (
                                <div className="max-w-2xl p-6 bg-white border border-gray-200 rounded-sm shadow space-y-4 ">
                                    {/* Display beneficiary details here */}
                                    <div className='border-b border-gray-200'>
                                        <h6 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 ">
                                            {`${beneficiary.currency || ''} / ${beneficiary.bank_name || ''}, (*****${beneficiary.account_number.slice(11, 15) || ''})`}
                                        </h6>
                                    </div>

                                    <div className='flex justify-between'>
                                        <div>
                                            <span className='font-normal text-sm'>Category</span>
                                            <p className="mb-3 font-bold text-lg capitalize text-gray-700">
                                                {beneficiary.category || 'Category not set'}
                                            </p>
                                        </div>

                                        <div>
                                            <span className='font-normal text-sm'>Country:</span>
                                            <p className="mb-3 font-bold text-lg capitalize text-gray-700 ">
                                                {beneficiary.country || 'Country not set'}
                                            </p>
                                        </div>

                                        <div>
                                            <span className='font-normal text-sm'>Entity Type:</span>
                                            <p className="mb-3 font-bold text-lg capitalize text-gray-700">
                                                {beneficiary.entity_type || 'Entity type not set'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>You don't have a bank account set up yet.</p>
                                    <CreateBeneficiaryForm />
                                </div>
                            )}
                    </>
                )}
            </div>
        </MainLayout>
    );
};

export default BankAccount;
