"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Globe2,
  LifeBuoy,
  MonitorSmartphone,
  Paperclip,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const issueTypes = [
  ["website_down", "Website werkt niet"],
  ["bug", "Foutmelding of bug"],
  ["form_issue", "Formulier werkt niet"],
  ["content_change", "Tekstaanpassing"],
  ["media_change", "Afbeelding/content aanpassen"],
  ["tracking_analytics", "Tracking/analytics probleem"],
  ["performance", "Snelheid/performance"],
  ["seo", "SEO/vindbaarheid"],
  ["email_domain_hosting", "E-mail/domein/hosting"],
  ["other", "Andere vraag"],
] as const;

const browsers = [
  ["chrome", "Google Chrome"],
  ["safari", "Safari"],
  ["edge", "Microsoft Edge"],
  ["firefox", "Mozilla Firefox"],
  ["opera", "Opera"],
  ["samsung_internet", "Samsung Internet"],
  ["brave", "Brave"],
  ["unknown", "Ik weet het niet"],
  ["other", "Andere browser"],
] as const;

const devices = [
  ["windows_laptop_desktop", "Windows laptop/desktop"],
  ["mac", "Mac / MacBook"],
  ["iphone", "iPhone"],
  ["ipad", "iPad"],
  ["android_phone", "Android telefoon"],
  ["android_tablet", "Android tablet"],
  ["chromebook", "Chromebook"],
  ["multiple", "Meerdere apparaten"],
  ["unknown", "Ik weet het niet"],
  ["other", "Ander apparaat"],
] as const;

const priorities = [
  { value: "normal", label: "Normaal", description: "Kleine bug, tekstaanpassing of gewone vraag." },
  { value: "urgent", label: "Dringend", description: "Zichtbaar probleem dat klanten of leads kan kosten." },
  { value: "emergency", label: "Noodgeval", description: "Website offline of kritieke functionaliteit kapot." },
] as const;

const languages = [
  { code: "nl", label: "NL", full: "Nederlands", active: true },
  { code: "fr", label: "FR", full: "Français", active: false },
  { code: "en", label: "EN", full: "English", active: false },
] as const;

type FormState = {
  firstName: string;
  companyName: string;
  email: string;
  address: string;
  phone: string;
  websiteUrl: string;
  pageUrl: string;
  issueType: string;
  priority: "normal" | "urgent" | "emergency";
  description: string;
  browser: string;
  device: string;
  privacyAccepted: boolean;
  honeypot: string;
};

const initialForm: FormState = {
  firstName: "",
  companyName: "",
  email: "",
  address: "",
  phone: "",
  websiteUrl: "",
  pageUrl: "",
  issueType: "bug",
  priority: "normal",
  description: "",
  browser: "",
  device: "",
  privacyAccepted: false,
  honeypot: "",
};

