// Central list of all actions that can be authorized.

import { StaffRole } from "../../generated/prisma/enums.js";

// All staff-protected actions that exist in the application.
// `as const` keeps the exact string values.
export const PERMISSIONS = {
  // Restaurant
  RESTAURANT_READ: "restaurant:read",
  RESTAURANT_UPDATE: "restaurant:update",

  // Branch
  BRANCH_READ: "branch:read",
  BRANCH_CREATE: "branch:create",
  BRANCH_UPDATE: "branch:update",
  BRANCH_DELETE: "branch:delete",

  // Staff
  STAFF_READ: "staff:read",
  STAFF_CREATE: "staff:create",
  STAFF_UPDATE: "staff:update",
  STAFF_DELETE: "staff:delete",

  // Categories
  CATEGORY_CREATE: "category:create",
  CATEGORY_UPDATE: "category:update",
  CATEGORY_DELETE: "category:delete",

  // Products
  PRODUCT_CREATE: "product:create",
  PRODUCT_UPDATE: "product:update",
  PRODUCT_DELETE: "product:delete",

  // Product availability / branch products
  BRANCH_PRODUCT_READ: "branch-product:read",
  BRANCH_PRODUCT_UPDATE: "branch-product:update",

  // Product media
  PRODUCT_MEDIA_CREATE: "product-media:create",
  PRODUCT_MEDIA_DELETE: "product-media:delete",

  // Discounts
  DISCOUNT_CREATE: "discount:create",
  DISCOUNT_UPDATE: "discount:update",
  DISCOUNT_DELETE: "discount:delete",

  // Orders
  ORDER_READ: "order:read",
  ORDER_CREATE: "order:create",
  ORDER_UPDATE: "order:update",
  ORDER_CANCEL: "order:cancel",

  // Payments
  PAYMENT_READ: "payment:read",
  PAYMENT_CREATE: "payment:create",
  PAYMENT_REFUND: "payment:refund",

  // Promotions
  PROMOTION_READ: "promotion:read",
  PROMOTION_CREATE: "promotion:create",
  PROMOTION_UPDATE: "promotion:update",
  PROMOTION_DELETE: "promotion:delete",

  // Loyalty
  LOYALTY_READ: "loyalty:read",
  LOYALTY_ADJUST: "loyalty:adjust",

  // Rewards
  REWARD_READ: "reward:read",
  REWARD_CREATE: "reward:create",
  REWARD_UPDATE: "reward:update",
  REWARD_DELETE: "reward:delete",

  // Campaigns
  CAMPAIGN_READ: "campaign:read",
  CAMPAIGN_CREATE: "campaign:create",
  CAMPAIGN_UPDATE: "campaign:update",
  CAMPAIGN_DELETE: "campaign:delete",
  CAMPAIGN_SEND: "campaign:send",

  // Reviews
  REVIEW_READ: "review:read",
  REVIEW_MODERATE: "review:moderate",

  // POS integration
  POS_READ: "pos:read",
  POS_MANAGE: "pos:manage",

  // Reporting
  REPORT_READ: "report:read",
} as const;


// Creates:
// "restaurant:read"
// | "restaurant:update"
// | "branch:create"
// | ...
//
// This makes functions such as authorize(permission: Permission)
// accept only real permissions.
export type Permission =
  typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Maps every StaffRole to the actions that role is allowed to perform.
