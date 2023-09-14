const baseURL = 'http://localhost:5000';

export const signup = async (username: string, password: string) => {
    const response = await fetch(`${baseURL}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};

export const signin = async (username: string, password: string) => {
    const response = await fetch(`${baseURL}/api/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};
