"use client";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import AlertMessage from "./alert/alertMessage";
import { apiRequest } from "@/lib/api";

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
];

interface RequestPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function Contact({ accessToken }: { accessToken?: string }) {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    type: "success" as "success" | "error",
    message: "",
    isOpen: false,
  });

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({
      type,
      message,
      isOpen: true,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { name, phone, email, message } = contact;
      if (!name || !phone || !email || !message) {
        showAlert("error", "Semua kolom harus diisi!");
        return;
      }

      const response = await apiRequest({
        endpoint: "/contact",
        method: "POST",
        body: contact as RequestPayload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response) {
        showAlert(
          "success",
          "Pesan Anda telah terkirim. Kami akan segera menghubungi Anda."
        );
        setContact({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      }
      
    } catch (error) {
      console.log(error);
      showAlert("error", "Gagal mengirim pesan. Silakan coba lagi nanti.");
    }finally{
      setLoading(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section id="kontak" className="py-16 md:py-24 bg-none">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Hubungi Kami
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tertarik dengan GreenKost? Hubungi kami untuk informasi lebih
              lanjut atau jadwalkan kunjungan
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl mt-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              {contactData.map((item, i) => (
                <div key={i} className="flex items-start">
                  <item.icon className="mr-4 h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-gray-500">{item.content}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-3">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-200 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-200 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-200 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-green-100 p-6 bg-green-50/50">
              <h3 className="text-lg font-medium mb-4">Kirim Pesan</h3>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nama
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Nama lengkap"
                      value={contact.name}
                      onChange={handleChange}
                      name="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Telepon
                    </label>
                    <input
                      id="phone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Nomor telepon"
                      value={contact.phone}
                      onChange={handleChange}
                      name="phone"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Email"
                    value={contact.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tulis pesan Anda di sini..."
                    value={contact.message}
                    onChange={handleChange}
                    name="message"
                  />
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full p-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors relative"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </span>
                  ) : (
                    "Kirim Pesan"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AlertMessage
        type={alert.type}
        message={alert.message}
        isOpen={alert.isOpen}
        onClose={() => setAlert({ ...alert, isOpen: false })}
      />
    </section>
  );
}
