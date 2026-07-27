"use client";

import { TrianglesBg } from "@/shared/components/svg/TrianglesBg";
import { AddMemberIcon } from "@/shared/components/svg/AddMemberIcon";
import { HandIcon } from "@/shared/components/svg/HandIcon";
import { PostIcon } from "@/shared/components/svg/PostIcon";
import { WorkIcon } from "@/shared/components/svg/WorkIcon";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface Step {
  number: string;
  title: string;
  description: string;
}

type Tab = "clients" | "freelancers";

// Icon assigned per step index (same order for both tabs)
const STEP_ICONS = [PostIcon, HandIcon, AddMemberIcon, WorkIcon];

// TODO: swap these placeholder paths for the real photos from the design
const STEP_IMAGES: Record<Tab, string[]> = {
  clients: [
    "/images/how-it-works/clients-1.png",
    "/images/how-it-works/clients-2.png",
    "/images/how-it-works/clients-3.png",
    "/images/how-it-works/clients-4.png",
  ],
  freelancers: [
    "/images/how-it-works/clients-1.png",
    "/images/how-it-works/clients-2.png",
    "/images/how-it-works/clients-3.png",
    "/images/how-it-works/clients-4.png",
  ],
};

// Reveals children once they scroll into view
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` flex items-center gap-2 rounded-20 px-5 py-2 text-sm font-medium transition-colors duration-300 ${
        active
          ? "bg-success text-white"
          : "border bg-[#FFFFFF] dark:bg-[#333333] border-border text-text-muted hover:text-text dark:hover:text-text-dark"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function StepRow({ step, index, tab }: { step: Step; index: number; tab: Tab }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  const Icon = STEP_ICONS[index % STEP_ICONS.length];
  const imageFirst = index % 2 === 0;

  const badge = (
    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-success text-white shadow-input">
      <Icon  />
    </div>
  );

  const image = (
    <img
      src={STEP_IMAGES[tab][index]}
      alt={step.title}
      className="h-[230px] w-full rounded-20 object-cover"
    />
  );

  const content = (
    <div>
      <span className="mb-2 block text-sm font-semibold text-success">/{step.number}</span>
      <h3 className={`mb-2 text-xl font-semibold ${isDark ? "text-text-dark" : "text-text"}`}>
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed text-text-muted">{step.description}</p>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {/* Desktop / tablet: zig-zag timeline */}
      <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-center md:gap-6">
        {imageFirst ? (
          <>
            {image}
            {badge}
            {content}
          </>
        ) : (
          <>
            {content}
            {badge}
            {image}
          </>
        )}
      </div>

      {/* Mobile: stacked */}
      <div className="space-y-4 md:hidden">
        {image}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success text-white">
            <Icon  />
          </div>
          <span className="text-sm font-semibold text-success">/{step.number}</span>
        </div>
        <h3 className={`text-lg font-semibold ${isDark ? "text-text-dark" : "text-text"}`}>
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">{step.description}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const { t } = useTranslation("main");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [tab, setTab] = useState<Tab>("clients");

  const steps = t(
    tab === "clients" ? "howItWorks.stepsClients" : "howItWorks.stepsFreelancers",
    { returnObjects: true }
  ) as Step[];

  return (
    <section
      className={`relative overflow-hidden py-20 ${
        isDark ? "bg-bg-dark text-text-dark" : "bg-bg text-text"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <TrianglesBg />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          {t("howItWorks.title")}
        </h2>

        <div className="mb-16 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-20 border border-border p-1 bg-[#F5F5F5] dark:bg-[#3D3D3D]">
            <TabButton
              active={tab === "clients"}
              onClick={() => setTab("clients")}
              icon={HandIcon}
              label={t("howItWorks.tabs.clients")}
            />
            <TabButton
              active={tab === "freelancers"}
              onClick={() => setTab("freelancers")}
              icon={WorkIcon}
              label={t("howItWorks.tabs.freelancers")}
            />
          </div>
        </div>

        {/* Center connecting line (desktop only) */}
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-success/30 md:block" />
          <div className="space-y-12 md:space-y-16">
            {steps?.map((step, index) => (
              <StepRow key={step.number ?? index} step={step} index={index} tab={tab} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}