import { IBaseOption } from "@/interfaces/base.interface";
import { Picker } from "@react-native-picker/picker";
import { ComponentProps } from "react";

export interface BaseSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  items?: IBaseOption[];
  placeholder?: string;
  style?: ComponentProps<typeof Picker>["style"];
}

export default function BaseSelect({
  value,
  onValueChange,
  items,
  placeholder,
  style,
}: BaseSelectProps) {
  return (
    <Picker
      onValueChange={onValueChange}
      selectedValue={value}
      style={[{ width: "100%" }, style]}
    >
      <Picker.Item label={placeholder} value="" color="gray" />
      {(items || []).map((item) => (
        <Picker.Item
          key={item.value}
          label={item.label}
          value={item.value}
          style={{ fontSize: 14 }}
        />
      ))}
    </Picker>
  );
}
