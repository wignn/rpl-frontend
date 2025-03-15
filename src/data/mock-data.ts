import { Wifi, ShowerHead, Utensils, Tv, Lock, MapPin, Phone, Mail } from "lucide-react"

// Navigation items
export const navigationItems = ["Beranda", "Kamar", "Fasilitas", "Lokasi", "Testimoni", "Kontak"]

// Features data
export const featuresData = [
  {
    icon: Wifi,
    title: "WiFi Cepat",
    description: "Koneksi internet stabil dan cepat untuk kebutuhan belajar dan bekerja",
  },
  {
    icon: ShowerHead,
    title: "Kamar Mandi Dalam",
    description: "Privasi terjaga dengan kamar mandi dalam di setiap kamar",
  },
  {
    icon: Utensils,
    title: "Dapur Bersama",
    description: "Dapur bersama yang bersih dan lengkap untuk memasak",
  },
  {
    icon: Tv,
    title: "Ruang Komunal",
    description: "Ruang bersama untuk bersantai dan bersosialisasi",
  },
  {
    icon: Lock,
    title: "Keamanan 24 Jam",
    description: "Sistem keamanan dan CCTV 24 jam untuk ketenangan Anda",
  },
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description: "Dekat dengan kampus, pusat perbelanjaan, dan transportasi umum",
  },
]

// Rooms data
export const roomsData = [
  {
    title: "Kamar Standard",
    price: "Rp 800.000",
    description: "Kamar nyaman dengan fasilitas dasar untuk kebutuhan sehari-hari",
    features: ["Ukuran 3x3 meter", "Kasur single", "Lemari pakaian", "Meja belajar", "Kamar mandi dalam"],
    popular: false,
  },
  {
    title: "Kamar Premium",
    price: "Rp 1.200.000",
    description: "Kamar lebih luas dengan fasilitas tambahan untuk kenyamanan ekstra",
    features: ["Ukuran 4x3 meter", "Kasur queen size", "Lemari besar", "Meja belajar", "Kamar mandi dalam", "AC"],
    popular: true,
  },
  {
    title: "Kamar Deluxe",
    price: "Rp 1.500.000",
    description: "Kamar terluas dengan fasilitas lengkap untuk pengalaman tinggal terbaik",
    features: [
      "Ukuran 4x4 meter",
      "Kasur queen size",
      "Walk-in closet",
      "Meja belajar",
      "Kamar mandi dalam",
      "AC",
      "TV",
    ],
    popular: false,
  },
]

// Testimonials data
export const testimonialsData = [
  {
    name: "Budi Santoso",
    role: "Mahasiswa",
    content:
      "Saya sudah tinggal di GreenKost selama 2 tahun dan sangat puas. Fasilitas lengkap, lokasi strategis, dan pengelola yang ramah membuat saya betah tinggal di sini.",
    rating: 5,
  },
  {
    name: "Ani Wijaya",
    role: "Karyawan Swasta",
    content:
      "GreenKost menjadi pilihan tepat untuk saya yang bekerja di pusat kota. Akses transportasi mudah dan fasilitas WiFi yang cepat sangat membantu pekerjaan saya.",
    rating: 5,
  },
  {
    name: "Dedi Pratama",
    role: "Freelancer",
    content:
      "Suasana yang tenang dan nyaman membuat saya produktif bekerja dari kamar. Dapur bersama juga sangat membantu untuk menghemat biaya makan di luar.",
    rating: 4,
  },
]

// Location data
export const nearbyPlacesData = [
  { name: "Universitas Indonesia", distance: "500 meter (5 menit jalan kaki)" },
  { name: "Halte Transjakarta", distance: "300 meter (3 menit jalan kaki)" },
  { name: "Mall Depok Town Square", distance: "1 km (5 menit dengan transportasi)" },
  { name: "Rumah Sakit UI", distance: "800 meter (8 menit jalan kaki)" },
  { name: "Minimarket", distance: "50 meter (1 menit jalan kaki)" },
]

// Contact data
export const contactData = [
  {
    icon: Phone,
    title: "Telepon/WhatsApp",
    content: "+62 812-3456-7890",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@greenkost.com",
  },
  {
    icon: MapPin,
    title: "Alamat",
    content: "Jl. Margonda Raya No. 123, Depok, Jawa Barat",
  },
]

// Business hours
export const businessHours = ["Senin - Jumat: 08.00 - 20.00", "Sabtu: 09.00 - 18.00", "Minggu: 09.00 - 16.00"]

// Recent payments data
export const paymentsData = [
  { tenant: "Budi Santoso", room: "101", amount: "Rp 800.000", date: "15 Jun 2023", status: "success" },
  { tenant: "Ani Wijaya", room: "102", amount: "Rp 800.000", date: "14 Jun 2023", status: "success" },
  { tenant: "Maya Lestari", room: "201", amount: "Rp 850.000", date: "13 Jun 2023", status: "success" },
  { tenant: "Rudi Hartono", room: "202", amount: "Rp 850.000", date: "12 Jun 2023", status: "success" },
  { tenant: "Dewi Sartika", room: "206", amount: "Rp 850.000", date: "10 Jun 2023", status: "success" },
]

// Upcoming payments data
export const upcomingPaymentsData = [
  { tenant: "Joko Susilo", room: "106", amount: "Rp 800.000", dueDate: "25 Jun 2023", status: "soon" },
  { tenant: "Sinta Dewi", room: "203", amount: "Rp 850.000", dueDate: "26 Jun 2023", status: "soon" },
  { tenant: "Tono Wijaya", room: "205", amount: "Rp 850.000", dueDate: "28 Jun 2023", status: "soon" },
  { tenant: "Rina Tari", room: "105", amount: "Rp 800.000", dueDate: "30 Jun 2023", status: "soon" },
]

