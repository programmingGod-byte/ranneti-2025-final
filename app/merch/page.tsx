'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus, ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import Link from 'next/link'

const merchItems = [
  {
    id: 1,
    name: "RANEETI Champion Hoodie",
    price: 1299,
    originalPrice: 1599,
    images: [
      "/olympus-hoodie-black-1.png",
      "/olympus-hoodie-black-2.png",
      "/olympus-hoodie-black-3.png"
    ],
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Maroon"],
    rating: 4.8,
    reviews: 124,
    description: "Premium quality hoodie with embroidered Olympus logo. Perfect for champions!",
    longDescription: "Crafted for legends, this premium hoodie features the iconic Olympus logo embroidered with golden threads. Made from 100% organic cotton, it's designed to keep you comfortable whether you're training like a god or relaxing like royalty.",
    features: ["100% Organic Cotton", "Embroidered Logo", "Kangaroo Pocket", "Ribbed Cuffs", "Pre-shrunk"],
    inStock: true,
    trending: true
  },
  {
    id: 2,
    name: "Strategic Victory T-Shirt",
    price: 599,
    originalPrice: 799,
    images: [
      "/olympus-tshirt-white-1.png",
      "/olympus-tshirt-white-2.png",
      "/olympus-tshirt-white-3.png"
    ],
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Royal Blue"],
    rating: 4.9,
    reviews: 89,
    description: "Lightweight athletic tee with Zeus-inspired design. Unleash your inner god!",
    longDescription: "Channel the power of Zeus with this lightning-inspired athletic tee. Featuring moisture-wicking technology and a bold thunder god design, it's perfect for both workouts and casual wear.",
    features: ["Moisture Wicking", "Athletic Fit", "Screen Printed", "Breathable Fabric", "UV Protection"],
    inStock: true,
    trending: false
  },
  {
    id: 3,
    name: "RANEETI Victory Cap",
    price: 449,
    originalPrice: 599,
    images: [
      "/olympus-cap-black-1.png",
      "/olympus-cap-black-2.png",
      "/olympus-cap-black-3.png"
    ],
    category: "Caps",
    sizes: ["One Size"],
    colors: ["Black", "White", "Gold"],
    rating: 4.7,
    reviews: 67,
    description: "Snapback cap with 3D embroidered crown logo. Rule your domain!",
    longDescription: "Crown yourself with victory! This premium snapback features a stunning 3D embroidered crown logo that catches light from every angle. With an adjustable snapback closure and curved brim, it's the perfect accessory for any champion.",
    features: ["Adjustable Snapback", "3D Embroidery", "Curved Brim", "Cotton Twill", "Structured Crown"],
    inStock: true,
    trending: true
  },
  {
    id: 4,
    name: "Championship Track Jacket",
    price: 1799,
    originalPrice: 2199,
    images: [
      "/olympus-jacket-navy-1.png",
      "/olympus-jacket-navy-2.png",
      "/olympus-jacket-navy-3.png"
    ],
    category: "Jackets",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Black", "White"],
    rating: 4.9,
    reviews: 156,
    description: "Premium track jacket with golden accents. For the ultimate champions!",
    longDescription: "Step into legend with this premium track jacket featuring golden Olympic-inspired accents. Water-resistant and windproof, it's designed for champions who train in all conditions.",
    features: ["Water Resistant", "Full Zip", "Side Pockets", "Elastic Waistband", "Reflective Details"],
    inStock: true,
    trending: false
  },
  {
    id: 5,
    name: "RANEETI Sports Shorts",
    price: 799,
    originalPrice: 999,
    images: [
      "/olympus-shorts-black-1.png",
      "/olympus-shorts-black-2.png",
      "/olympus-shorts-black-3.png"
    ],
    category: "Shorts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey"],
    rating: 4.6,
    reviews: 92,
    description: "High-performance shorts for training and competition. Move like a god!",
    longDescription: "Engineered for peak performance, these shorts feature quick-dry technology and four-way stretch fabric. Perfect for any sport, from running to weightlifting.",
    features: ["Quick Dry", "4-Way Stretch", "Side Pockets", "Lightweight", "Anti-Chafe"],
    inStock: true,
    trending: false
  },
  {
    id: 6,
    name: "Strategist's Backpack",
    price: 1499,
    originalPrice: 1899,
    images: [
      "/olympus-backpack-black-1.png",
      "/olympus-backpack-black-2.png",
      "/olympus-backpack-black-3.png"
    ],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Black", "Navy", "Grey"],
    rating: 4.8,
    reviews: 78,
    description: "Spacious backpack with laptop compartment. Carry your victories everywhere!",
    longDescription: "The ultimate champion's companion! This premium backpack features multiple compartments, laptop protection, and ergonomic design. Built to last through every adventure.",
    features: ["Laptop Compartment", "Water Resistant", "Multiple Pockets", "Padded Straps", "USB Port"],
    inStock: false,
    trending: true
  }
]

