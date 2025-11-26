"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth/useAuth";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/hooks/profile/useProfile";

const formSchema = z.object({
  gender: z.string(),
  phone_number: z.string().min(12, "Phone number must be at least 12 digit."),
  address: z.string(),
});

export default function Profile() {
  const { user } = useAuth();

  const profile = user?.data[0].profile;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: profile?.gender || "",
      phone_number: profile?.phone_number || "",
      address: profile?.address || "",
    },
  });

  const { updateProfile } = useProfile();

  function onSubmit(data: z.infer<typeof formSchema>) {
    updateProfile.mutate(data);
  }

  return (
    <div>
      <div className="bg-white dark:bg-black border rounded max-w-4xl mx-auto grid md:grid-cols-2 p-4 md:p-12 gap-4">
        <div>
          <h1 className="font-semibold">Profile Settings</h1>
          <p className="text-sm dark:text-neutral-400">
            Manage your profile and account settings
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="font-semibold">Profile Information</h1>
            <p className="text-sm dark:text-neutral-400">
              Update your gender, phone number, and address
            </p>
          </div>
          <Separator className="w-full" />
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="gender">Gender</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="phone_number"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="phone_number">
                        Phone Number
                      </FieldLabel>
                      <Input
                        {...field}
                        id="phone_number"
                        aria-invalid={fieldState.invalid}
                        placeholder="081515018890"
                        autoComplete="off"
                        type="text"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="address">Address</FieldLabel>
                      <Textarea
                        {...field}
                        id="address"
                        aria-invalid={fieldState.invalid}
                        placeholder="Address..."
                        className="min-h-[120px]"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Field>
                  <Button
                    type="submit"
                    // disabled={register.isPending}
                    className="hover:cursor-pointer duration-200"
                  >
                    {/* {register.isPending ? "Loading..." : "Register"} */}
                    Update
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
