import isIBAN from "validator/lib/isIBAN";
import * as Yup from "yup";

export const createWithdrawSchema = (balance) =>
  Yup.object({
    iban: Yup.string()
  .required("აუცილებელი ველი")
  .test("is-iban", "არასწორი IBAN", (value) =>
    value ? isIBAN(value.replace(/\s+/g, "")) : false,
  )
  .test("is-georgian-bank", "მხოლოდ BOG, TBC ან Liberty ბანკი", (value) => {
    if (!value) return false;
    const clean = value.replace(/\s+/g, "").toUpperCase();
    return clean.includes("BG") || clean.includes("TB") || clean.includes("LB");
  }),
    fullName: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^\S+\s+\S+/, "გთხოვთ შეიყვანოთ სახელი და გვარი"),
    amount: Yup.number()
      .nullable()
      .transform((value, original) => (original === "" ? null : value))
      .typeError("მხოლოდ რიცხვი")
      .positive("თანხა უნდა იყოს დადებითი")
      .required("აუცილებელი ველი")
      .min(1)
      .max(1500, "მაქსიმუმ 1500₾")
      .test("max-balance", "არასაკმარისი ბალანსი", (value) =>
        value ? value <= balance : true,
      ),
    accountName: Yup.string().when("isSaving", {
      is: true,
      then: (schema) => schema.required("სახელი აუცილებელია"),
    }),
  });
