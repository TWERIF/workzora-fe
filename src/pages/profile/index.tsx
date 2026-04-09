import IconEdit from '@/components/svg/IconEdit';
import AccountSettings from '@/components/ui/Account/AccountSettings';
import BankVerification from '@/components/ui/Account/BankVerification';
import VerificationAccount from '@/components/ui/Account/VerificationAccount';
import Breadcrumbs from '@/components/ui/BreadCrumbs';
import InputEdit from '@/components/ui/Input/InputEdit';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

export default function ProfileSettings() {
    const { t } = useTranslation("common");
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen ${isDark ? "bg-[#2A2A2A] py-8 text-white" : "bg-[#F7F7F7] text-[#333333]"}`}>
            <div className="container mx-auto px-4">
                <Breadcrumbs />

                <h1 className="text-3xl font-bold my-10">My Account</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div className="lg:col-span-8 space-y-12">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputEdit
                                    label="Firstname"
                                    placeholder="Введіть ім'я"
                                    icon={<IconEdit />}
                                />
                                <InputEdit
                                    label="Lastname"
                                    placeholder="Введіть прізвище"
                                    icon={<IconEdit />}
                                />
                                <div className="md:col-span-2">
                                    <InputEdit
                                        label="Nickname"
                                        placeholder="Gromotey"
                                        icon={<IconEdit />}
                                        isFullWidth
                                    />
                                </div>
                                <InputEdit
                                    label="Email"
                                    type="email"
                                    placeholder="example@mail.com"
                                    icon={<IconEdit />}
                                />
                                <InputEdit
                                    label="Confirm email"
                                    placeholder="example@mail.com"
                                />
                                <div className="md:col-span-2">
                                    <InputEdit
                                        label="Enter security code from Email"
                                        placeholder="29867fadskjh9q237y4rakhn093u89seuj"
                                        isFullWidth
                                    />
                                </div>
                            </div>
                        </form>

                        {/* Компонент верифікації тепер під формою в тій же колонці */}
                        <div className="w-full">
                            <VerificationAccount />
                        </div>
                        <div className="w-full">
                            <BankVerification />
                        </div>
                    </div>

                    <aside className="lg:col-span-4 w-full">
                        <div className="sticky top-8">
                            <AccountSettings />
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}