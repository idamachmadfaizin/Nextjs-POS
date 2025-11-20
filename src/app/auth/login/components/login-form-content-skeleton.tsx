import { Skeleton } from "@/components/ui/skeleton";

export function LoginFormContentSkeleton() {
  return (
    <div className="space-y-6">
      {/* Social buttons */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Separator */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-px w-full" />
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" /> {/* Label */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
      </div>

      {/* Password field + link */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" /> {/* Label */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
        <div className="flex justify-end">
          <Skeleton className="h-3 w-32" /> {/* Forgot password link */}
        </div>
      </div>

      {/* Error + button */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full rounded" /> {/* Error placeholder */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Submit button */}
      </div>

      {/* Description */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-56" /> {/* Sign-up text */}
      </div>
    </div>
  );
}
