import { AppHeader } from "@/components/app-header";
import { FormContent } from "./components/form-content";

export default async function Page() {
  return (
    <div className="dashboard-main">
      <AppHeader heading="Create Tag" />

      <FormContent />
    </div>
  );
}
