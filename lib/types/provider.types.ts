export type DependencySettingWithHelpButton = IProviderEntityDepSettings & {
  helpButton?: () => React.ReactNode;
};

export interface IProviderEntityDepSettings {
  id: string;
  propKey: string;
  label: string;
  type: string;
  placeholder?: string;
  required: boolean;
  pattern?: string;
  errorText?: string;
  disabled: boolean;
  isChecked?: boolean;
  defaultValue?: string;
  tip?: string;
}
export interface IProviderEntityDependency {
  provider: string;
  entity: string;
  title: string;
  depSettingsId: string;
}

export interface IProviderEntity {
  title: string;
  id: string;
  description: string;
  dependsOn: IProviderEntityDependency[];
  depSettings: IProviderEntityDepSettings[];
  multi: boolean;
}

export interface IProvider {
  _id: string;
  title: string;
  description: string;
  key: string;
  entities: IProviderEntity[];
}

export interface IProviderWithStatus extends IProvider {
  isBlocked: boolean;
}
