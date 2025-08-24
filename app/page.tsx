import { div } from "motion/react-client";
import Image from "next/image";
import Navbar from "./_components/layout/Navbar";
import AnnouncementBar from "./_components/sections/AnnouncementBar";
import Header from "./_components/sections/Header";
import HeroSection from "./_components/sections/HeroSection";
import CardSection from "./_components/sections/CardSection";
import TextReveal from "./_components/sections/TextReveal";
import ScrollGrowVideo from "./_components/sections/ScrollGrowVideo";
import WhatWereBuilding from "./_components/sections/WhatWereBuilding";
import BuiltForScroller from "./_components/sections/BuiltForScroller";
import InvestorPage from "./_components/sections/InvestorPage";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <AnnouncementBar />
      <HeroSection />

      <CardSection />

      <TextReveal
        text="Post Labs is rethinking how digital media works for Canadians. Our mission is simple: make journalism profitable, sustainable, and trusted – built for Canadians, by Canadians."
        start="top center"
        end="bottom center"
        scrub={1.5}
        className="py-32"
      />

      <ScrollGrowVideo src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-transcode.mp4" />

      <WhatWereBuilding />


      <InvestorPage />

    
    </main>
  );
}