export default function MerchPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState<{[key: number]: number}>({})
  const [wishlist, setWishlist] = useState<number[]>([])
  const [selectedItem, setSelectedItem] = useState<typeof merchItems[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const categories = ['All', 'T-Shirts', 'Hoodies', 'Caps', 'Jackets', 'Shorts', 'Accessories']

  const filteredItems = selectedCategory === 'All' 
    ? merchItems 
    : merchItems.filter(item => item.category === selectedCategory)

  // Auto-slide images in modal
  useEffect(() => {
    if (selectedItem) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [selectedItem])

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }))
  }

  const toggleWishlist = (itemId: number) => {
    setWishlist(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length)
    }
  }

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-yellow-400/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">
            RANEETI GEAR
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button className="relative p-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-6">
            Championship Gear
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            🛍️ Gear up like a champion! Premium RANEETI merchandise for true strategists 🛍️
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-yellow-400/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Slider Layout */}
        <div className="space-y-16">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image Section with 3D Effect */}
              <div className={`relative group ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <div className="relative h-96 rounded-3xl overflow-hidden transform-gpu hover:rotate-y-6 transition-all duration-700 preserve-3d">
                  <img
                    src={item.images[0] || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </div>
                    {item.trending && (
                      <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                    {!item.inStock && (
                      <div className="bg-slate-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 z-20 ${
                      wishlist.includes(item.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-black/50 text-white hover:bg-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>

                  {/* View Details Overlay */}
                  <button
                    onClick={() => {
                      setSelectedItem(item)
                      setCurrentImageIndex(0)
                      setSelectedSize(item.sizes[0])
                      setSelectedColor(item.colors[0])
                    }}
                    className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold">
                      View Details
                    </div>
                  </button>
                </div>

                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 rounded-3xl blur-xl transform translate-y-4 -z-10 opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              </div>

              {/* Content Section */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-yellow-400 mb-2">{item.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-400">({item.reviews} reviews)</span>
                  </div>

                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-yellow-400">₹{item.price}</span>
                  <span className="text-xl text-slate-500 line-through">₹{item.originalPrice}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save ₹{item.originalPrice - item.price}
                  </span>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-yellow-400 mb-3">Available Colors:</h4>
                  <div className="flex gap-3">
                    {item.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className={`w-12 h-12 rounded-full border-2 border-slate-600 cursor-pointer hover:border-yellow-400 transition-colors duration-300 ${
                          color === 'Black' ? 'bg-black' :
                          color === 'White' ? 'bg-white' :
                          color === 'Navy' ? 'bg-blue-900' :
                          color === 'Royal Blue' ? 'bg-blue-600' :
                          color === 'Maroon' ? 'bg-red-900' :
                          color === 'Gold' ? 'bg-yellow-500' :
                          color === 'Grey' ? 'bg-gray-500' :
                          'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-yellow-400 mb-3">Available Sizes:</h4>
                  <div className="flex gap-2">
                    {item.sizes.map((size) => (
                      <button
                        key={size}
                        className="px-4 py-2 border border-yellow-400/30 rounded-lg hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cart Controls */}
                <div className="flex items-center gap-4">
                  {cart[item.id] > 0 ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-slate-700 text-white p-3 rounded-full hover:bg-slate-600 transition-colors duration-300"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-2xl font-bold min-w-[3rem] text-center">{cart[item.id]}</span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition-colors duration-300"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item.id)}
                      disabled={!item.inStock}
                      className={`flex-1 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        item.inStock
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600'
                          : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedItem(item)
                      setCurrentImageIndex(0)
                      setSelectedSize(item.sizes[0])
                      setSelectedColor(item.colors[0])
                    }}
                    className="px-6 py-4 border border-yellow-400 text-yellow-400 rounded-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Product Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900/95 border border-yellow-400/30 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Enhanced Image Section */}
              <div className="relative">
                <div className="relative h-96 md:h-full min-h-[500px] rounded-l-3xl overflow-hidden">
                  <img
                    src={selectedItem.images[currentImageIndex] || "/placeholder.svg"}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Image Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Image Dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedItem.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-yellow-400' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {Math.round(((selectedItem.originalPrice - selectedItem.price) / selectedItem.originalPrice) * 100)}% OFF
                    </div>
                    {selectedItem.trending && (
                      <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300 z-10"
                >
                  ✕
                </button>
              </div>
              
              {/* Enhanced Content Section */}
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-3xl font-black text-yellow-400 mb-2">{selectedItem.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(selectedItem.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-400">({selectedItem.reviews} reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-yellow-400">₹{selectedItem.price}</span>
                  <span className="text-xl text-slate-500 line-through">₹{selectedItem.originalPrice}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save ₹{selectedItem.originalPrice - selectedItem.price}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">{selectedItem.longDescription}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-yellow-400 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {selectedItem.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-yellow-400 mb-3">Size:</h4>
                  <div className="flex gap-2">
                    {selectedItem.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-yellow-400 text-black'
                            : 'border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-yellow-400 mb-3">Color:</h4>
                  <div className="flex gap-3">
                    {selectedItem.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          selectedColor === color ? 'border-yellow-400 scale-110' : 'border-slate-600 hover:border-yellow-400'
                        } ${
                          color === 'Black' ? 'bg-black' :
                          color === 'White' ? 'bg-white' :
                          color === 'Navy' ? 'bg-blue-900' :
                          color === 'Royal Blue' ? 'bg-blue-600' :
                          color === 'Maroon' ? 'bg-red-900' :
                          color === 'Gold' ? 'bg-yellow-500' :
                          color === 'Grey' ? 'bg-gray-500' :
                          'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => addToCart(selectedItem.id)}
                    disabled={!selectedItem.inStock}
                    className={`flex-1 font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      selectedItem.inStock
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600'
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {selectedItem.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button
                    onClick={() => toggleWishlist(selectedItem.id)}
                    className={`px-6 py-4 rounded-2xl transition-all duration-300 ${
                      wishlist.includes(selectedItem.id)
                        ? 'bg-red-500 text-white'
                        : 'border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                    }`}
                  >
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
