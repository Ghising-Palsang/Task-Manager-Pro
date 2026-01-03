import { Select } from "antd";
import type { HTMLInputTypeAttribute } from "react";
import { Controller } from "react-hook-form";
import UserRoles from "../config/constant";
import Password from "antd/es/input/Password";

export interface IBasicInputProps {
  name: string;
  error?: null | string | undefined;
  //eslint-disable-next-line
  control: any;
  rules?: object;
  type?: HTMLInputTypeAttribute;
}

export const FormInput = ({
  name,
  control,
  error,
  rules,
  type = "text",
}: Readonly<IBasicInputProps>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          return (
            <>
              <input
                {...field}
                type={type}
                placeholder=""
                className={` ${fieldState.error ? "border p-4 rounded-xl border-red-600" : "border p-4 rounded-xl"}`}
              />
              <p className={`text-sm absolute -bottom-6 text-red-600 `}>
                {error ?? ""}
              </p>
            </>
          );
        }}
      />
    </>
  );
};

export const PasswordInput = ({ control, name, error, rules }:Readonly<IBasicInputProps>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <>
              <Password {...field} className="h-14 " size="large" style={{borderColor:"black"}}/>
              <p className={`text-sm absolute -bottom-6 text-red-600 `}>
                {error ?? null}
              </p>
            </>
          );
        }}
      />
    </>
  );
};

export const ConfirmPasswordInput = ({
  control,
  name,
  error,
  rules,
}: Readonly<IBasicInputProps>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <>
              <Password
                {...field}
                className="h-14 "
                size="large"
                style={{ borderColor: "black" }}
              />
              <p className={`text-sm absolute -bottom-6 text-red-600 `}>
                {error ?? null}
              </p>
            </>
          );
        }}
      />
    </>
  );
};

export const SelectInput = ({
  control,
  name,
  error,
  rules,
}: Readonly<IBasicInputProps>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => {
          return (
            <>
              <div>
                <Select
                  {...field}
                  defaultValue={UserRoles.ADMIN}
                  className="w-full h-14 rounded-3xl border-2"
                  style={{ borderColor: "#495057" }}
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" },
                  ]}
                />
              </div>
              <p className={`text-sm absolute -bottom-6 text-red-600 `}>
                {error ?? null}
              </p>
            </>
          );
        }}
      />
    </>
  );
};
