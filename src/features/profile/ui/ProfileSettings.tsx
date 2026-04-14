
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import AccountSettings from './AccountSettings';
import BankVerification from './BankVerification';
import VerificationAccount from './VerificationAccount';
import IconEdit from '@/shared/components/svg/IconEdit';
import Breadcrumbs from '@/shared/components/ui/BreadCrumbs';
import InputEdit from '@/shared/components/ui/Input/InputEdit';

export default function ProfileSettings() {
    const { t } = useTranslation("common");
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen ${isDark ? "bg-[#2A2A2A] py-8 text-white" : "bg-[#F7F7F7] text-[#333333]"}`}>
            <div className="container mx-auto px-4">
                <Breadcrumbs />

                <h1 className="text-3xl font-bold my-10">{t('profilePage.title')}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Додаємо order-2 для мобайлу, щоб основна форма була ПІСЛЯ налаштувань */}
                    <div className="order-2 lg:order-1 lg:col-span-8 space-y-12">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputEdit
                                    label={t('profilePage.form.firstname')}
                                    placeholder={t('profilePage.form.firstname_placeholder')}
                                    icon={<IconEdit />}
                                />
                                <InputEdit
                                    label={t('profilePage.form.lastname')}
                                    placeholder={t('profilePage.form.lastname_placeholder')}
                                    icon={<IconEdit />}
                                />
                                <div className="md:col-span-2">
                                    <InputEdit
                                        label={t('profilePage.form.nickname')}
                                        placeholder={t('profilePage.form.nickname_placeholder')}
                                        icon={<IconEdit />}
                                        isFullWidth
                                    />
                                </div>
                                <InputEdit
                                    label={t('profilePage.form.email')}
                                    type="email"
                                    placeholder={t('profilePage.form.email_placeholder')}
                                    icon={<IconEdit />}
                                />
                                <InputEdit
                                    label={t('profilePage.form.confirm_email')}
                                    placeholder={t('profilePage.form.email_placeholder')}
                                />
                                <div className="md:col-span-2">
                                    <InputEdit
                                        label={t('profilePage.form.security_code')}
                                        placeholder={t('profilePage.form.security_code_placeholder')}
                                        isFullWidth
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="w-full">
                            <VerificationAccount />
                        </div>
                        <div className="w-full">
                            <BankVerification />
                        </div>
                    </div>

                    {/* Додаємо order-1 для мобайлу, щоб блок був зверху */}
                    <aside className="order-1 lg:order-2 lg:col-span-4 w-full">
                        <div className="sticky top-8">
                            <AccountSettings />
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}