export interface basicTokenProps {
  id: number;
  name: string;
  unit: string;
  logo: string | undefined;
  address: string;
  value: string;
}

export interface SwapInputProps {
  primaryText: string;
  secondaryText: string;
  state: number | string;
  setState: (value: any) => void;
  type?: string;
  token: basicTokenProps | undefined,
  setToken: (value: basicTokenProps) => void;
  disableToken: basicTokenProps | undefined,
}