/**
 * EN legal pages (decision 25.10.2026, docs/i18n-inventory.md §6 no. 3): short English pages that
 * point to the German versions, which are binding. The German pages carry the full legal text
 * (ImprintView, PrivacyView, WithdrawalView), so `de` stays empty here – EN only.
 * {link} in `text` is not used; the link sits in its own paragraph (`link`).
 */
import type { Localized } from '../i18n/localized.ts';

export type LegalKey = 'imprint' | 'privacy' | 'withdrawal';

export const legalPointers: Record<LegalKey, { text: Localized; link: Localized }> = {
  imprint: { text: { de: '', en: null }, link: { de: '', en: null } },
  privacy: { text: { de: '', en: null }, link: { de: '', en: null } },
  withdrawal: { text: { de: '', en: null }, link: { de: '', en: null } },
};
