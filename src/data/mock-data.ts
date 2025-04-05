export const roomTypes = [
  {
    id: 1,
    type: "A",
    description: "Kamar dengan fasilitas lengkap dan nyaman",
    price: "Rp 1.500.000/bulan",
    features: [
      "Ukuran kamar 3x4 meter",
      "Kamar mandi luar",
      "Kasur single",
      "Lemari pakaian",
      "Meja belajar",
      "WiFi gratis",
      "AC",
    ],
    availability: 3,
  },
  {
    id: 2,
    type: "B",
    description: "Kamar dengan balkon dan pemandangan indah",
    price: "Rp 1.750.000/bulan",
    features: [
      "Ukuran kamar 3x4 meter",
      "Kamar mandi luar",
      "Kasur single",
      "Lemari pakaian",
      "Meja belajar",
      "WiFi gratis",
      "AC",
      "Balkon pribadi",
    ],
    availability: 2,
  },
  {
    id: 3,
    type: "C",
    description: "Kamar luas dengan kamar mandi dalam",
    price: "Rp 2.000.000/bulan",
    features: [
      "Ukuran kamar 4x4 meter",
      "Kamar mandi dalam",
      "Kasur single",
      "Lemari pakaian besar",
      "Meja belajar",
      "WiFi gratis",
      "AC",
    ],
    availability: 5,
  },
  {
    id: 4,
    type: "D",
    description: "Kamar premium dengan fasilitas ekstra",
    price: "Rp 2.250.000/bulan",
    features: [
      "Ukuran kamar 4x5 meter",
      "Kamar mandi dalam",
      "Kasur queen size",
      "Lemari pakaian besar",
      "Meja belajar",
      "WiFi gratis",
      "AC",
      "TV LED 32 inch",
    ],
    availability: 1,
  },
  {
    id: 5,
    type: "E",
    description: "Kamar executive dengan ruang tamu terpisah",
    price: "Rp 2.500.000/bulan",
    features: [
      "Ukuran kamar 5x6 meter",
      "Kamar mandi dalam",
      "Kasur queen size",
      "Lemari pakaian besar",
      "Meja belajar",
      "WiFi gratis",
      "AC",
      "TV LED 40 inch",
      "Ruang tamu kecil",
      "Kulkas mini",
    ],
    availability: 0,
  },
]

export interface TenantData {
  id: number;
  name: string;
  date: string;
  status: string;
}


export const tenantData: TenantData[] = [
  {
    id: 1,
    name: "hanni",
    date: "20/12/2023",
    status: "menunggu konfirmasi",
  },
  {
    id: 2,
    name: "lia",
    date: "20/12/2023",
    status: "selesai",
  },
  {
    id: 3,
    name: "ica",
    date: "16/11/2023",
    status: "menunggu spare part",
  },
  {
    id: 4,
    name: "fajry",
    date: "20/12/2023",
    status: "selesai",
  },
  {
    id: 5,
    name: "nada",
    date: "20/12/2023",
    status: "ditolak",
  },
  {
    id: 6,
    name: "gojo",
    date: "20/12/2023",
    status: "selesai",
  },
  {
    id: 7,
    name: "durin",
    date: "1/12/2023",
    status: "ditolak",
  },
  {
    id: 8,
    name: "macan",
    date: "20/12/2023",
    status: "selesai",
  },
  {
    id: 9,
    name: "nulela",
    date: "20/12/2023",
    status: "ditolak",
  },
  {
    id: 10,
    name: "garam dan medu",
    date: "20/12/2023",
    status: "selesai",
  },
]

export const allTenantData: TenantData[] = [
  ...tenantData,
  { id: 11, name: "ahmad", date: "22/12/2023", status: "menunggu konfirmasi" },
  { id: 12, name: "budi", date: "22/12/2023", status: "selesai" },
  { id: 13, name: "citra", date: "23/12/2023", status: "ditolak" },
  { id: 14, name: "deni", date: "23/12/2023", status: "menunggu spare part" },
  { id: 15, name: "eko", date: "24/12/2023", status: "selesai" },
  { id: 16, name: "fina", date: "24/12/2023", status: "menunggu konfirmasi" },
  { id: 17, name: "gita", date: "25/12/2023", status: "selesai" },
  { id: 18, name: "hadi", date: "25/12/2023", status: "ditolak" },
  { id: 19, name: "indra", date: "26/12/2023", status: "selesai" },
  { id: 20, name: "joko", date: "26/12/2023", status: "menunggu spare part" },
  { id: 21, name: "kiki", date: "27/12/2023", status: "selesai" },
  { id: 22, name: "lina", date: "27/12/2023", status: "ditolak" },
  { id: 23, name: "mira", date: "28/12/2023", status: "menunggu konfirmasi" },
  { id: 24, name: "nana", date: "28/12/2023", status: "selesai" },
  { id: 25, name: "oki", date: "29/12/2023", status: "ditolak" },
]
export const months = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
]
export const statusTypes = ["PENDING", "COMPLETED"]

