"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wifi,
  ShowerHead,
  Utensils,
  Tv,
  Lock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Star,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Rooms from "./Rooms";
import Fitur from "./Fitur";
import Testimonials from "./Testimonials";
import Lokasi from "./Lokasi";
import Contact from "./Contact";
import Cta from "./Cta";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Fitur />
        {/* Rooms Section */}
        <Rooms />

        {/* Testimonials Section */}

        <Testimonials />
        {/* Location Section */}

        <Lokasi />
        {/* Contact Section */}

        <Contact/>
        {/* CTA Section */}
        <Cta/>
      </main>
    <Footer/>
    </div>
  );
}
