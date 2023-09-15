import AuthLayout from '@/layouts/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';

const SignIn = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};

export default SignIn;