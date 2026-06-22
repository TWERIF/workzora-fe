import { z } from "zod";

export const getBidSchema = (minPrice: number) => z.object({
    price: z.coerce
        .number()
        .min(minPrice, "bidForm.validation.price_too_low")
        .max(20000, "bidForm.validation.max_budget"),
    time: z.coerce
        .number()
        .min(1, "bidForm.validation.min_time"),
    description: z
        .string()
        .min(20, "bidForm.validation.desc_too_short"),
});

export type BidFormValues = z.infer<ReturnType<typeof getBidSchema>>;