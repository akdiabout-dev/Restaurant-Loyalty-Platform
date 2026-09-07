# Restaurant Loyalty & POS Integration Platform

A production-oriented backend project for managing a restaurant brand or restaurant chain, including customers, branches, products, orders, loyalty rewards, promotions, POS integrations, automated campaigns, reviews, and reporting.

The project is also designed as a practical backend engineering project for applying real-world concepts such as relational database modeling, transactions, idempotency, authentication, authorization, external API integrations, webhooks, background jobs, and reporting.

---

## Project Overview

The system represents **one restaurant brand**, which may operate one or multiple branches.

Customers are shared across the brand and can place orders at different branches while participating in the same loyalty ecosystem.

The platform will eventually integrate with external POS systems to automatically receive real transaction data.

Example flow:

```text
Customer places an order
        ↓
POS records the transaction
        ↓
POS integration receives/imports the transaction
        ↓
Transaction is normalized
        ↓
Order is stored
        ↓
Loyalty points are awarded
        ↓
Reward threshold is checked
        ↓
Reward or campaign may be triggered
```

---

## Main Features

### Restaurant & Branch Management

* Restaurant brand information
* Multiple restaurant branches
* Branch locations
* Restaurant media
* Staff management
* Branch-specific configuration

### Product Catalog

* Product categories
* Products
* Product media
* Branch-specific pricing
* Branch-specific availability
* Product discounts

### Orders

* Customer orders
* Order items
* Historical product price snapshots
* Discounts
* Taxes
* Tips
* Payments
* Order status lifecycle

### Loyalty Program

Customers earn points from real restaurant transactions.

Example:

```text
1 MAD spent = 1 point
```

The loyalty system includes:

* Loyalty accounts
* Current points balance
* Lifetime points earned
* Lifetime points redeemed
* Loyalty transaction history
* Rewards
* Reward redemption

Example:

```text
Order completed
      ↓
Customer spends 150 MAD
      ↓
+150 loyalty points
      ↓
Check reward threshold
      ↓
Reward generated if eligible
```

### Promotions & Discounts

The system distinguishes between **product discounts** and broader **promotions**.

Product discount example:

```text
Burger
80 MAD
↓
25% discount
↓
60 MAD
```

Promotions can support rules such as:

```text
20% off orders above 300 MAD

10% off desserts

Buy 2 pizzas, get 1 free

Free item with qualifying order
```

Promotions can be:

* Brand-wide
* Branch-specific
* Product-specific
* Category-specific

### Reviews

Customers can review:

* Restaurant branches
* Products

Product reviews can optionally reference an `OrderItem`, allowing the system to identify verified purchases.

### POS Integrations

The platform is designed to integrate with POS providers such as:

* Square
* Toast
* Clover
* Lightspeed
* SpotOn

Each branch may have its own POS integration.

External POS data is normalized before entering the application's core domain.

```text
Square ─────┐
Toast ──────┤
Clover ─────┼──→ POS Adapter ──→ Normalized Transaction
Lightspeed ─┤                         ↓
SpotOn ─────┘                    Order Processing
```

This prevents the core application from depending directly on provider-specific data structures.

### Idempotent Transaction Processing

POS systems may retry webhooks or send the same transaction more than once.

The platform must prevent:

```text
Same POS transaction
      ↓
Order created twice ❌
Points awarded twice ❌
```

External transaction identifiers will therefore be used to provide idempotent processing.

### Automated Campaigns

The campaign system will support:

* Reward notifications
* Welcome campaigns
* Promotions
* Win-back campaigns
* Custom campaigns

Example win-back flow:

```text
Customer last visit
       ↓
60 days inactivity
       ↓
Customer identified as inactive
       ↓
Win-back campaign
       ↓
Email / SMS
```

### Reporting

Planned reporting includes:

* Repeat visit rate
* Customer lifetime value
* Average order value
* Visit frequency
* Customer inactivity
* Churn signals
* Loyalty points issued
* Loyalty points redeemed
* Reward redemption
* Promotion usage

---

## Architecture

The backend follows a **modular monolith architecture**.

The initial system intentionally avoids unnecessary microservices.

```text
                   Client / Dashboard
                          │
                        HTTPS
                          │
                          ▼
                   ┌─────────────┐
                   │ Express API │
                   │ TypeScript  │
                   └──────┬──────┘
                          │
                Business Modules
                          │
                          ▼
                      Prisma ORM
                          │
                          ▼
                     PostgreSQL
```

External systems interact through dedicated integration layers:

```text
POS Providers
     │
     ▼
Integration Layer
     │
     ▼
Domain / Services
     │
     ▼
PostgreSQL
```

---

## Project Structure

