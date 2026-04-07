import { useEffect } from 'react';
import ButtonSocial from './ButtonSocial';
import IconGoogle from '@/components/svg/IconGoogle';
import { useTranslation } from 'react-i18next';

declare global {
    interface Window {
        google: any;
    }
}

export default function GoogleLoginButton() {
    const { t, i18n } = useTranslation('common');
    useEffect(() => {
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
            document.getElementById('googleBtn'),
            { theme: 'outline', size: 'large' }
        );

    }, []);

    async function handleCredentialResponse(response: any) {
        const res = await fetch(
            'https://api.yourdohero.com/auth/google',
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idToken: response.credential,
                }),
            }
        );

        if (res.ok) {
            window.location.href = '/profile';
        }
    }

    return <ButtonSocial id="googleBtn" text={<div className="flex justify-between items-center"><IconGoogle /> {t("auth.buttons.google")} <div className="w-[30px]"></div></div>} onClick={() => { }} />;
}
