import { z } from "zod";
export const loginFormSchema = z.object({
  username: z.string().min(8).max(50),
  password: z
		.string()
		.min(8)
		.max(24)
		.regex(/[a-z]+/, 'at least one lowercase letter')
		.regex(/[A-Z]+/, 'at least one uppercase letter')
		.regex(/[^a-zA-Z]+/, 'at least one special character'),

  hostname: z.string().min(2).max(50),
  tenant: z.string().min(2).max(50),
});
export type LoginFormSchema = typeof loginFormSchema;

export const statusMessageSchema = z.object({
	statusMessage: z
		.string()
		.min(4)
		.max(50)
		.regex(/[^<>&]+/, 'No HTML tags allowed')
		.regex(/[^a-zA-Z0-9 ]+/, 'No JavaScript allowed')
});
export type StatusMessageSchema = typeof statusMessageSchema;

export const aboutFormSchema = z.object({
	add: z
		  .string()
		  .min(0)
		  .max(99),
	world: z
		  .string()
		  .min(0)
		  .max(24)
  });
  export type AboutFormSchema = typeof aboutFormSchema;

  export const aboutFormSchema2 = z.object({
	world: z
		  .string()
		  .min(0)
		  .max(24)
		  .default("world")
  });
  export type AboutFormSchema2 = typeof aboutFormSchema2;
