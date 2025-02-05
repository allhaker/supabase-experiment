import { createClient } from "jsr:@supabase/supabase-js@2";
import { Database } from "./database.types.ts";
import {
  Company,
  GoalAlignment,
  GoalAlignmentByCompany,
  GoalCategoryData,
  GroupedByGoal,
  ProductWithRevenueShare,
  SupabaseClientDb,
} from "./types.ts";

const getCompanies = async (supabase: SupabaseClientDb) => {
  const { data, error } = await supabase
    .from("company")
    .select("*");

  if (error) {
    throw error;
  }
  if (data?.length === 0) throw new Error("No companies");

  return data;
};

const getProductsWithRevenueShare = async (
  supabase: SupabaseClientDb,
  companyId: number,
) => {
  const { data, error } = await supabase
    .from("revenue_share")
    .select(`product_id, revenue_share`)
    .eq("company_id", companyId);

  if (error) {
    throw error;
  }
  if (data?.length === 0) throw new Error("No target products");

  return data;
};

const getGoalsByProduct = async (
  supabase: SupabaseClientDb,
  productIds: number[],
) => {
  const { data, error } = await supabase
    .from("product_to_goal_and_category")
    .select(`
      product_id,
      goal(id, name),
      category(id, name, value)
    `)
    .in("product_id", productIds);

  if (error) {
    throw error;
  }

  return data;
};

const groupByGoalWithRevenueShare = (
  targetGoalsByProduct: GoalCategoryData[],
  productsWithRevenueShare: ProductWithRevenueShare[],
) => {
  return targetGoalsByProduct.reduce((acc, item) => {
    const { goal, product_id } = item;
    const revenueShare = productsWithRevenueShare.find((product) =>
      product.product_id === product_id
    );
    if (revenueShare === undefined) throw new Error("No revenue share");

    if (!acc[goal.id]) {
      acc[goal.id] = {
        goal: goal.name,
        products: [],
      };
    }

    acc[goal.id].products.push({
      product_id,
      revenue_share: revenueShare.revenue_share,
      category: item.category,
    });

    return acc;
  }, {} as GroupedByGoal);
};

const calculateGoalAlignment = (
  groupedByGoal: GroupedByGoal,
) => {
  const goalAlignment: Record<number, GoalAlignment> = {};

  for (const goalId in groupedByGoal) {
    const goalData = groupedByGoal[goalId];
    let totalAlignment = 0;

    goalData.products.forEach((product) => {
      const { revenue_share, category } = product;
      const alignment = (revenue_share * category.value) / 100;
      totalAlignment += alignment;
    });

    goalAlignment[goalId] = { totalAlignment, goal: goalData };
  }

  return goalAlignment;
};

const getSdgAlignmentByCompany = async (
  supabase: SupabaseClientDb,
  companyIds: number[],
  companies: Company[],
): Promise<GoalAlignmentByCompany> => {
  const alignmentsByCompany = companyIds.map(async (id) => {
    const productsWithRevenueShare = await getProductsWithRevenueShare(
      supabase,
      id,
    );
    const targetProductIds = productsWithRevenueShare.map(({ product_id }) =>
      product_id
    );

    const targetGoalsByProduct = await getGoalsByProduct(
      supabase,
      targetProductIds,
    );

    const groupedByGoal = groupByGoalWithRevenueShare(
      targetGoalsByProduct,
      productsWithRevenueShare,
    );

    const company = companies.find((company) => company.id === id) as Company;
    const goalAlignment = calculateGoalAlignment(groupedByGoal);

    return { goalAlignment, company };
  });

  const results = await Promise.all(alignmentsByCompany);

  return results;
};

const saveAlignment = async (
  supabase: SupabaseClientDb,
  sdgAlignmentByCompany: GoalAlignmentByCompany,
) => {
  const mappedAlignment = sdgAlignmentByCompany.map((
    { goalAlignment: goal_alignment, company },
  ) => ({
    goal_alignment,
    company,
    company_id: company.id,
  }));

  console.log("mappedAlignment", mappedAlignment);

  const { error } = await supabase
    .from("goal_alignment")
    .upsert(mappedAlignment);

  if (error) {
    throw error;
  }
};

Deno.serve(async (req) => {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Content-Type", "application/json");
  headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

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

    const companies = await getCompanies(supabase);
    const sdgAlignmentByCompany = await getSdgAlignmentByCompany(
      supabase,
      companies.map(({ id }) => id),
      companies,
    );

    saveAlignment(supabase, sdgAlignmentByCompany);

    return new Response(JSON.stringify("Alignment is calculated and saved"), {
      headers,
      status: 200,
    });
    // deno-lint-ignore no-explicit-any
  } catch (err: any) {
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
