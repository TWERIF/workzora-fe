import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { LogoGreen } from "../../svg/LogoGreen";
import FooterMeta from "./FooterMeta";

// Кожен ключ відповідає секції "columns.<key>" у /public/locales/{lng}/footer.json
// href-и лишаються тут, у коді (не в перекладах), бо це не текст, а маршрутизація.
type ColumnKey = "freelancer" | "about" | "terms";

export default function Footer() {
  const { t } = useTranslation("footer");
  const { locale } = useRouter();

  const hrefsByColumn: Record<ColumnKey, string[]> = {
    freelancer: [
      `/${locale}/categories`,
      `/${locale}/coming-soon`,
      `/${locale}/freelancers`,
      `/${locale}/news`,
    ],
    about: [
      `/${locale}/about-us`,
      `/${locale}/about-us#how-it-works`,
      `/${locale}/about-us#benefits`,
      `/${locale}/about-us#team`,
      `/${locale}/about-us#vision`,
      `/${locale}/about-us#contacts`,
    ],
    terms: [
      `/${locale}/privacy-policy`,
      `/${locale}/terms-and-conditions`,
      `/${locale}/copyright-policy`,
      `/${locale}/code-of-conduct`,
      `/${locale}/fees`,
    ],
  };

  return (
    <footer className="bg-bg-dark text-text-dark">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-10 lg:gap-16 items-start">
          <div className="flex flex-col items-center lg:items-start gap-6">
            <Link href={"/"} className="w-40">
              <LogoGreen />
            </Link>

            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9  flex items-center justify-center text-text-muted"
                aria-hidden="true"
              ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.0286 2C14.1536 2.003 14.7246 2.009 15.2176 2.023L15.4116 2.03C15.6356 2.038 15.8566 2.048 16.1236 2.06C17.1876 2.11 17.9136 2.278 18.5506 2.525C19.2106 2.779 19.7666 3.123 20.3226 3.678C20.8313 4.17773 21.2248 4.78247 21.4756 5.45C21.7226 6.087 21.8906 6.813 21.9406 7.878C21.9526 8.144 21.9626 8.365 21.9706 8.59L21.9766 8.784C21.9916 9.276 21.9976 9.847 21.9996 10.972L22.0006 11.718V13.028C22.003 13.7574 21.9953 14.4868 21.9776 15.216L21.9716 15.41C21.9636 15.635 21.9536 15.856 21.9416 16.122C21.8916 17.187 21.7216 17.912 21.4756 18.55C21.2248 19.2175 20.8313 19.8223 20.3226 20.322C19.8228 20.8307 19.2181 21.2242 18.5506 21.475C17.9136 21.722 17.1876 21.89 16.1236 21.94L15.4116 21.97L15.2176 21.976C14.7246 21.99 14.1536 21.997 13.0286 21.999L12.2826 22H10.9736C10.2438 22.0026 9.51409 21.9949 8.78457 21.977L8.59057 21.971C8.35318 21.962 8.11584 21.9517 7.87857 21.94C6.81457 21.89 6.08857 21.722 5.45057 21.475C4.7834 21.2241 4.17901 20.8306 3.67957 20.322C3.17051 19.8224 2.77668 19.2176 2.52557 18.55C2.27857 17.913 2.11057 17.187 2.06057 16.122L2.03057 15.41L2.02557 15.216C2.00713 14.4868 1.9988 13.7574 2.00057 13.028V10.972C1.9978 10.2426 2.00514 9.5132 2.02257 8.784L2.02957 8.59C2.03757 8.365 2.04757 8.144 2.05957 7.878C2.10957 6.813 2.27757 6.088 2.52457 5.45C2.77626 4.7822 3.17079 4.17744 3.68057 3.678C4.17972 3.16955 4.78376 2.77607 5.45057 2.525C6.08857 2.278 6.81357 2.11 7.87857 2.06C8.14457 2.048 8.36657 2.038 8.59057 2.03L8.78457 2.024C9.51376 2.00623 10.2432 1.99857 10.9726 2.001L13.0286 2ZM12.0006 7C10.6745 7 9.40272 7.52678 8.46503 8.46447C7.52735 9.40215 7.00057 10.6739 7.00057 12C7.00057 13.3261 7.52735 14.5979 8.46503 15.5355C9.40272 16.4732 10.6745 17 12.0006 17C13.3267 17 14.5984 16.4732 15.5361 15.5355C16.4738 14.5979 17.0006 13.3261 17.0006 12C17.0006 10.6739 16.4738 9.40215 15.5361 8.46447C14.5984 7.52678 13.3267 7 12.0006 7ZM12.0006 9C12.3945 8.99994 12.7847 9.07747 13.1487 9.22817C13.5127 9.37887 13.8434 9.5998 14.122 9.87833C14.4007 10.1569 14.6217 10.4875 14.7725 10.8515C14.9233 11.2154 15.001 11.6055 15.0011 11.9995C15.0011 12.3935 14.9236 12.7836 14.7729 13.1476C14.6222 13.5116 14.4013 13.8423 14.1227 14.121C13.8442 14.3996 13.5135 14.6206 13.1496 14.7714C12.7856 14.9223 12.3955 14.9999 12.0016 15C11.2059 15 10.4429 14.6839 9.88025 14.1213C9.31764 13.5587 9.00157 12.7957 9.00157 12C9.00157 11.2044 9.31764 10.4413 9.88025 9.87868C10.4429 9.31607 11.2059 9 12.0016 9M17.2516 5.5C16.92 5.5 16.6021 5.6317 16.3677 5.86612C16.1333 6.10054 16.0016 6.41848 16.0016 6.75C16.0016 7.08152 16.1333 7.39946 16.3677 7.63388C16.6021 7.8683 16.92 8 17.2516 8C17.5831 8 17.901 7.8683 18.1355 7.63388C18.3699 7.39946 18.5016 7.08152 18.5016 6.75C18.5016 6.41848 18.3699 6.10054 18.1355 5.86612C17.901 5.6317 17.5831 5.5 17.2516 5.5Z" fill="white" />
                </svg>
              </div>

              <div
                className="w-9 h-9  flex items-center justify-center text-text-muted"
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="white" />
                </svg>

              </div>

              <div
                className="w-9 h-9  flex items-center justify-center text-text-muted"
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.855 4 13.732 4.022 14.582 4.058L15.586 4.106L16.547 4.163L17.447 4.224L18.269 4.288C19.1612 4.35589 20.0008 4.73643 20.64 5.3626C21.2791 5.98877 21.6768 6.8204 21.763 7.711L21.803 8.136L21.878 9.046C21.948 9.989 22 11.017 22 12C22 12.983 21.948 14.011 21.878 14.954L21.803 15.864L21.763 16.289C21.6768 17.1798 21.2789 18.0115 20.6396 18.6377C20.0002 19.2639 19.1604 19.6443 18.268 19.712L17.448 19.775L16.548 19.837L15.586 19.894L14.582 19.942C13.7218 19.9793 12.861 19.9986 12 20C11.139 19.9986 10.2782 19.9793 9.418 19.942L8.414 19.894L7.453 19.837L6.553 19.775L5.731 19.712C4.83881 19.6441 3.9992 19.2636 3.36004 18.6374C2.72089 18.0112 2.32319 17.1796 2.237 16.289L2.197 15.864L2.122 14.954C2.04583 13.9711 2.00514 12.9858 2 12C2 11.017 2.052 9.989 2.122 9.046L2.197 8.136L2.237 7.711C2.32316 6.82055 2.72071 5.98905 3.35966 5.36291C3.99861 4.73676 4.83799 4.35612 5.73 4.288L6.551 4.224L7.451 4.163L8.413 4.106L9.417 4.058C10.2775 4.02073 11.1387 4.00139 12 4ZM10 9.575V14.425C10 14.887 10.5 15.175 10.9 14.945L15.1 12.52C15.1914 12.4674 15.2673 12.3916 15.3201 12.3003C15.3729 12.209 15.4007 12.1055 15.4007 12C15.4007 11.8945 15.3729 11.791 15.3201 11.6997C15.2673 11.6084 15.1914 11.5326 15.1 11.48L10.9 9.056C10.8088 9.00332 10.7053 8.9756 10.5999 8.97562C10.4945 8.97563 10.3911 9.00339 10.2998 9.0561C10.2086 9.1088 10.1329 9.1846 10.0802 9.27587C10.0276 9.36713 9.99993 9.47065 10 9.576V9.575Z" fill="white" />
                </svg>

              </div>

              <div
                className="w-9 h-9 flex items-center justify-center text-text-muted"
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z" fill="white" />
                </svg>

              </div>
            </div>

            <div className="text-xs text-text-muted text-center lg:text-left leading-relaxed">
              <p>{t("brand.trademark")}</p>
              <p>{t("brand.copyright")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10">
            <FooterColumn columnKey="freelancer" hrefs={hrefsByColumn.freelancer} t={t} />
            <FooterColumn columnKey="about" hrefs={hrefsByColumn.about} t={t} />
            <FooterColumn columnKey="terms" hrefs={hrefsByColumn.terms} t={t} />
          </div>

          <FooterMeta />
        </div>
      </div>
    </footer>
  );
}

const FooterColumn = ({
  columnKey,
  hrefs,
  t,
}: {
  columnKey: ColumnKey;
  hrefs: string[];
  t: (key: string, opts?: any) => any;
}) => {
  const title = t(`columns.${columnKey}.title`);
  const links = t(`columns.${columnKey}.links`, { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <h4 className="text-base md:text-lg font-bold uppercase tracking-wider">{title}</h4>
      <ul className="flex flex-col gap-2 md:gap-3">
        {links.map((link, idx) => (
          <li key={idx} className="leading-tight">
            <a
              href={hrefs[idx] ?? `/${columnKey}`}
              className="text-sm text-text-muted hover:text-success transition-all block w-full break-words whitespace-normal"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};