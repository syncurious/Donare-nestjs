# Donation API Usage Examples

This document shows how to use the donation API with different donation types and their specific fields, including the new "donate in kind" feature.

## 1. Creating a Monetary Zakat Donation

```typescript
// POST /donations
{
  "donationType": "ZAKAT",
  "amount": 2500,
  "description": "Zakat al-Mal payment for 2024",
  "zakatYear": 2024,
  "zakatCalculationMethod": "GOLD",
  "zakatAssetsValue": 100000,
  "paymentMethod": "BANK_TRANSFER",
  "isInKind": false
}
```

## 2. Creating an In-Kind Zakat Donation

```typescript
// POST /donations
{
  "donationType": "ZAKAT",
  "description": "Zakat al-Mal donation in kind",
  "zakatYear": 2024,
  "zakatCalculationMethod": "GOLD",
  "zakatAssetsValue": 100000,
  "isInKind": true,
  "itemName": "Gold Jewelry Set",
  "itemImage": "https://example.com/images/gold-jewelry.jpg",
  "donorName": "Ahmed Ali",
  "donorPhone": "+1234567890",
  "pickupAddress": "123 Main Street, City, State 12345"
}
```

## 3. Creating a Monetary Fitrah Donation

```typescript
// POST /donations
{
  "donationType": "FITRAH",
  "amount": 500,
  "description": "Eid al-Fitr charity",
  "fitrahYear": 2024,
  "fitrahCalculationMethod": "CASH",
  "fitrahAmount": 500,
  "paymentMethod": "CREDIT_CARD",
  "isInKind": false
}
```

## 4. Creating an In-Kind Fitrah Donation

```typescript
// POST /donations
{
  "donationType": "FITRAH",
  "description": "Eid al-Fitr charity in kind",
  "fitrahYear": 2024,
  "fitrahCalculationMethod": "DATES",
  "fitrahAmount": 500,
  "isInKind": true,
  "itemName": "Fresh Dates (5kg)",
  "itemImage": "https://example.com/images/dates.jpg",
  "donorName": "Fatima Khan",
  "donorPhone": "+1234567891",
  "pickupAddress": "456 Oak Avenue, City, State 12345"
}
```

## 5. Creating a Simple Monetary Sadaqah

```typescript
// POST /donations
{
  "donationType": "SADAQAH",
  "amount": 100,
  "description": "General charity donation",
  "paymentMethod": "CASH",
  "isInKind": false
}
```

## 6. Creating an In-Kind Sadaqah

```typescript
// POST /donations
{
  "donationType": "SADAQAH",
  "description": "Clothing donation for the needy",
  "isInKind": true,
  "itemName": "Winter Clothes Collection",
  "itemImage": "https://example.com/images/winter-clothes.jpg",
  "donorName": "Sarah Johnson",
  "donorPhone": "+1234567892",
  "pickupAddress": "789 Pine Street, City, State 12345"
}
```

## 7. Using Type-Specific Endpoints

### Zakat Endpoint (Monetary)
```typescript
// POST /donations/zakat
{
  "donationType": "ZAKAT",
  "amount": 2500,
  "zakatYear": 2024,
  "zakatCalculationMethod": "GOLD",
  "zakatAssetsValue": 100000,
  "isInKind": false
}
```

### Zakat Endpoint (In-Kind)
```typescript
// POST /donations/zakat
{
  "donationType": "ZAKAT",
  "zakatYear": 2024,
  "zakatCalculationMethod": "GOLD",
  "zakatAssetsValue": 100000,
  "isInKind": true,
  "itemName": "Gold Coins",
  "itemImage": "https://example.com/images/gold-coins.jpg",
  "donorName": "Mohammed Hassan",
  "donorPhone": "+1234567893",
  "pickupAddress": "321 Elm Street, City, State 12345"
}
```

## 8. Validation Rules

### For Monetary Donations (isInKind: false or not provided)
- ✅ `amount` is **required** and must be > 0
- ✅ `itemName`, `itemImage`, `donorName`, `donorPhone`, `pickupAddress` are **optional**

