# 🍕 PizzaHub — Pizza Ordering & Delivery Platform

PizzaHub is a full-stack pizza ordering and delivery platform where customers can explore pizza items, place orders, and track their order status. Vendors can manage their restaurants, menu items, and customer orders. Admins can manage users, review menu submissions, and monitor platform transactions.

The platform provides role-based dashboards, secure authentication, vendor premium subscriptions, and a responsive user interface.

---

## 🌐 Live Website

- **Live Client:** [Add your deployed frontend URL]
- **Backend API:** [Add your deployed backend URL]

## 📂 GitHub Repositories

- **Client Repository:** [Add your client GitHub repository URL]
- **Server Repository:** [Add your server GitHub repository URL]

---

## ✨ Key Features

### 👤 Customer

- Browse all approved and active pizza menu items.
- Search menu items by name.
- Filter menu items by category and location.
- Sort menu items by price (ascending and descending).
- View detailed pizza information.
- Place pizza orders with delivery date and address.
- Track order status.
- Cancel pending orders.
- Manage profile information.
- View order history from the Customer Dashboard.

### 🏪 Vendor

- Create and manage restaurant profiles.
- Add, update, and delete menu items.
- Upload menu item images using ImgBB.
- View menu item approval status.
- Manage menu availability.
- View customer orders.
- Accept or reject pending orders.
- View dashboard statistics.
- Upgrade to the Premium subscription plan.

### 👨‍💼 Admin

- View and manage platform users.
- Search users by name or email.
- Filter users by role.
- Block or unblock users (if implemented).
- Review pending menu submissions.
- Approve or reject menu items.
- Manage published menu items.
- View platform transactions.
- Monitor platform statistics.

### 💎 Vendor Premium Subscription

PizzaHub provides Free and Premium plans for vendors.

| Feature                     | Free Plan | Premium Plan |
| --------------------------- | --------- | ------------ |
| Active menu items           | Up to 3   | Unlimited    |
| Basic dashboard             | Yes       | Yes          |
| Order management            | Yes       | Yes          |
| Premium badge               | No        | Yes          |
| Featured homepage placement | No        | Yes          |

- Vendors can upgrade through Stripe Checkout.
- Premium status is updated only after server-side payment verification.
- Stripe webhooks are used to verify subscription payments.

### 🔐 Authentication & Security

- Email and password authentication.
- Google authentication.
- Better Auth integration.
- JWT-based API authentication.
- Role-based access control.
- Protected dashboard routes and APIs.
- Server-side authorization.
- Resource ownership verification.

---

## 🛠️ Technology Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- Framer Motion
- Lucide React
- Sonner

### Backend

- Node.js
- Express.js
- MongoDB
- Better Auth
- JSON Web Token (JWT)
- Stripe
- ImgBB API

---

## 📦 Important NPM Packages

### Client

- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- `framer-motion`
- `lucide-react`
- `sonner`
- `better-auth`

### Server

- `express`
- `mongodb`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `stripe`

*Add or remove package names according to the packages actually installed in your project.*

---

## ⚙️ Installation & Setup

### 1. Clone the Client Repository

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
cd YOUR_CLIENT_FOLDER
```

### 2. Install Client Dependencies

```bash
npm install
```

### 3. Configure Client Environment Variables

Create a `.env.local` file in the client root directory.

```env
NEXT_PUBLIC_API_BASE_URL=YOUR_BACKEND_API_URL
NEXT_PUBLIC_IMGBB_API_KEY=YOUR_IMGBB_API_KEY
```

Add the other environment variables required by your actual Better Auth and Google OAuth configuration. Never expose server-only secrets through `NEXT_PUBLIC_` variables.

### 4. Run the Client

```bash
npm run dev
```

Client development server:

```text
http://localhost:3000
```

---

### 5. Clone the Server Repository

Open another terminal:

```bash
git clone YOUR_SERVER_REPOSITORY_URL
cd YOUR_SERVER_FOLDER
```

### 6. Install Server Dependencies

```bash
npm install
```

### 7. Configure Server Environment Variables

Create a `.env` file in the server root directory.

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
DB_NAME=pizzahub

BETTER_AUTH_SECRET=YOUR_BETTER_AUTH_SECRET
BETTER_AUTH_URL=YOUR_BETTER_AUTH_URL

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET

IMGBB_API_KEY=YOUR_IMGBB_API_KEY

CLIENT_URL=YOUR_FRONTEND_URL
```

