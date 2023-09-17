import MainLayout from "@/layouts/MainLayout";
import RequestPaymentForm from "@/components/RequestPayment/RequestPaymentForm";

const RequestPayments = () => {
    return (
        <MainLayout title="Request Payments">
            <div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900" >
                    Let the client know how much they should pay you
                </h3>

                <RequestPaymentForm />
            </div>
        </MainLayout>
    );

}

export default RequestPayments;