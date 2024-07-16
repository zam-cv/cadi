// src/services/authService.ts
interface AuthResponse {
  token: string;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch('https://api.example.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const signUp = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch('https://api.example.com/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Sign up failed');
  }

  return response.json();
};
