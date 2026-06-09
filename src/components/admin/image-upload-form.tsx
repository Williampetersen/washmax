"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ImageUploadForm({ action }: { action: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setDone(false);

    const body = new FormData();
    body.append("image", file);

    try {
      const response = await fetch(action, { method: "POST", body });
      const payload = await response.json().catch(() => ({})) as { success?: boolean; message?: string };
      if (!response.ok || payload.success === false) {
        setError(payload.message || "Upload failed.");
      } else {
        setDone(true);
        if (inputRef.current) inputRef.current.value = "";
        router.refresh();
      }
    } catch {
      setError("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-2 lg:w-44">
      <Input
        ref={inputRef}
        type="file"
        name="image"
        accept="image/png,image/jpeg,image/webp"
        disabled={uploading}
      />
      <Button type="submit" variant="outline" className="h-10" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload image"}
      </Button>
      {error ? (
        <p className="text-xs font-medium text-red-600">{error}</p>
      ) : done ? (
        <p className="text-xs font-medium text-green-700">Image saved.</p>
      ) : null}
    </form>
  );
}
