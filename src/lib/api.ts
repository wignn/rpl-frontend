"use server";

interface ApiRequestProps {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    headers?: HeadersInit;
  }
  

/*
this function is used(Blue Print) to make api requests to the backend
*/
export async function apiRequest<T>({ endpoint, method, body, headers = {} }: ApiRequestProps): Promise<T> {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api` || 'http://localhost:4000/api';

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY as string,
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    };
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, config);
        
        const responseBody = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMessage = responseBody?.message || response.statusText;
            console.error('API request error:', method, endpoint, errorMessage);
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }
        
        return responseBody as T;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

export async function fileRequest<T>({ endpoint, method, body, headers = {} }: ApiRequestProps): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const config: RequestInit = {
    method,
    headers:{
        'x-api-key': process.env.API_KEY as string,
        ...headers,
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
  };
  
    try {
        console.log("file request", `${baseUrl}/${endpoint}`, config);
        const response = await fetch(`${baseUrl}/${endpoint}`, config);
        
        const responseBody = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMessage = responseBody?.message || response.statusText;
            console.error('API request error:', method, endpoint, errorMessage);
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }
        
        return responseBody as T;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

