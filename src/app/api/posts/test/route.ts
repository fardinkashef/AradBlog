import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidatePath("/admin/posts");
  //   ! Attention: Returning this is necessary, otherwise revalidatePath doesn't work. We need to return something in route handlers.
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
