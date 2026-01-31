'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import Image from "next/image"

const ImageTabs = () => {
  const [activeTab, setActiveTab] = useState('organize');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  }
  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="mb-8 flex justify-center gap-4">
            <Button className={`${activeTab === 'organize' ? "text-white" : "bg-gray-200 text-gray-700 hover:text-white"} cursor-pointer rounded-lg px-6 py-3 text-sm font-medium transition-colors`} onClick={() => {
              handleTabClick('organize')
            }}>Organize Application</Button>
            <Button className={`${activeTab === 'getHired' ? "text-white" : "bg-gray-200 text-gray-700 hover:text-white"} cursor-pointer rounded-lg px-6 py-3 text-sm font-medium transition-colors`} onClick={() => {
              handleTabClick('getHired')
            }}>Get Hired</Button>
            <Button className={`${activeTab === 'manageBoards' ? "text-white" : "bg-gray-200 text-gray-700 hover:text-white"} cursor-pointer rounded-lg px-6 py-3 text-sm font-medium transition-colors`} onClick={() => {
              handleTabClick('manageBoards')
            }}>Manage Boards</Button>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
            {activeTab === 'organize' && <Image
              src="/hero-images/hero1.png"
              alt="Hero image"
              width={1200}
              height={800}
            />}
            {activeTab === 'getHired' && <Image
              src="/hero-images/hero2.png"
              alt="Hero image"
              width={1200}
              height={800}
            />}
            {activeTab === 'manageBoards' &&
              <Image
                src="/hero-images/hero3.png"
                alt="Hero image"
                width={1200}
                height={800}
              />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageTabs