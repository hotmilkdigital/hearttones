/**
 * EN legal pages (decision 25.10.2026, docs/i18n-inventory.md §6 no. 3): short English pages that
 * point to the German versions, which are binding. The German pages carry the full legal text
 * (ImprintView, PrivacyView, WithdrawalView), so `de` stays empty here – EN only.
 * {link} in `text` is not used; the link sits in its own paragraph (`link`).
 */
import type { Localized } from '../i18n/localized.ts';

export type LegalKey = 'imprint' | 'privacy' | 'withdrawal';

export const legalPointers: Record<LegalKey, { text: Localized; link: Localized }> = {
  imprint: {
    text: { de: '', en: 'This website is run by Philipp von Rothkirch, Berlin, Germany. The legal notice (Impressum) required by German law is available in German only.' },
    link: { de: '', en: 'Read the legal notice in German →' },
  },
  privacy: {
    text: { de: '', en: 'We take your privacy seriously. This site uses no cookies, no analytics and no tracking; videos from YouTube only load after you click “Load video”. The full privacy policy is available in German, which is the binding version.' },
    link: { de: '', en: 'Read the privacy policy in German →' },
  },
  withdrawal: {
    text: { de: '', en: 'If you order the Vol. 2 CD as a consumer, you have a statutory right of withdrawal. The withdrawal information and the model withdrawal form are available in German, which is the binding version.' },
    link: { de: '', en: 'Read the right of withdrawal in German →' },
  },
};
