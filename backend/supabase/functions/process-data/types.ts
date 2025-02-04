import SupabaseClient from "https://jsr.io/@supabase/supabase-js/2.48.1/src/SupabaseClient.ts";
import { Database } from "./database.types.ts";

export type SupabaseClientDb = SupabaseClient<Database>;

export type ProductWithRevenueShare = {
  product_id: number;
  revenue_share: number;
};

export type Category = { id: number; name: string; value: number };

export type Company = { id: number; name: string };

export type GoalCategoryData = {
  product_id: number;
  goal: { id: number; name: string };
  category: Category;
};

export type GroupedByGoal = Record<
  number,
  {
    goal: string;
    products: {
      product_id: number;
      revenue_share: number;
      category: Category;
    }[];
  }
>;

export type GoalAlignment = {
  totalAlignment: number;
  goal: {
    goal: string;
    products: {
      product_id: number;
      revenue_share: number;
      category: Category;
    }[];
  };
  company: Company;
};
