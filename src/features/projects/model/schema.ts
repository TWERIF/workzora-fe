import { z } from "zod";

export const schema = z.object({
    title: z.string().min(3, "createProject.validation.min_3_chars"),
    description: z.string().min(20, "createProject.validation.desc_too_short"),
    price: z.coerce.number().min(1, "createProject.validation.specify_budget").max(20000, "createProject.validation.max_budget"),
    categories: z
        .array(z.string())
        .min(1, "createProject.validation.select_at_least_one_category")
        .max(3, "createProject.validation.max_3_categories"),
});

export type FormValues = z.infer<typeof schema>;