```text
restaurant-loyalty/
│
├── prisma/
│   ├── schema.prisma
│   │
│   └── models/
│       ├── core.prisma
│       ├── catalog.prisma
│       ├── reviews.prisma
│       ├── orders.prisma
│       ├── loyalty.prisma
│       ├── promotions.prisma
│       ├── pos.prisma
│       └── campaigns.prisma
│
├── src/
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validate.middleware.ts
│   │
│   ├── modules/
│   │   │
│   │   ├── core/
│   │   │   ├── restaurants/
│   │   │   │   ├── restaurant.controller.ts
│   │   │   │   ├── restaurant.service.ts
│   │   │   │   ├── restaurant.routes.ts
│   │   │   │   ├── restaurant.schema.ts
│   │   │   │   └── restaurant.types.ts
│   │   │   │
│   │   │   ├── branches/
│   │   │   │   ├── branch.controller.ts
│   │   │   │   ├── branch.service.ts
│   │   │   │   ├── branch.routes.ts
│   │   │   │   ├── branch.schema.ts
│   │   │   │   └── branch.types.ts
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── user.routes.ts
│   │   │   │   ├── user.schema.ts
│   │   │   │   └── user.types.ts
│   │   │   │
│   │   │   └── staff/
│   │   │       ├── staff.controller.ts
│   │   │       ├── staff.service.ts
│   │   │       ├── staff.routes.ts
│   │   │       ├── staff.schema.ts
│   │   │       └── staff.types.ts
│   │   │
│   │   ├── catalog/
│   │   │   ├── categories/
│   │   │   ├── products/
│   │   │   ├── product-media/
│   │   │   ├── branch-products/
│   │   │   └── product-discounts/
│   │   │
│   │   ├── reviews/
│   │   │   ├── branch-reviews/
│   │   │   └── product-reviews/
│   │   │
│   │   ├── orders/
│   │   │   ├── order.controller.ts
│   │   │   ├── order.service.ts
│   │   │   ├── order.routes.ts
│   │   │   ├── order.schema.ts
│   │   │   ├── order.types.ts
│   │   │   └── payments/
│   │   │
│   │   ├── loyalty/
│   │   │   ├── accounts/
│   │   │   ├── transactions/
│   │   │   └── rewards/
│   │   │
│   │   ├── promotions/
│   │   │   ├── promotion.controller.ts
│   │   │   ├── promotion.service.ts
│   │   │   ├── promotion.routes.ts
│   │   │   ├── promotion.schema.ts
│   │   │   ├── promotion.types.ts
│   │   │   └── redemptions/
│   │   │
│   │   ├── pos/
│   │   │   ├── pos.controller.ts
│   │   │   ├── pos.service.ts
│   │   │   ├── pos.routes.ts
│   │   │   ├── pos.types.ts
│   │   │   │
│   │   │   ├── adapters/
│   │   │   │   ├── square.adapter.ts
│   │   │   │   ├── toast.adapter.ts
│   │   │   │   ├── clover.adapter.ts
│   │   │   │   ├── lightspeed.adapter.ts
│   │   │   │   └── spoton.adapter.ts
│   │   │   │
│   │   │   └── webhooks/
│   │   │
│   │   └── campaigns/
│   │       ├── campaign.controller.ts
│   │       ├── campaign.service.ts
│   │       ├── campaign.routes.ts
│   │       ├── campaign.schema.ts
│   │       ├── campaign.types.ts
│   │       └── recipients/
│   │
│   ├── shared/
│   │   ├── errors/
│   │   ├── utils/
│   │   └── types/
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Module Responsibilities

### Restaurants

Responsible for:

* Restaurant brand
* Branches
* Restaurant media
* Branch information
* Staff relationships

### Users

Responsible for:

* Customer accounts
* User profiles
* Authentication-related user information
* Staff identities

### Catalog

Responsible for:

* Categories
* Products
* Product media
* Branch-specific product configuration
* Product discounts

### Orders

Responsible for:

* Orders
* Order items
* Pricing snapshots
* Payments
* Order lifecycle

### Loyalty

Responsible for:

* Loyalty accounts
* Loyalty transactions
* Point balances
* Rewards
* Reward redemption

### Promotions

Responsible for:

* Promotions
* Promotion eligibility
* Product/category targeting
* Promotion redemption

### Reviews

Responsible for:

* Branch reviews
* Product reviews
* Verified purchase relationships

### POS

Responsible for:

* POS provider integrations
* Webhooks
* External transaction IDs
* Transaction normalization
* Idempotency
* Synchronization

### Campaigns

Responsible for:

* Email campaigns
* SMS campaigns
* Win-back campaigns
* Reward notifications
* Campaign recipients
* Delivery tracking

---

## Request Architecture

A typical API request follows:

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Prisma / Repository when needed
   ↓
PostgreSQL
```

### Controller

Responsible primarily for HTTP concerns:

```text
request
response
status codes
parameters
```

### Service

Responsible for business logic:

```text
calculate order
apply discount
award loyalty points
validate promotion
issue reward
```

### Repository

Introduced when database access becomes complex enough to justify a dedicated persistence layer.

The project does not create repositories merely for the sake of adding another abstraction.

---

## Core Domain

