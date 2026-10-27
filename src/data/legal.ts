/**
 * EN legal pages (decision 25.10.2026, docs/i18n-inventory.md §6 no. 3): short English pages that
 * point to the German versions, which are binding. The German pages carry the full legal text
 * (ImprintView, PrivacyView, WithdrawalView), so `de` stays empty here – EN only.
 *
 * `text`: paragraphs. {link} → link to the German page (if no paragraph has it, the link gets its
 * own paragraph below); {email} → mailto link. `linkLang: 'de'` when the link text is German.
 * Withdrawal: Robert's ../01_Brief/right-of-withdrawal.md (27.10.2026), adapted to the site's
 * style – "email", spaced en dashes, ’, link text marked as German.
 */
import type { Localized } from '../i18n/localized.ts';

export type LegalKey = 'imprint' | 'privacy' | 'withdrawal';

export const legalPointers: Record<LegalKey, { text: Localized[]; link: Localized; linkLang?: 'de' }> = {
  imprint: {
    text: [
      {
        de: '',
        en: 'This website is run by Philipp von Rothkirch, Berlin, Germany. The legal notice (Impressum) required by German law is available in German only.',
      },
    ],
    link: { de: '', en: 'Read the legal notice in German →' },
  },
  privacy: {
    text: [
      {
        de: '',
        en: 'We take your privacy seriously. This site uses no cookies, no analytics and no tracking; videos from YouTube only load after you click “Load video”. The full privacy policy is available in German, which is the binding version.',
      },
    ],
    link: { de: '', en: 'Read the privacy policy in German →' },
  },
  withdrawal: {
    text: [
      {
        de: '',
        en: 'If you order the CD Lullabies From Around The World Vol. 2, you have a statutory right to withdraw from the purchase within 14 days, without giving any reason. The period runs for 14 days from the day you (or a third party named by you, other than the carrier) take possession of the CD.',
      },
      {
        de: '',
        en: 'To withdraw, send a clear statement of your decision – for example by post or email – to: Philipp von Rothkirch, Heart Tones, Obentrautstraße 51, 10963 Berlin, Germany · {email}. You may use the model withdrawal form, but you don’t have to. To meet the deadline, it’s enough to send your notice before the 14-day period ends.',
      },
      {
        de: '',
        en: 'If you withdraw, you bear the direct cost of returning the CD. We will refund your payment, including standard delivery costs, within 14 days of receiving your notice (we may wait until we have the CD back, or proof that you’ve sent it).',
      },
      {
        de: '',
        en: 'The complete and legally binding withdrawal instructions, together with the model withdrawal form, are available in German here: {link}. The German version is authoritative.',
      },
    ],
    link: { de: '', en: 'Widerrufsbelehrung und Muster-Widerrufsformular' },
    linkLang: 'de',
  },
};
