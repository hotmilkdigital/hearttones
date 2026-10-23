interface ImportMetaEnv {
  /** "true" on production only (CLAUDE.md §9, §10). Unset on staging and locally. */
  readonly PUBLIC_INDEXABLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