// Record requires every StaffRole to exist.
// readonly Permission[] ensures each list contains only valid permissions
// and should not be modified through this type.
export const ROLE_PERMISSIONS = {
  [StaffRole.OWNER]: [
    // Restaurant
    PERMISSIONS.RESTAURANT_READ,
    PERMISSIONS.RESTAURANT_UPDATE,

    // Branches
    PERMISSIONS.BRANCH_READ,
    PERMISSIONS.BRANCH_CREATE,
    PERMISSIONS.BRANCH_UPDATE,
    PERMISSIONS.BRANCH_DELETE,

    // Staff
    PERMISSIONS.STAFF_READ,
    PERMISSIONS.STAFF_CREATE,
    PERMISSIONS.STAFF_UPDATE,
    PERMISSIONS.STAFF_DELETE,

    // Categories
    PERMISSIONS.CATEGORY_CREATE,
    PERMISSIONS.CATEGORY_UPDATE,
    PERMISSIONS.CATEGORY_DELETE,

    // Products
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_DELETE,

    PERMISSIONS.BRANCH_PRODUCT_READ,
    PERMISSIONS.BRANCH_PRODUCT_UPDATE,

    // Media
    PERMISSIONS.PRODUCT_MEDIA_CREATE,
    PERMISSIONS.PRODUCT_MEDIA_DELETE,

    // Discounts
    PERMISSIONS.DISCOUNT_CREATE,
    PERMISSIONS.DISCOUNT_UPDATE,
    PERMISSIONS.DISCOUNT_DELETE,

    // Orders
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.ORDER_CANCEL,

    // Payments
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_CREATE,
    PERMISSIONS.PAYMENT_REFUND,

    // Promotions
    PERMISSIONS.PROMOTION_READ,
    PERMISSIONS.PROMOTION_CREATE,
    PERMISSIONS.PROMOTION_UPDATE,
    PERMISSIONS.PROMOTION_DELETE,

    // Loyalty
    PERMISSIONS.LOYALTY_READ,
    PERMISSIONS.LOYALTY_ADJUST,

    // Rewards
    PERMISSIONS.REWARD_READ,
    PERMISSIONS.REWARD_CREATE,
    PERMISSIONS.REWARD_UPDATE,
    PERMISSIONS.REWARD_DELETE,

    // Campaigns
    PERMISSIONS.CAMPAIGN_READ,
    PERMISSIONS.CAMPAIGN_CREATE,
    PERMISSIONS.CAMPAIGN_UPDATE,
    PERMISSIONS.CAMPAIGN_DELETE,
    PERMISSIONS.CAMPAIGN_SEND,

    // Reviews
    PERMISSIONS.REVIEW_READ,
    PERMISSIONS.REVIEW_MODERATE,

    // POS
    PERMISSIONS.POS_READ,
    PERMISSIONS.POS_MANAGE,

    // Analytics
    PERMISSIONS.REPORT_READ,
  ],

  [StaffRole.MANAGER]: [
    PERMISSIONS.RESTAURANT_READ,

    PERMISSIONS.BRANCH_READ,
    PERMISSIONS.BRANCH_UPDATE,

    PERMISSIONS.STAFF_READ,

    PERMISSIONS.CATEGORY_CREATE,
    PERMISSIONS.CATEGORY_UPDATE,
    PERMISSIONS.CATEGORY_DELETE,

    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_DELETE,

    PERMISSIONS.BRANCH_PRODUCT_READ,
    PERMISSIONS.BRANCH_PRODUCT_UPDATE,

    PERMISSIONS.PRODUCT_MEDIA_CREATE,
    PERMISSIONS.PRODUCT_MEDIA_DELETE,

    PERMISSIONS.DISCOUNT_CREATE,
    PERMISSIONS.DISCOUNT_UPDATE,
    PERMISSIONS.DISCOUNT_DELETE,

    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.ORDER_CANCEL,

    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_REFUND,

    PERMISSIONS.PROMOTION_READ,
    PERMISSIONS.PROMOTION_CREATE,
    PERMISSIONS.PROMOTION_UPDATE,
    PERMISSIONS.PROMOTION_DELETE,

    PERMISSIONS.LOYALTY_READ,
    PERMISSIONS.LOYALTY_ADJUST,

    PERMISSIONS.REWARD_READ,
    PERMISSIONS.REWARD_CREATE,
    PERMISSIONS.REWARD_UPDATE,

    PERMISSIONS.CAMPAIGN_READ,
    PERMISSIONS.CAMPAIGN_CREATE,
    PERMISSIONS.CAMPAIGN_UPDATE,
    PERMISSIONS.CAMPAIGN_SEND,

    PERMISSIONS.REVIEW_READ,
    PERMISSIONS.REVIEW_MODERATE,

    PERMISSIONS.POS_READ,

    PERMISSIONS.REPORT_READ,
  ],

  [StaffRole.CASHIER]: [
    PERMISSIONS.BRANCH_READ,

    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_UPDATE,

    PERMISSIONS.BRANCH_PRODUCT_READ,
    PERMISSIONS.BRANCH_PRODUCT_UPDATE,

    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.ORDER_CANCEL,

    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_CREATE,

    PERMISSIONS.PROMOTION_READ,

    PERMISSIONS.LOYALTY_READ,

    PERMISSIONS.REWARD_READ,
  ],

  [StaffRole.WAITER]: [
    PERMISSIONS.BRANCH_READ,

    PERMISSIONS.BRANCH_PRODUCT_READ,

    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_UPDATE,

    PERMISSIONS.PROMOTION_READ,

    PERMISSIONS.REWARD_READ,
  ],
  [StaffRole.KITCHEN]: [
  PERMISSIONS.BRANCH_READ,
  PERMISSIONS.BRANCH_PRODUCT_READ,
  PERMISSIONS.ORDER_READ,
  PERMISSIONS.ORDER_UPDATE,
],
} satisfies Record<
  StaffRole,
  readonly Permission[]
>;


//The value passed into the permission parameter 
// must be one of the values allowed by the Permission type.
//ex type Permission =
  //"product:create" |
   //"product:update" | , | === or
   //"order:read";
/*
                 TYPE RULE
                 ↓
           ┌─────────────┐
           │ Permission  │
           │             │
           │ allows:     │
           │ product:    │
           │ create      │
           │ update      │
           └──────┬──────┘
                  │
                  │ must satisfy
                  ↓
const permission: Permission
      ↓
   variable
      ↓
"product:create"
      ↓
 actual value
 */