*These are example variable names. Match them with the exact names used in your source code and deployment settings.*

### 8. Run the Server

```bash
npm run dev
```

Server development address:

```text
http://localhost:5000
```

---

## 🔎 Advanced Search, Filtering & Sorting

PizzaHub provides advanced menu browsing functionality.

### Search

Customers can search menu items using their names.

Example:

```http
GET /menu?search=pizza
```

### Filter

Customers can filter menu items by category and location.

Example:

```http
GET /menu?category=specialty&location=Dhaka
```

### Price Sorting

Customers can sort menu items by price.

Ascending order:

```http
GET /menu?sort=price&order=asc
```

Descending order:

```http
GET /menu?sort=price&order=desc
```

### Combined Query Example

```http
GET /menu?search=pizza&category=specialty&location=Dhaka&sort=price&order=asc
```

*The query parameter examples above describe the intended API behavior. Update the endpoint and parameter names to match your actual backend implementation.*

---

## 🔐 JWT Authentication & Middleware Flow

PizzaHub uses token-based authentication to protect private API routes.

### Authentication Flow

1. A user signs in through Better Auth.
2. The authenticated session provides the necessary user identity and authentication information.
3. The client sends the required authentication token with protected API requests.
4. The backend verifies the token or session.
5. The authenticated user's information is attached to the request.
6. Role-based middleware checks whether the user is authorized to access the requested resource.
7. The backend returns the requested data or an appropriate error response.

### Authorization Middleware

| Middleware       | Responsibility                                  |
| ---------------- | ----------------------------------------------- |
| `verifyToken`    | Verifies authentication and identifies the user |
| `verifyAdmin`    | Allows only Admin users                         |
| `verifyVendor`   | Allows only Vendor users                        |
| `verifyCustomer` | Allows only Customer users                      |

### Example Protected API

```js
app.get(
    "/admin/users",
    verifyToken,
    verifyAdmin,
    async (req, res) => {
        // Admin-only operation
    }
);
```

### HTTP Status Codes

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | Request successful    |
| 201         | Resource created      |
| 400         | Invalid request       |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Resource not found    |
| 500         | Internal server error |

---

## 💳 Payment Integration

PizzaHub uses Stripe for vendor Premium subscriptions.

1. A vendor selects the Premium plan.
2. The backend creates a Stripe Checkout session after verifying the vendor.
3. The vendor completes payment through Stripe Checkout.
4. Stripe sends a webhook event to the backend.
5. The backend verifies the webhook signature.
6. After successful verification, the vendor's Premium status is updated.
7. The transaction is saved in the database.

Customer pizza orders do not require Stripe payments as specified in the project requirements.

---

## 🗄️ Database Collections

PizzaHub uses MongoDB for storing application data.

Main application collections:

- `user` — user profiles, roles, and vendor premium status.
- `addMenuItem` — menu items and their approval/availability status.
- `order` — customer orders and order statuses.
- `payments` — vendor subscription payment records.

Better Auth manages its own authentication-related data collections.

---

## 🔒 Security & Environment Variables

- Keep sensitive API keys and secrets in environment variables.
- Never commit `.env` or `.env.local` files to GitHub.
- Verify authentication on protected backend APIs.
- Check user roles on the server.
- Verify resource ownership before modifying or deleting records.
- Validate user input on the server.
- Verify Stripe webhook signatures before updating payment status.
- Do not trust client-submitted roles, payment status, or user IDs.

---

## 📱 Responsive Design

PizzaHub provides a responsive interface for:

- Desktop devices
- Tablets
- Mobile phones

The interface uses a pizza-themed design with reusable components, responsive layouts, and smooth animations.

---

## 🚀 Deployment

The frontend and backend are deployed separately.

Before deployment, verify:

- All environment variables are configured.
- MongoDB connection works.
- CORS is configured for the deployed frontend.
- Authentication works after page reload.
- Protected routes remain protected.
- Menu images load correctly.
- Stripe Checkout and webhook verification work.
- All dashboard routes work without 404 errors.

---

## 👨‍💻 Developer

**Tamim Reza**

Full-Stack Web Developer

- GitHub: [Your GitHub Profile URL]
- Email: [Your Contact Email]

---

## 📄 License

This project was developed as part of a full-stack development assignment.
