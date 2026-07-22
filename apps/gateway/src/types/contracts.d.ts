declare module '@control-panel-erp/contracts' {
  export const DOMAINS: readonly string[];
  export const ENTITIES: readonly string[];
  export const VERBS: readonly string[];
  export const RESULT_STATES: readonly string[];
  export const ERROR_CLASSES: readonly string[];
  export const APPROVAL_LEVELS: readonly string[];
  export const KNOWN_INTENT_CODES: readonly string[];
  export function intentCode(
    domain: string,
    entity: string,
    verb: string,
  ): string;
  export function isKnownIntentCode(code: string): boolean;
  export function loadContract(nameOrIntent: string): unknown;
}
