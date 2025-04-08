import type{FinanceDetailsResponse, TenantDetails, RentDetails} from "@/types/finance"

enum INOUT {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
}

const createDate = (year: number, month: number, day: number, hour: number, minute = 0) => {
  return new Date(year, month - 1, day, hour, minute)
}
const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth() + 1
const currentDay = now.getDate()

// Generate mock data for the finance dashboard
export const mockFinanceData: FinanceDetailsResponse[] = [
  // Today's transactions (for day view)
  {
    id_finance: "fin-today-1",
    id_tenant: "tenant-001",
    id_rent: "rent-001",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1500000,
    payment_date: createDate(currentYear, currentMonth, currentDay, 9, 30),
    created_at: createDate(currentYear, currentMonth, currentDay, 9, 30),
    updated_at: createDate(currentYear, currentMonth, currentDay, 9, 30),
    tenant: {
      id_tenant: "tenant-001",
      name: "Ahmad Fauzi",
    },
    rentData: {
      id_rent: "rent-001",
      id_room: "room-A1",
      rent_date: new Date("2023-01-01"),
    },
  },
  {
    id_finance: "fin-today-2",
    id_tenant: "tenant-002",
    id_rent: "rent-002",
    type: INOUT.OUTCOME,
    category: "Pembayaran Internet",
    amount: 350000,
    payment_date: createDate(currentYear, currentMonth, currentDay, 11, 15),
    created_at: createDate(currentYear, currentMonth, currentDay, 11, 15),
    updated_at: createDate(currentYear, currentMonth, currentDay, 11, 15),
    tenant: {
      id_tenant: "tenant-002",
      name: "Budi Santoso",
    },
    rentData: {
      id_rent: "rent-002",
      id_room: "room-A2",
      rent_date: new Date("2023-02-01"),
    },
  },
  {
    id_finance: "fin-today-3",
    id_tenant: "tenant-003",
    id_rent: "rent-003",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1350000,
    payment_date: createDate(currentYear, currentMonth, currentDay, 14, 45),
    created_at: createDate(currentYear, currentMonth, currentDay, 14, 45),
    updated_at: createDate(currentYear, currentMonth, currentDay, 14, 45),
    tenant: {
      id_tenant: "tenant-003",
      name: "Citra Dewi",
    },
    rentData: {
      id_rent: "rent-003",
      id_room: "room-B1",
      rent_date: new Date("2023-03-01"),
    },
  },
  {
    id_finance: "fin-today-4",
    id_tenant: "tenant-004",
    id_rent: "rent-004",
    type: INOUT.OUTCOME,
    category: "Perbaikan AC",
    amount: 500000,
    payment_date: createDate(currentYear, currentMonth, currentDay, 16, 30),
    created_at: createDate(currentYear, currentMonth, currentDay, 16, 30),
    updated_at: createDate(currentYear, currentMonth, currentDay, 16, 30),
    tenant: {
      id_tenant: "tenant-004",
      name: "Dian Purnama",
    },
    rentData: {
      id_rent: "rent-004",
      id_room: "room-B2",
      rent_date: new Date("2023-04-01"),
    },
  },

  // This week's transactions (for week view)
  {
    id_finance: "fin-week-1",
    id_tenant: "tenant-005",
    id_rent: "rent-005",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1250000,
    payment_date: createDate(currentYear, currentMonth, currentDay - 1, 10, 0),
    created_at: createDate(currentYear, currentMonth, currentDay - 1, 10, 0),
    updated_at: createDate(currentYear, currentMonth, currentDay - 1, 10, 0),
    tenant: {
      id_tenant: "tenant-005",
      name: "Eko Prasetyo",
    },
    rentData: {
      id_rent: "rent-005",
      id_room: "room-C1",
      rent_date: new Date("2023-04-05"),
    },
  },
  {
    id_finance: "fin-week-2",
    id_tenant: "tenant-001",
    id_rent: "rent-001",
    type: INOUT.OUTCOME,
    category: "Pembayaran Air",
    amount: 250000,
    payment_date: createDate(currentYear, currentMonth, currentDay - 2, 9, 30),
    created_at: createDate(currentYear, currentMonth, currentDay - 2, 9, 30),
    updated_at: createDate(currentYear, currentMonth, currentDay - 2, 9, 30),
    tenant: {
      id_tenant: "tenant-001",
      name: "Ahmad Fauzi",
    },
    rentData: {
      id_rent: "rent-001",
      id_room: "room-A1",
      rent_date: new Date("2023-01-01"),
    },
  },
  {
    id_finance: "fin-week-3",
    id_tenant: "tenant-002",
    id_rent: "rent-002",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1200000,
    payment_date: createDate(currentYear, currentMonth, currentDay - 3, 14, 15),
    created_at: createDate(currentYear, currentMonth, currentDay - 3, 14, 15),
    updated_at: createDate(currentYear, currentMonth, currentDay - 3, 14, 15),
    tenant: {
      id_tenant: "tenant-002",
      name: "Budi Santoso",
    },
    rentData: {
      id_rent: "rent-002",
      id_room: "room-A2",
      rent_date: new Date("2023-02-01"),
    },
  },
  {
    id_finance: "fin-week-4",
    id_tenant: "tenant-003",
    id_rent: "rent-003",
    type: INOUT.OUTCOME,
    category: "Pembayaran Listrik",
    amount: 450000,
    payment_date: createDate(currentYear, currentMonth, currentDay - 5, 11, 0),
    created_at: createDate(currentYear, currentMonth, currentDay - 5, 11, 0),
    updated_at: createDate(currentYear, currentMonth, currentDay - 5, 11, 0),
    tenant: {
      id_tenant: "tenant-003",
      name: "Citra Dewi",
    },
    rentData: {
      id_rent: "rent-003",
      id_room: "room-B1",
      rent_date: new Date("2023-03-01"),
    },
  },

  // This month's transactions (for month view)
  {
    id_finance: "fin-month-1",
    id_tenant: "tenant-004",
    id_rent: "rent-004",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1400000,
    payment_date: createDate(currentYear, currentMonth, 5, 9, 0),
    created_at: createDate(currentYear, currentMonth, 5, 9, 0),
    updated_at: createDate(currentYear, currentMonth, 5, 9, 0),
    tenant: {
      id_tenant: "tenant-004",
      name: "Dian Purnama",
    },
    rentData: {
      id_rent: "rent-004",
      id_room: "room-B2",
      rent_date: new Date("2023-04-01"),
    },
  },
  {
    id_finance: "fin-month-2",
    id_tenant: "tenant-005",
    id_rent: "rent-005",
    type: INOUT.OUTCOME,
    category: "Perbaikan Kamar Mandi",
    amount: 350000,
    payment_date: createDate(currentYear, currentMonth, 10, 13, 30),
    created_at: createDate(currentYear, currentMonth, 10, 13, 30),
    updated_at: createDate(currentYear, currentMonth, 10, 13, 30),
    tenant: {
      id_tenant: "tenant-005",
      name: "Eko Prasetyo",
    },
    rentData: {
      id_rent: "rent-005",
      id_room: "room-C1",
      rent_date: new Date("2023-04-05"),
    },
  },
  {
    id_finance: "fin-month-3",
    id_tenant: "tenant-001",
    id_rent: "rent-001",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1500000,
    payment_date: createDate(currentYear, currentMonth, 15, 10, 15),
    created_at: createDate(currentYear, currentMonth, 15, 10, 15),
    updated_at: createDate(currentYear, currentMonth, 15, 10, 15),
    tenant: {
      id_tenant: "tenant-001",
      name: "Ahmad Fauzi",
    },
    rentData: {
      id_rent: "rent-001",
      id_room: "room-A1",
      rent_date: new Date("2023-01-01"),
    },
  },
  {
    id_finance: "fin-month-4",
    id_tenant: "tenant-002",
    id_rent: "rent-002",
    type: INOUT.OUTCOME,
    category: "Pembayaran Internet",
    amount: 300000,
    payment_date: createDate(currentYear, currentMonth, 20, 15, 45),
    created_at: createDate(currentYear, currentMonth, 20, 15, 45),
    updated_at: createDate(currentYear, currentMonth, 20, 15, 45),
    tenant: {
      id_tenant: "tenant-002",
      name: "Budi Santoso",
    },
    rentData: {
      id_rent: "rent-002",
      id_room: "room-A2",
      rent_date: new Date("2023-02-01"),
    },
  },

  // Year data (for year view)
  {
    id_finance: "fin-year-1",
    id_tenant: "tenant-003",
    id_rent: "rent-003",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1350000,
    payment_date: createDate(currentYear, 1, 15, 10, 0),
    created_at: createDate(currentYear, 1, 15, 10, 0),
    updated_at: createDate(currentYear, 1, 15, 10, 0),
    tenant: {
      id_tenant: "tenant-003",
      name: "Citra Dewi",
    },
    rentData: {
      id_rent: "rent-003",
      id_room: "room-B1",
      rent_date: new Date("2023-03-01"),
    },
  },
  {
    id_finance: "fin-year-2",
    id_tenant: "tenant-004",
    id_rent: "rent-004",
    type: INOUT.OUTCOME,
    category: "Pembayaran Listrik",
    amount: 450000,
    payment_date: createDate(currentYear, 2, 10, 14, 30),
    created_at: createDate(currentYear, 2, 10, 14, 30),
    updated_at: createDate(currentYear, 2, 10, 14, 30),
    tenant: {
      id_tenant: "tenant-004",
      name: "Dian Purnama",
    },
    rentData: {
      id_rent: "rent-004",
      id_room: "room-B2",
      rent_date: new Date("2023-04-01"),
    },
  },
  {
    id_finance: "fin-year-3",
    id_tenant: "tenant-005",
    id_rent: "rent-005",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1250000,
    payment_date: createDate(currentYear, 3, 5, 9, 15),
    created_at: createDate(currentYear, 3, 5, 9, 15),
    updated_at: createDate(currentYear, 3, 5, 9, 15),
    tenant: {
      id_tenant: "tenant-005",
      name: "Eko Prasetyo",
    },
    rentData: {
      id_rent: "rent-005",
      id_room: "room-C1",
      rent_date: new Date("2023-04-05"),
    },
  },
  {
    id_finance: "fin-year-4",
    id_tenant: "tenant-001",
    id_rent: "rent-001",
    type: INOUT.OUTCOME,
    category: "Perbaikan Kamar Mandi",
    amount: 350000,
    payment_date: createDate(currentYear, 4, 20, 13, 0),
    created_at: createDate(currentYear, 4, 20, 13, 0),
    updated_at: createDate(currentYear, 4, 20, 13, 0),
    tenant: {
      id_tenant: "tenant-001",
      name: "Ahmad Fauzi",
    },
    rentData: {
      id_rent: "rent-001",
      id_room: "room-A1",
      rent_date: new Date("2023-01-01"),
    },
  },
  {
    id_finance: "fin-year-5",
    id_tenant: "tenant-002",
    id_rent: "rent-002",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1200000,
    payment_date: createDate(currentYear, 6, 15, 10, 30),
    created_at: createDate(currentYear, 6, 15, 10, 30),
    updated_at: createDate(currentYear, 6, 15, 10, 30),
    tenant: {
      id_tenant: "tenant-002",
      name: "Budi Santoso",
    },
    rentData: {
      id_rent: "rent-002",
      id_room: "room-A2",
      rent_date: new Date("2023-02-01"),
    },
  },
  {
    id_finance: "fin-year-6",
    id_tenant: "tenant-003",
    id_rent: "rent-003",
    type: INOUT.OUTCOME,
    category: "Pembayaran Air",
    amount: 250000,
    payment_date: createDate(currentYear, 7, 5, 9, 0),
    created_at: createDate(currentYear, 7, 5, 9, 0),
    updated_at: createDate(currentYear, 7, 5, 9, 0),
    tenant: {
      id_tenant: "tenant-003",
      name: "Citra Dewi",
    },
    rentData: {
      id_rent: "rent-003",
      id_room: "room-B1",
      rent_date: new Date("2023-03-01"),
    },
  },
  {
    id_finance: "fin-year-7",
    id_tenant: "tenant-004",
    id_rent: "rent-004",
    type: INOUT.INCOME,
    category: "Sewa Kamar",
    amount: 1400000,
    payment_date: createDate(currentYear, 8, 10, 11, 45),
    created_at: createDate(currentYear, 8, 10, 11, 45),
    updated_at: createDate(currentYear, 8, 10, 11, 45),
    tenant: {
      id_tenant: "tenant-004",
      name: "Dian Purnama",
    },
    rentData: {
      id_rent: "rent-004",
      id_room: "room-B2",
      rent_date: new Date("2023-04-01"),
    },
  },
  {
    id_finance: "fin-year-8",
    id_tenant: "tenant-005",
    id_rent: "rent-005",
    type: INOUT.OUTCOME,
    category: "Pembayaran Internet",
    amount: 300000,
    payment_date: createDate(currentYear, 9, 15, 14, 0),
    created_at: createDate(currentYear, 9, 15, 14, 0),
    updated_at: createDate(currentYear, 9, 15, 14, 0),
    tenant: {
      id_tenant: "tenant-005",
      name: "Eko Prasetyo",
    },
    rentData: {
      id_rent: "rent-005",
      id_room: "room-C1",
      rent_date: new Date("2023-04-05"),
    },
  },
]

// Generate mock data for tenants
export const mockTenants: TenantDetails[] = [
  {
    id_tenant: "tenant-001",
    name: "Ahmad Fauzi",
  },
  {
    id_tenant: "tenant-002",
    name: "Budi Santoso",
  },
  {
    id_tenant: "tenant-003",
    name: "Citra Dewi",
  },
  {
    id_tenant: "tenant-004",
    name: "Dian Purnama",
  },
  {
    id_tenant: "tenant-005",
    name: "Eko Prasetyo",
  },
]

export const mockRentals: RentDetails[] = [
  {
    id_rent: "rent-001",
    id_room: "room-A1",
    rent_date: new Date("2023-01-01"),
  },
  {
    id_rent: "rent-002",
    id_room: "room-A2",
    rent_date: new Date("2023-02-01"),
  },
  {
    id_rent: "rent-003",
    id_room: "room-B1",
    rent_date: new Date("2023-03-01"),
  },
  {
    id_rent: "rent-004",
    id_room: "room-B2",
    rent_date: new Date("2023-04-01"),
  },
  {
    id_rent: "rent-005",
    id_room: "room-C1",
    rent_date: new Date("2023-04-05"),
  },
]

