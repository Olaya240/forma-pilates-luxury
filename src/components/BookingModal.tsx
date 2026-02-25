import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedService?: string;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .bm-overlay {
    background: rgba(5,5,5,0.85) !important;
    backdrop-filter: blur(12px);
  }

  .bm-panel {
    font-family: 'Jost', sans-serif;
    background: #111009 !important;
    border: 1px solid rgba(255,255,255,0.07) !important;
    border-radius: 0 !important;
    box-shadow: 0 40px 80px rgba(0,0,0,0.6) !important;
    max-width: 460px !important;
    padding: 0 !important;
    overflow: hidden;
  }

  .bm-header {
    padding: 36px 36px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 28px;
    margin-bottom: 0;
  }

  .bm-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.4);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    border-radius: 0;
  }
  .bm-close:hover {
    border-color: rgba(255,255,255,0.35);
    color: rgba(255,255,255,0.8);
  }

  .bm-badge {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a96e;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
  }
  .bm-badge::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 1px;
    background: #c9a96e;
  }

  .bm-title {
    font-family: 'Cormorant Garamond', serif !important;
    font-weight: 300 !important;
    font-size: 1.9rem !important;
    color: #f5f0e8 !important;
    line-height: 1.1 !important;
    letter-spacing: -0.01em !important;
    margin: 0 !important;
  }
  .bm-title em {
    font-style: italic;
    color: #c9a96e;
  }

  .bm-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.75rem;
    color: rgba(245,240,232,0.38);
    letter-spacing: 0.02em;
    margin-top: 8px !important;
  }

  .bm-body {
    padding: 28px 36px 36px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .bm-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .bm-label {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.4);
  }

  .bm-input {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.82rem;
    color: #f5f0e8;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 0;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.25s;
    width: 100%;
    box-sizing: border-box;
  }
  .bm-input::placeholder { color: rgba(245,240,232,0.2); }
  .bm-input:focus { border-color: rgba(201,169,110,0.4); }
  .bm-input.error { border-color: rgba(220,80,80,0.5); }

  .bm-select {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.82rem;
    color: #f5f0e8;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 0;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.25s;
    width: 100%;
    appearance: none;
    cursor: pointer;
  }
  .bm-select:focus { border-color: rgba(201,169,110,0.4); }
  .bm-select option { background: #111009; color: #f5f0e8; }
  .bm-select.error { border-color: rgba(220,80,80,0.5); }

  .bm-date-btn {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.82rem;
    color: rgba(245,240,232,0.35);
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 0;
    padding: 11px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: border-color 0.25s;
    width: 100%;
    text-align: left;
  }
  .bm-date-btn.has-date { color: #f5f0e8; }
  .bm-date-btn:hover, .bm-date-btn:focus { border-color: rgba(201,169,110,0.4); outline: none; }
  .bm-date-btn.error { border-color: rgba(220,80,80,0.5); }

  .bm-error {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.06em;
    color: rgba(220,80,80,0.8);
  }

  .bm-submit {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: #c9a96e;
    color: #0f0f0f;
    border: none;
    padding: 14px;
    width: 100%;
    cursor: pointer;
    transition: background 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 0;
    margin-top: 4px;
  }
  .bm-submit:hover:not(:disabled) { background: #b8924f; }
  .bm-submit:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const BookingModal = ({ open, onOpenChange, preselectedService }: BookingModalProps) => {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: preselectedService || "",
    date: undefined as Date | undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calOpen, setCalOpen] = useState(false);

  const locale = i18n.language === "fr" ? fr : enUS;

  const bookingSchema = z.object({
    name:    z.string().trim().min(2, t("booking.errors.nameMin")).max(100, t("booking.errors.nameMax")),
    email:   z.string().trim().email(t("booking.errors.emailInvalid")).max(255),
    phone:   z.string().trim().min(8, t("booking.errors.phoneMin")).max(20, t("booking.errors.phoneMax")),
    service: z.string().min(1, t("booking.errors.serviceRequired")),
    date:    z.date({ required_error: t("booking.errors.dateRequired") }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    const message = `${t("booking.whatsappMessage")}\n\n${t("booking.fields.name")}: ${formData.name}\n${t("booking.fields.email")}: ${formData.email}\n${t("booking.fields.phone")}: ${formData.phone}\n${t("booking.fields.service")}: ${formData.service}\n${t("booking.fields.preferredDate")}: ${formData.date ? format(formData.date, "PPP", { locale }) : ""}`;
    window.open(`https://wa.me/212666653616?text=${encodeURIComponent(message)}`, "_blank");
    toast({ title: t("booking.success.title"), description: t("booking.success.description") });
    setIsSubmitting(false);
    onOpenChange(false);
    setFormData({ name: "", email: "", phone: "", service: "", date: undefined });
  };

  const services = [
    { value: "private", label: t("services.items.private.title") },
    { value: "duo",     label: t("services.items.duo.title") },
    { value: "group",   label: t("services.items.group.title") },
  ];

  return (
    <>
      <style>{styles}</style>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bm-panel" aria-describedby="bm-desc-id">
          {/* Custom close */}
          <button className="bm-close" onClick={() => onOpenChange(false)} aria-label="Close">
            <X size={13} />
          </button>

          <DialogHeader className="bm-header">
            <div className="bm-badge">Reserve</div>
            <DialogTitle className="bm-title">
              {t("booking.title")}
            </DialogTitle>
            <DialogDescription id="bm-desc-id" className="bm-desc">
              {t("booking.description")}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="bm-body">
            {/* Name */}
            <div className="bm-field">
              <label className="bm-label">{t("booking.fields.name")}</label>
              <input
                className={cn("bm-input", errors.name && "error")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("booking.placeholders.name")}
              />
              {errors.name && <span className="bm-error">{errors.name}</span>}
            </div>

            {/* Email + Phone row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="bm-field">
                <label className="bm-label">{t("booking.fields.email")}</label>
                <input
                  type="email"
                  className={cn("bm-input", errors.email && "error")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("booking.placeholders.email")}
                />
                {errors.email && <span className="bm-error">{errors.email}</span>}
              </div>
              <div className="bm-field">
                <label className="bm-label">{t("booking.fields.phone")}</label>
                <input
                  type="tel"
                  className={cn("bm-input", errors.phone && "error")}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t("booking.placeholders.phone")}
                />
                {errors.phone && <span className="bm-error">{errors.phone}</span>}
              </div>
            </div>

            {/* Service */}
            <div className="bm-field">
              <label className="bm-label">{t("booking.fields.service")}</label>
              <div style={{ position: "relative" }}>
                <select
                  className={cn("bm-select", errors.service && "error")}
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="" disabled>{t("booking.placeholders.service")}</option>
                  {services.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <div style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  pointerEvents: "none", color: "rgba(201,169,110,0.5)", fontSize: 10,
                }}>▾</div>
              </div>
              {errors.service && <span className="bm-error">{errors.service}</span>}
            </div>

            {/* Date */}
            <div className="bm-field">
              <label className="bm-label">{t("booking.fields.preferredDate")}</label>
              <Popover open={calOpen} onOpenChange={setCalOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn("bm-date-btn", formData.date && "has-date", errors.date && "error")}
                  >
                    <CalendarIcon size={13} color="rgba(201,169,110,0.6)" />
                    {formData.date
                      ? format(formData.date, "PPP", { locale })
                      : t("booking.placeholders.date")}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  style={{
                    background: "#111009",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 0,
                    padding: 0,
                    boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => { setFormData({ ...formData, date }); setCalOpen(false); }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={locale}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <span className="bm-error">{errors.date}</span>}
            </div>

            {/* Submit */}
            <button type="submit" className="bm-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 size={13} className="animate-spin" /> {t("booking.submitting")}</>
              ) : (
                t("booking.submit")
              )}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingModal;