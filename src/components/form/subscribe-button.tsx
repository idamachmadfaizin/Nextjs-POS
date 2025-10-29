import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "@/hooks/form-context";

type Props = { label: string } & React.ComponentProps<typeof Button>;

export default function SubscribeButton({
  label,
  type = "submit",
  ...props
}: Props) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type={type} disabled={isSubmitting} {...props}>
          {isSubmitting && <Spinner />}
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}
