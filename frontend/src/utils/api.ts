import { data } from "autoprefixer";

const baseURL = 'http://localhost:5000';

export const signup = async (username: string, password: string) => {
    const response = await fetch(`${baseURL}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (result.user && result.token) {
        localStorage.setItem('token', result.token);  // Store token in localStorage
    }
    return result;
};

export const signin = async (username: string, password: string) => {
    const response = await fetch(`${baseURL}/api/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.user && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.user.id.toString());
    }
    return result;


};

export const getProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${baseURL}/api/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};


export const createProfile = async (userId: number, first_name: string, last_name: string, email: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${baseURL}/api/profile/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, first_name, last_name, email }),
    });
    return await response.json();
};

export const getBeneficiary = async (beneficiaryId: string) => {
    const response = await fetch(`${baseURL}/api/beneficiaries/${beneficiaryId}`);
    return await response.json();
};

// Create a new beneficiary
export const createBeneficiary = async (data: any) => {
    const response = await fetch(`${baseURL}/api/beneficiaries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response);
    return await response.json();
};

export const createPayout = async (data: any) => {
    const response = await fetch(`${baseURL}/api/payouts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response);
    return await response.json();
};

export const getPayouts = async () => {
    try {
        const response = await fetch(`${baseURL}/api/payouts`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch payouts", error);
        return null;
    }
}

export const getPaymentMethodType = async (payoutCurrency: string) => {
    try {
        const response = await fetch(`${baseURL}/api/payoutMethods?payout_currency=${payoutCurrency}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch payment method type", error);
        return null;
    }
};

export const getRequiredFields = async (payoutMethodType: string, payoutAmount: number, beneficiaryEntityType: string, beneficiaryCountry: string, payoutCurrency: string) => {
    try {
        const response = await fetch(`${baseURL}/api/payouts/${payoutMethodType}/details?sender_currency=USD&sender_entity_type=individual&beneficiary_entity_type=${beneficiaryEntityType}&sender_country=US&beneficiary_country=${beneficiaryCountry}&payout_currency=${payoutCurrency}&payout_amount=${payoutAmount}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch required fields", error);
        return null;
    }
};




export const logout = () => {
    localStorage.removeItem('token');  // Remove the token
    localStorage.removeItem('userId');
    localStorage.removeItem('beneficiaryId');
};

