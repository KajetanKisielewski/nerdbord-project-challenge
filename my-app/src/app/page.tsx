"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getCurrentUser } from '@/services/auth';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const user = await getCurrentUser();
            if (!user) {
                router.push('/auth');
            } else {
                router.push('/users');
            }
        };

        checkUser();
    }, []);

    return null;
}