export default function SupportHomePage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [languageNotice, setLanguageNotice] = useState<string | null>(null);

  const endpoint = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_CONVEX_HTTP_URL?.replace(/\/$/, "");
    return base ? `${base}/support/tickets` : "";
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submitTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setTicketNumber(null);

    if (!endpoint) {
      setError("Support endpoint is nog niet geconfigureerd.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "De supportaanvraag kon niet verzonden worden.");
      }
      setTicketNumber(payload.ticketNumber);
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "De supportaanvraag kon niet verzonden worden.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(229,138,42,0.24),transparent_32rem)]" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col px-6 py-8 lg:px-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-lg font-black tracking-tight">Stinis Media</div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher onInactive={(language) => setLanguageNotice(`${language} volgt wanneer de volledige website klaar is.`)} />
              <a href="#ticket" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-950">
                Ticket indienen
              </a>
            </div>
          </header>
          {languageNotice ? (
            <div className="mt-4 self-end rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-stone-200">
              {languageNotice}
            </div>
          ) : null}

          <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1fr_420px]">
            <div>
              <Badge variant="secondary">Support voor je website</Badge>
              <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
                Meld snel een probleem met je website.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                Vul je contactgegevens, website en probleemomschrijving in. Wij bekijken je aanvraag en nemen zo snel mogelijk contact op.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><a href="#ticket">Start je aanvraag <ArrowRight className="h-4 w-4" /></a></Button>
                <Button asChild variant="secondary" size="lg"><a href="#uren">Kantooruren bekijken</a></Button>
              </div>
              <p className="mt-8 text-sm text-stone-400">
                Gericht op vindbaarheid, gefocust op groei. Ook wanneer er iets vastloopt.
              </p>
            </div>

            <Card className="border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-orange-500 p-3 text-stone-950"><LifeBuoy className="h-6 w-6" /></div>
                <div>
                  <p className="font-semibold">Wat gebeurt er na je aanvraag?</p>
                  <p className="text-sm text-stone-300">We bekijken de impact, bepalen de prioriteit en nemen contact op tijdens kantooruren.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-stone-200">
                <div className="rounded-2xl bg-white/10 p-4"><Clock className="mb-2 h-4 w-4 text-orange-300" /> Kantooruren: ma-vr, 09:00-17:00</div>
                <div className="rounded-2xl bg-white/10 p-4"><ShieldCheck className="mb-2 h-4 w-4 text-orange-300" /> Geen wachtwoorden of toegangscodes meesturen.</div>
                <div className="rounded-2xl bg-white/10 p-4"><Paperclip className="mb-2 h-4 w-4 text-orange-300" /> Screenshots/bijlagen volgen in de volgende technische release.</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="ticket" className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="space-y-6">
          <Badge>Support intake</Badge>
          <h2 className="text-4xl font-black tracking-tight">Vertel ons wat er misloopt.</h2>
          <p className="text-stone-600">
            Hoe concreter je beschrijving, hoe sneller we kunnen schakelen. Geef zeker de website URL,
            de pagina waar het probleem zit en wat je verwacht dat er gebeurt.
          </p>
          <div className="rounded-[2rem] bg-stone-950 p-6 text-white">
            <Sparkles className="mb-4 h-6 w-6 text-orange-300" />
            <p className="font-semibold">Prioriteiten</p>
            <p className="mt-2 text-sm text-stone-300">
              Kies “Noodgeval” alleen als je website offline is of een cruciale lead-/checkoutflow stuk is.
            </p>
          </div>
        </div>

        <Card className="p-6 md:p-8">
          {ticketNumber ? (
            <div className="mb-5 rounded-3xl border border-green-200 bg-green-50 p-5 text-green-950">
              <CheckCircle2 className="mb-3 h-6 w-6" />
              <p className="font-semibold">Ticket ontvangen: {ticketNumber}</p>
              <p className="mt-1 text-sm">Bedankt. We bekijken je aanvraag en nemen contact op tijdens onze kantooruren.</p>
            </div>
          ) : null}
          {error ? (
            <div className="mb-5 rounded-3xl border border-red-200 bg-red-50 p-5 text-red-950">
              <AlertCircle className="mb-3 h-6 w-6" />
              <p className="font-semibold">Niet verzonden</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          ) : null}

          <form onSubmit={submitTicket} className="space-y-5">
            <input className="hidden" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={(e) => update("honeypot", e.target.value)} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Voornaam" required><Input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required /></Field>
              <Field label="Bedrijfsnaam"><Input value={form.companyName} onChange={(e) => update("companyName", e.target.value)} /></Field>
              <Field label="E-mailadres" required><Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required /></Field>
              <Field label="Telefoonnummer" required><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} required /></Field>
              <Field label="Adres"><Input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Straat, nummer, gemeente" /></Field>
              <Field label="Website URL" required><Input placeholder="https://jouwwebsite.be" value={form.websiteUrl} onChange={(e) => update("websiteUrl", e.target.value)} required /></Field>
              <Field label="Pagina waar het probleem zit"><Input placeholder="Optioneel" value={form.pageUrl} onChange={(e) => update("pageUrl", e.target.value)} /></Field>
            </div>

            <Field label="Type probleem" required>
              <CustomSelect
                value={form.issueType}
                options={issueTypes.map(([value, label]) => ({ value, label }))}
                onChange={(value) => update("issueType", value)}
                ariaLabel="Type probleem"
              />
            </Field>

            <Field label="Prioriteit" required>
              <div className="grid gap-3 md:grid-cols-3">
                {priorities.map((item) => (
                  <button key={item.value} type="button" onClick={() => update("priority", item.value)} className={`rounded-2xl border p-4 text-left text-sm transition ${form.priority === item.value ? "border-orange-400 bg-orange-50 shadow-sm" : "border-stone-200 bg-white hover:border-stone-300"}`}>
                    <strong>{item.label}</strong>
                    <span className="mt-1 block text-stone-600">{item.description}</span>
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Beschrijving van het probleem" required>
              <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Wat gebeurt er? Op welke pagina? Sinds wanneer? Zie je een foutmelding?" required />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Browser">
                <CustomSelect
                  value={form.browser}
                  placeholder="Kies je browser"
                  options={browsers.map(([value, label]) => ({ value, label }))}
                  onChange={(value) => update("browser", value)}
                  ariaLabel="Browser"
                />
              </Field>
              <Field label="Apparaat">
                <CustomSelect
                  value={form.device}
                  placeholder="Kies je apparaat"
                  options={devices.map(([value, label]) => ({ value, label }))}
                  onChange={(value) => update("device", value)}
                  ariaLabel="Apparaat"
                />
              </Field>
            </div>

            <label className="flex gap-3 rounded-2xl bg-stone-50 p-4 text-sm text-stone-700">
              <input type="checkbox" checked={form.privacyAccepted} onChange={(e) => update("privacyAccepted", e.target.checked)} required className="mt-1 accent-orange-500" />
              <span>Ik ga akkoord dat Stinis Media mijn gegevens verwerkt om deze supportaanvraag op te volgen. Ik voeg geen wachtwoorden, API keys of toegangscodes toe.</span>
            </label>

            <Button type="submit" size="lg" disabled={submitting} className="w-full">
              {submitting ? "Ticket indienen..." : "Ticket indienen"}
            </Button>
          </form>
        </Card>
      </section>

      <section id="uren" className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Card className="grid gap-6 bg-stone-950 p-8 text-white md:grid-cols-3">
          <div><p className="text-sm uppercase tracking-[0.2em] text-orange-300">Kantooruren</p><h2 className="mt-2 text-3xl font-black">Ma-vr 09:00-17:00</h2></div>
          <p className="text-stone-300 md:col-span-2">Binnen kantooruren bekijken we nieuwe tickets zo snel mogelijk. Noodgevallen krijgen prioriteit. Buiten kantooruren behandelen we tickets de eerstvolgende werkdag, tenzij er aparte afspraken bestaan.</p>
        </Card>
      </section>
    </main>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}{required ? <span className="text-orange-600"> *</span> : null}</Label>
      {children}
    </div>
  );
}

