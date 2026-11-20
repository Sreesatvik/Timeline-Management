import { ZodError } from "zod";

export const validate=(schema) =>async(req, res, next)=> {
    try {
        const parsebody = await schema.parseAsync(req.body);
        req.body = parsebody;
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            const errors = err.errors.map((e) => e.message);
            return res.status(400).json({
                message: errors[0] || "Validation failed",
                errors,
            });
        }

        res.status(400).json({ message: err.message || "Invalid input data" });
    }
}

