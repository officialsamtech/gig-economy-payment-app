import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBeneficiary } from '@/utils/api';

type FormData = {
    first_name: string;
    last_name: string;
    bank_name: string;
    account_number: string;
    category: string;
    entity_type: string;
    currency: string;
    country: string;
    identification_type: string;
    identification_value: string;
    merchant_reference_id: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    bic_swift: string;
};


const CreateBeneficiaryForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data: FormData) => {
        try {
            const response = await createBeneficiary(data);
            if (response.data) {
                localStorage.setItem('beneficiaryId', response.data.id);
                window.location.href = '/payment-methods';
            }
            console.log('Beneficiary created', response.data)
        } catch (error) {
            console.error('Failed to create beneficiary', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex max-w-md flex-col mt-8 mb-16 gap-4 h-screen'>
            {/* Add input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 'fields for each FormData property */}
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="first_name" {...register("first_name", { required: 'First name is required' })} placeholder='Sammy' />
                {errors.first_name && <small className="text-sm text-red-500">{errors.first_name.message}</small>}
            </div>

            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="first_name" {...register("last_name", { required: 'Last name is required' })} placeholder='Gamble' />
                {errors.last_name && <small className="text-sm text-red-500">{errors.last_name.message}</small>}
            </div>

            <div>
                <label htmlFor="bank_name" className="block mb-2 text-sm font-medium text-gray-900">Bank Name</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ' id="bank_name" {...register("bank_name", { required: 'Bank name is required' })} placeholder='Bank of America' />
                {errors.bank_name && <small className="text-sm text-red-500">{errors.bank_name.message}</small>}
            </div>

            <div>
                <label htmlFor="account_number" className="block mb-2 text-sm font-medium text-gray-900">Account Number</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ' id="account_number" {...register("account_number", { required: 'Account number is required' })} placeholder='777110203456785' />
                {errors.account_number && <small className="text-sm text-red-500">{errors.account_number.message}</small>}
            </div>

            <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="category" {...register("category", { required: 'Category is required' })} placeholder='bank' />
                {errors.category && <small className="text-sm text-red-500">{errors.category.message}</small>}
            </div>

            <div>
                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="category" {...register("country", { required: 'Country is required' })} placeholder='US' />
                {errors.country && <small className="text-sm text-red-500">{errors.country.message}</small>}
            </div>

            <div>
                <label htmlFor="entity_type" className="block mb-2 text-sm font-medium text-gray-900">Entity Type</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="entity_type" {...register("entity_type", { required: 'Entity type is required' })} placeholder='individual' />
                {errors.entity_type && <small className="text-sm text-red-500">{errors.entity_type.message}</small>}
            </div>

            <div>
                <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900">Currency</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="currency" {...register("currency", { required: 'Currency is required' })} placeholder='USD' />
                {errors.currency && <small className="text-sm text-red-500">{errors.currency.message}</small>}
            </div>

            <div>
                <label htmlFor="identification_type" className="block mb-2 text-sm font-medium text-gray-900">Identification Type</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="identification_type" {...register("identification_type", { required: 'Identification type is required' })} placeholder='identification_id' />
                {errors.identification_type && <small className="text-sm text-red-500">{errors.identification_type.message}</small>}
            </div>

            <div>
                <label htmlFor="identification_value" className="block mb-2 text-sm font-medium text-gray-900">Identification Value</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="identification_value" {...register("identification_value", { required: 'Identification value is required' })} placeholder='12p3456178h9' />
                {errors.identification_value && <small className="text-sm text-red-500">{errors.identification_value.message}</small>}
            </div>

            <div>
                <label htmlFor="merchant_reference_id" className="block mb-2 text-sm font-medium text-gray-900">Merchant Reference ID</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="merchant_reference_id" {...register("merchant_reference_id", { required: 'Merchant reference ID is required' })} placeholder='JDho00ep1' />
                {errors.merchant_reference_id && <small className="text-sm text-red-500">{errors.merchant_reference_id.message}</small>}
            </div>

            <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="address" {...register("address", { required: 'Address is required' })} placeholder='1 Main Street' />
                {errors.address && <small className="text-sm text-red-500">{errors.address.message}</small>}
            </div>

            <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="city" {...register("city", { required: 'City is required' })} placeholder='Queens' />
                {errors.city && <small className="text-sm text-red-500">{errors.city.message}</small>}
            </div>

            <div>
                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="state" {...register("state", { required: 'State is required' })} placeholder='New York' />
                {errors.state && <small className="text-sm text-red-500">{errors.state.message}</small>}
            </div>

            <div>
                <label htmlFor="postcode" className="block mb-2 text-sm font-medium text-gray-900">Postcode</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="postcode" {...register("postcode", { required: 'Postcode is required' })} placeholder='12345' />
                {errors.postcode && <small className="text-sm text-red-500">{errors.postcode.message}</small>}
            </div>

            <div>
                <label htmlFor="bic_swift" className="block mb-2 text-sm font-medium text-gray-900">BIC/SWIFT</label>
                <input className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' id="bic_swift" {...register("bic_swift", { required: 'BIC/SWIFT is required' })} placeholder='BARCGB22' />
                {errors.bic_swift && <small className="text-sm text-red-500">{errors.bic_swift.message}</small>}
            </div>


            <button type="submit" className="text-white bg-blue-700 mb-8  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-2/5 mr-auto px-5 py-2.5 text-center">
                {loading ? 'Creating...' : 'Create Beneficiary'}
            </button>
        </form>
    );
};

export default CreateBeneficiaryForm;
