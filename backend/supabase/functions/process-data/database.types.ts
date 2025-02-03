export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            category: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
            company: {
                Row: {
                    company: string;
                    created_at: string;
                    id: number;
                };
                Insert: {
                    company?: string;
                    created_at?: string;
                    id?: number;
                };
                Update: {
                    company?: string;
                    created_at?: string;
                    id?: number;
                };
                Relationships: [];
            };
            goal: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
            product: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                    parent_id: number | null;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                    parent_id?: number | null;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                    parent_id?: number | null;
                };
                Relationships: [];
            };
            product_to_goal_and_category: {
                Row: {
                    category_id: number;
                    created_at: string;
                    goal_id: number;
                    id: number;
                    product_id: number;
                };
                Insert: {
                    category_id: number;
                    created_at?: string;
                    goal_id: number;
                    id?: number;
                    product_id: number;
                };
                Update: {
                    category_id?: number;
                    created_at?: string;
                    goal_id?: number;
                    id?: number;
                    product_id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName:
                            "product_to_goal_and_category_category_id_fkey";
                        columns: ["category_id"];
                        isOneToOne: false;
                        referencedRelation: "category";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName:
                            "product_to_goal_and_category_goal_id_fkey";
                        columns: ["goal_id"];
                        isOneToOne: false;
                        referencedRelation: "goal";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName:
                            "product_to_goal_and_category_product_id_fkey";
                        columns: ["product_id"];
                        isOneToOne: false;
                        referencedRelation: "product";
                        referencedColumns: ["id"];
                    },
                ];
            };
            revenue_share: {
                Row: {
                    company_id: number;
                    created_at: string;
                    id: number;
                    revenue_share: number;
                };
                Insert: {
                    company_id: number;
                    created_at?: string;
                    id?: number;
                    revenue_share: number;
                };
                Update: {
                    company_id?: number;
                    created_at?: string;
                    id?: number;
                    revenue_share?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "revenue_share_company_id_fkey";
                        columns: ["company_id"];
                        isOneToOne: false;
                        referencedRelation: "company";
                        referencedColumns: ["id"];
                    },
                ];
            };
            revenue_share_to_product: {
                Row: {
                    created_at: string;
                    id: number;
                    product_id: number;
                    revenue_share_id: number;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    product_id: number;
                    revenue_share_id: number;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    product_id?: number;
                    revenue_share_id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName:
                            "revenue_share_to_product_product_id_fkey";
                        columns: ["product_id"];
                        isOneToOne: false;
                        referencedRelation: "product";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName:
                            "revenue_share_to_product_revenue_share_id_fkey";
                        columns: ["revenue_share_id"];
                        isOneToOne: false;
                        referencedRelation: "revenue_share";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends
        { schema: keyof Database } ? keyof (
            & Database[PublicTableNameOrOptions["schema"]]["Tables"]
            & Database[PublicTableNameOrOptions["schema"]]["Views"]
        )
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database } ? (
        & Database[PublicTableNameOrOptions["schema"]]["Tables"]
        & Database[PublicTableNameOrOptions["schema"]]["Views"]
    )[TableName] extends {
        Row: infer R;
    } ? R
    : never
    : PublicTableNameOrOptions extends keyof (
        & PublicSchema["Tables"]
        & PublicSchema["Views"]
    ) ? (
            & PublicSchema["Tables"]
            & PublicSchema["Views"]
        )[PublicTableNameOrOptions] extends {
            Row: infer R;
        } ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends
        { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends
        {
            Insert: infer I;
        } ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I;
        } ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends
        { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends
        {
            Update: infer U;
        } ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U;
        } ? U
        : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
        ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof PublicSchema["CompositeTypes"]
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]][
            "CompositeTypes"
        ]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][
        CompositeTypeName
    ]
    : PublicCompositeTypeNameOrOptions extends
        keyof PublicSchema["CompositeTypes"]
        ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