### For In-Kind Donations (isInKind: true)
- ✅ `amount` is **optional** (can be null)
- ✅ `itemName` is **required**
- ✅ `itemImage` is **required** (must be valid URL)
- ✅ `donorName` is **required**
- ✅ `donorPhone` is **required**
- ✅ `pickupAddress` is **required**

### Valid In-Kind Donation
```typescript
{
  "donationType": "SADAQAH",
  "description": "Food donation",
  "isInKind": true,
  "itemName": "Rice and Lentils",
  "itemImage": "https://example.com/images/food.jpg",
  "donorName": "Ali Ahmed",
  "donorPhone": "+1234567894",
  "pickupAddress": "654 Maple Drive, City, State 12345"
}
```

### Invalid In-Kind Donation (will fail validation)
```typescript
{
  "donationType": "SADAQAH",
  "isInKind": true,
  "itemName": "Food", // ✅ Required field provided
  // ❌ Missing required fields: itemImage, donorName, donorPhone, pickupAddress
}
```

## 9. Response Format

All donations return the same response format:

```typescript
{
  "id": "uuid-string",
  "userId": "user-uuid",
  "amount": 2500, // null for in-kind donations
  "donationType": "ZAKAT",
  "status": "COMPLETED",
  "description": "Zakat al-Mal payment for 2024",
  
  // Donation in kind fields
  "isInKind": true,
  "itemName": "Gold Jewelry Set",
  "itemImage": "https://example.com/images/gold-jewelry.jpg",
  "donorName": "Ahmed Ali",
  "donorPhone": "+1234567890",
  "pickupAddress": "123 Main Street, City, State 12345",
  
  // Type-specific fields
  "zakatYear": 2024,
  "zakatCalculationMethod": "GOLD",
  "zakatAssetsValue": 100000,
  "fitrahYear": null,
  "fitrahCalculationMethod": null,
  "fitrahAmount": null,
  
  // Transaction details
  "transactionId": "txn_123",
  "paymentMethod": "BANK_TRANSFER",
  "paymentStatus": "COMPLETED",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## 10. Available Enums

### DonationType
- `ZAKAT`
- `SADAQAH`
- `FITRAH`
- `CAMPAIGN`
- `OTHER`

### ZakatCalculationMethod
- `GOLD`
- `SILVER`
- `CASH`
- `INVESTMENTS`
- `BUSINESS`
- `OTHER`

### FitrahCalculationMethod
- `DATES`
- `WHEAT`
- `BARLEY`
- `RAISINS`
- `CASH`

### DonationStatus
- `PENDING`
- `APPROVED`
- `REJECTED`
- `COMPLETED`
- `CANCELLED`

### PaymentStatus
- `PENDING`
- `PROCESSING`
- `COMPLETED`
- `FAILED`
- `REFUNDED`

## 11. Frontend Integration Tips

### Toggle Between Monetary and In-Kind
```typescript
// In your frontend form
const [isInKind, setIsInKind] = useState(false);

// Show/hide fields based on donation type
{isInKind ? (
  // Show in-kind fields
  <div>
    <input name="itemName" placeholder="Item Name" required />
    <input name="itemImage" type="url" placeholder="Image URL" required />
    <input name="donorName" placeholder="Donor Name" required />
    <input name="donorPhone" placeholder="Phone Number" required />
    <textarea name="pickupAddress" placeholder="Pickup Address" required />
  </div>
) : (
  // Show monetary fields
  <div>
    <input name="amount" type="number" placeholder="Amount" required />
    <select name="paymentMethod">
      <option value="CASH">Cash</option>
      <option value="CREDIT_CARD">Credit Card</option>
      <option value="BANK_TRANSFER">Bank Transfer</option>
    </select>
  </div>
)}
```

### Validation Logic
```typescript
const validateDonation = (data) => {
  if (data.isInKind) {
    // Validate in-kind required fields
    if (!data.itemName || !data.itemImage || !data.donorName || 
        !data.donorPhone || !data.pickupAddress) {
      throw new Error('All in-kind donation fields are required');
    }
  } else {
    // Validate monetary required fields
    if (!data.amount || data.amount <= 0) {
      throw new Error('Amount is required for monetary donations');
    }
  }
};
``` 