```text
Restaurant
   │
   ├── Branch
   │     ├── Orders
   │     ├── Reviews
   │     ├── Staff
   │     └── POS Integrations
   │
   ├── Categories
   │      └── Products
   │            ├── Media
   │            ├── Discounts
   │            └── Reviews
   │
   ├── Promotions
   └── Campaigns


User
   │
   ├── Orders
   ├── Reviews
   ├── LoyaltyAccount
   │       └── LoyaltyTransactions
   │
   └── Rewards
```

---

## Important Business Rules

### Pricing

The frontend must never determine the authoritative order price.

The backend calculates pricing using:

```text
Product
   ↓
Branch-specific price
   ↓
Active product discount
   ↓
Applicable promotion
   ↓
Tax
   ↓
Final order amount
```

Historical prices are stored in `OrderItem`.

Example:

```text
Product current price:     80 MAD
Discount:                  20 MAD
Final unit price:          60 MAD
Quantity:                   2

OrderItem:
originalUnitPrice = 80
discountAmount    = 20
unitPrice         = 60
```

Changing the product price later must not modify historical orders.

### Loyalty

Loyalty balances belong to the customer across the restaurant brand.

Transactions provide an audit trail:

```text
Order       +150
Order       +200
Bonus        +50
Reward      -300
----------------
Balance      100
```

The current balance alone is not sufficient to represent loyalty history.

### Database Transactions

Operations that must succeed or fail together will use database transactions.

For example:

```text
Create order
     +
Create order items
     +
Award loyalty points
     +
Create loyalty transaction
```

should not leave partially persisted state.

Prisma transactions will be used where atomicity is required.

---

## Technology Stack

### Backend

* Node.js
* TypeScript
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Validation

A schema validation library will be used for API input validation.

### Future Infrastructure

As requirements grow, the project may introduce:

* Redis
* Background job queues
* Scheduled jobs
* Email provider integration
* SMS provider integration
* Docker
* Automated testing
* CI/CD
* API documentation
* Logging and monitoring

Infrastructure will be introduced when the business requirement justifies it rather than adding unnecessary complexity from the beginning.

---

## Development Roadmap

### Phase 1 — Foundation

* [ ] Initialize TypeScript/Express project
* [ ] Configure environment variables
* [ ] Configure PostgreSQL
* [ ] Configure Prisma
* [ ] Implement modular project structure
* [ ] Implement centralized error handling
* [ ] Implement validation

### Phase 2 — Core Domain

* [ ] Restaurant
* [ ] Branch
* [ ] User
* [ ] Staff

### Phase 3 — Catalog

* [ ] Categories
* [ ] Products
* [ ] Product media
* [ ] Branch-specific products
* [ ] Product discounts

### Phase 4 — Orders

* [ ] Create orders
* [ ] Order items
* [ ] Backend price calculation
* [ ] Payments
* [ ] Order lifecycle
* [ ] Database transactions

### Phase 5 — Authentication & Security

* [ ] Registration
* [ ] Login
* [ ] Authentication
* [ ] Authorization
* [ ] Role-based permissions
* [ ] Input validation
* [ ] Rate limiting
* [ ] Security hardening

### Phase 6 — Loyalty

* [ ] Loyalty accounts
* [ ] Loyalty transactions
* [ ] Point calculation
* [ ] Rewards
* [ ] Reward thresholds
* [ ] Redemption

### Phase 7 — Promotions

* [ ] Product discounts
* [ ] Order promotions
* [ ] Product-targeted promotions
* [ ] Category-targeted promotions
* [ ] Usage limits
* [ ] Promotion redemption

### Phase 8 — POS Integration

* [ ] POS adapter architecture
* [ ] External transaction normalization
* [ ] Webhooks
* [ ] Webhook verification
* [ ] Idempotency
* [ ] Transaction synchronization
* [ ] Square integration
* [ ] Additional POS providers

### Phase 9 — Automation

* [ ] Background jobs
* [ ] Scheduled jobs
* [ ] Inactive customer detection
* [ ] 60-day win-back logic
* [ ] Email campaigns
* [ ] SMS campaigns

### Phase 10 — Reporting

* [ ] Customer lifetime value
* [ ] Repeat visit rate
* [ ] Average order value
* [ ] Visit frequency
* [ ] Churn signals
* [ ] Promotion performance
* [ ] Loyalty reporting

### Phase 11 — Production Readiness

* [ ] Unit tests
* [ ] Integration tests
* [ ] API documentation
* [ ] Docker
* [ ] Logging
* [ ] Monitoring
* [ ] CI/CD
* [ ] Deployment

---

## Main Engineering Goals

This project is intended to practice production-oriented backend engineering, including:

* Relational data modeling
* PostgreSQL
* Prisma
* TypeScript
* REST API design
* Modular architecture
* Authentication
* Authorization
* Validation
* Transactions
* Race condition prevention
* Idempotency
* Webhooks
* External APIs
* Background processing
* Scheduled jobs
* Security
* Testing
* Reporting
* Deployment

---

## Status

🚧 **Currently under development**

Current stage:

```text
Architecture
    ✓
System design
    ✓
Domain modeling
    ✓
UML
    ✓
Database modeling
    ← NEXT
```

The next milestone is translating the finalized domain model into a relational PostgreSQL/Prisma schema.
