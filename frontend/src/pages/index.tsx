import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/profile');
    }, []);

    return null;
};

export default Home;
