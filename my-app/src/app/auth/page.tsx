"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/services/auth';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            const result = await signUp(email, password);
            if (result) {
                alert('Sign up successful! Please check your email to confirm your account.');
            } else {
                alert('Sign up failed.');
            }
        } else {
            const result = await signIn(email, password);
            if (result) {
                alert('Sign in successful!');
                router.push('/users');
            } else {
                alert('Sign in failed.');
            }
        }
    };

    return (
        <div>
            <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
        </div>
    );
}
