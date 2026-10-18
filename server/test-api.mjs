// Test script for API verification
const BASE_URL = "http://localhost:5000/api";

async function runTests() {
  console.log("=== RUNNING API TESTS ===");

  // 1. Health check
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthJson = await healthRes.json();
  console.log("1. Health Check:", healthJson.status === "ok" ? "PASS" : "FAIL", healthJson);

  // 2. Product list
  const prodRes = await fetch(`${BASE_URL}/products`);
  const prodJson = await prodRes.json();
  console.log("2. Product List:", prodJson.success && prodJson.data.length > 0 ? "PASS" : "FAIL", `Found ${prodJson.data?.length} products`);

  // 3. Product detail
  const detailRes = await fetch(`${BASE_URL}/products/core-performance-tee`);
  const detailJson = await detailRes.json();
  console.log("3. Product Detail:", detailJson.success && detailJson.data?.id === "core-performance-tee" ? "PASS" : "FAIL", detailJson.data?.name);

  // 4. Admin Login
  const loginRes = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@viratsports.com",
      password: "Admin@Virat2026!",
    }),
  });
  const loginJson = await loginRes.json();
  console.log("4. Admin Login:", loginJson.success && loginJson.token ? "PASS" : "FAIL", `Token received: ${Boolean(loginJson.token)}`);

  const token = loginJson.token;

  // 5. Protected Admin Stats (Unauthorized should fail)
  const unauthStatsRes = await fetch(`${BASE_URL}/admin/stats`);
  console.log("5. Unauthenticated Admin Route Blocked:", unauthStatsRes.status === 401 ? "PASS (401)" : "FAIL", unauthStatsRes.status);

  // 6. Protected Admin Stats (Authorized)
  const authStatsRes = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const authStatsJson = await authStatsRes.json();
  console.log("6. Authorized Admin Stats:", authStatsJson.success ? "PASS" : "FAIL", authStatsJson.data);

  // 7. Order creation with Authoritative Price Verification
  const orderPayload = {
    customer: {
      fullName: "Test Customer",
      email: "customer@example.com",
      phone: "+91 9876543210",
    },
    shippingAddress: {
      street: "123 Cricket Way",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    items: [
      {
        productId: "core-performance-tee",
        size: "L",
        quantity: 2,
        // Tampered client price: attempting to pay ₹10 instead of ₹999
        price: 10,
      },
    ],
  };

  const orderRes = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload),
  });
  const orderJson = await orderRes.json();
  const order = orderJson.data;

  // Invariant verification: unit price MUST be 999, subtotal MUST be 1998, status MUST be pending_payment
  const isPriceAuthoritative = order?.items?.[0]?.price === 999 && order?.subtotal === 1998;
  const isPaymentPending = order?.paymentStatus === "pending_payment";

  console.log("7. Order Creation & Price Tampering Resistance:", (isPriceAuthoritative && isPaymentPending) ? "PASS" : "FAIL", {
    orderId: order?.orderId,
    verifiedUnitPrice: order?.items?.[0]?.price,
    subtotal: order?.subtotal,
    paymentStatus: order?.paymentStatus,
  });

  // 8. Contact form submission
  const contactRes = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Rohit Fan",
      email: "fan@example.com",
      subject: "Custom Teamwear Inquiry",
      message: "We would like to order 25 customized match jerseys for our club tournament.",
    }),
  });
  const contactJson = await contactRes.json();
  console.log("8. Contact Submission:", contactJson.success ? "PASS" : "FAIL", contactJson);

  console.log("=== TESTS COMPLETE ===");
}

runTests().catch(console.error);

