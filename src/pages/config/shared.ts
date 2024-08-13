export enum ConfigField {
  real_time_buttons = 'real_time_buttons',
  real_time_blocks = 'real_time_blocks',
  real_time_prizes = 'real_time_prizes',
}

export type FieldValue = {
  [ConfigField.real_time_buttons]: string;
  [ConfigField.real_time_blocks]: string;
  [ConfigField.real_time_prizes]: string;
};