function LanguageSwitcher({ onInactive }: { onInactive: (language: string) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1 text-xs font-bold text-white">
      <Globe2 className="ml-2 h-4 w-4 text-orange-300" />
      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          aria-label={`Taal: ${language.full}`}
          onClick={() => {
            if (!language.active) onInactive(language.full);
          }}
          className={cn(
            "rounded-full px-3 py-1.5 transition",
            language.active ? "bg-orange-500 text-stone-950" : "text-stone-300 hover:bg-white/10 hover:text-white",
          )}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}

function CustomSelect({
  value,
  options,
  onChange,
  placeholder = "Maak een keuze",
  ariaLabel,
}: {
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-12 w-full items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 text-left text-sm text-stone-900 shadow-sm transition hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <span className={selected ? "" : "text-stone-400"}>{selected?.label ?? placeholder}</span>
        <ChevronDown className={cn("h-4 w-4 text-stone-500 transition", open ? "rotate-180" : "")} />
      </button>
      {open ? (
        <div className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-stone-200 bg-white p-1 shadow-2xl shadow-stone-900/10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition",
                option.value === value ? "bg-orange-50 font-semibold text-stone-950" : "text-stone-700 hover:bg-stone-50",
              )}
            >
              {option.value === value ? <MonitorSmartphone className="h-4 w-4 text-orange-500" /> : <span className="h-4 w-4" />}
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
