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

export const logout = () => {
    localStorage.removeItem('token');  // Remove the token
    localStorage.removeItem('userId');
};

