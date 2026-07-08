
import Counter from "../models/auth.counter.js";

export async function authNextId(name: string): Promise<number> {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { value: 1 } },
    { returnDocument: 'after', upsert: true }
  );

  return counter.value;
}