import IconCheck from "@/shared/components/svg/IconCheck";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation("main");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const grid = t("makeItReal.grid", { returnObjects: true }) as {
    title: string;
    content: string;
  }[];

  return (
    <section className={`py-16 md:py-20 ${isDark ? "bg-bg-dark text-text-dark" : "bg-bg"}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-4xl font-semibold mb-10">
          {t("makeItReal.title.1")}{" "}
          <span className="text-success">{t("makeItReal.title.2")}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {grid.map((item, i) => (
            <div
              key={i}
              className={`rounded-20 p-6 flex flex-col gap-3 ${
                isDark ? "bg-bg-modalDark" : "bg-white shadow-input"
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-success/15 flex items-center justify-center">
                <IconCheck className="w-4 h-4 text-success" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="bg-gradient text-white rounded-2xl px-8 py-3 font-medium hover:opacity-90 transition-opacity">
            {t("getStarted")}
          </button>
        </div>
      </div>
    </section>
  );
}
