export type AuthFunction = () => boolean;

export interface AuthorizedMetadataArgs {
  target: Function;
  method?: string;
  value: string|string[]|AuthFunction;
  options?: any;
}
