"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Clock, LifeBuoy, Paperclip, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

const priorities = [
  { value: "normal", label: "Normaal", description: "Kleine bug, tekstaanpassing of gewone vraag." },
  { value: "urgent", label: "Dringend", description: "Zichtbaar probleem dat klanten of leads kan kosten." },
  { value: "emergency", label: "Noodgeval", description: "Website offline of kritieke functionaliteit kapot." },
] as const;

type FormState = {
  firstName: string;
  companyName: string;
  email: string;
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
          <header className="flex items-center justify-between">
            <div className="text-lg font-black tracking-tight">Stinis Media</div>
            <a href="#ticket" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-950">
              Ticket indienen
            </a>
          </header>

          <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1fr_420px]">
            <div>
              <Badge variant="secondary">Support voor je website</Badge>
              <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
                Meld snel een probleem met je website.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                Vul je website, contactgegevens en probleemomschrijving in. Wij krijgen je ticket
                automatisch binnen in het Stinis Media dashboard.
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
                  <p className="text-sm text-stone-300">We triëren op prioriteit en nemen contact op tijdens kantooruren.</p>
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
            <div className="rounded-3xl border border-green-200 bg-green-50 p-5 text-green-950">
              <CheckCircle2 className="mb-3 h-6 w-6" />
              <p className="font-semibold">Ticket ontvangen: {ticketNumber}</p>
              <p className="mt-1 text-sm">Je aanvraag staat nu in het Stinis Media dashboard.</p>
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
              <Field label="Website URL" required><Input placeholder="https://jouwwebsite.be" value={form.websiteUrl} onChange={(e) => update("websiteUrl", e.target.value)} required /></Field>
              <Field label="Pagina waar het probleem zit"><Input placeholder="Optioneel" value={form.pageUrl} onChange={(e) => update("pageUrl", e.target.value)} /></Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Type probleem" required>
                <select className="h-12 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm" value={form.issueType} onChange={(e) => update("issueType", e.target.value)}>
                  {issueTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </Field>
              <Field label="Prioriteit" required>
                <select className="h-12 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm" value={form.priority} onChange={(e) => update("priority", e.target.value as FormState["priority"])}>
                  {priorities.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </Field>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {priorities.map((item) => (
                <button key={item.value} type="button" onClick={() => update("priority", item.value)} className={`rounded-2xl border p-4 text-left text-sm transition ${form.priority === item.value ? "border-orange-400 bg-orange-50" : "border-stone-200 bg-white"}`}>
                  <strong>{item.label}</strong>
                  <span className="mt-1 block text-stone-600">{item.description}</span>
                </button>
              ))}
            </div>

            <Field label="Beschrijving van het probleem" required>
              <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Wat gebeurt er? Op welke pagina? Sinds wanneer? Zie je een foutmelding?" required />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Browser"><Input placeholder="Chrome, Safari, Edge..." value={form.browser} onChange={(e) => update("browser", e.target.value)} /></Field>
              <Field label="Apparaat"><Input placeholder="Laptop, iPhone, Android..." value={form.device} onChange={(e) => update("device", e.target.value)} /></Field>
            </div>

            <label className="flex gap-3 rounded-2xl bg-stone-50 p-4 text-sm text-stone-700">
              <input type="checkbox" checked={form.privacyAccepted} onChange={(e) => update("privacyAccepted", e.target.checked)} required className="mt-1" />
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

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}{required ? <span className="text-orange-600"> *</span> : null}</Label>
      {children}
    </div>
  );
}
