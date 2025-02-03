import { createClient } from "jsr:@supabase/supabase-js@2";
import { Database } from "./database.types.ts";

Deno.serve(async (req) => {
  try {
    const supabase = createClient<Database>(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    const { data, error } = await supabase.from("product").select("*");

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
    // deno-lint-ignore no-explicit-any
  } catch (err: any) {
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
