import { useFieldContext } from "@/hooks/form-context";
import { BaseField } from "./base-field";

type Props = Omit<React.ComponentProps<typeof BaseField>, "field" | "type">;

export default function EmailField({ label, ...props }: Props) {
  const field = useFieldContext<string>();

  return <BaseField {...props} label={label} field={field} type="email" />;
}
