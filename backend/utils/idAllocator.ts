
import Counter from "../models/counter.model.js";

export async function nextId(name: string): Promise<number> {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { value: 1 } },
    { returnDocument: 'after', upsert: true }
  );

  return counter.value;
}