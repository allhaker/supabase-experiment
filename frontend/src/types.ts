import { Database } from "./database.types";

export type DbTables = Database["public"]["Tables"];
export type Company = DbTables["company"]["Row"];
export type Goal = DbTables["goal"]["Row"];
export type Category = DbTables["category"]["Row"];
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
};

export type ParsedGoalAlignment = {
    company: Company;
    goalAlignment: Record<number, GoalAlignment>;
    companyID: number;
    createdAt: string;
    id: number;
};
