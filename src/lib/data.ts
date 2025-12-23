import type { Product, ProductScores, Review, Questionnaire, Sector } from "./types";
import { PlaceHolderImages } from "./placeholder-images";

const getImageUrl = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';
const getImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || '';

export const products: Product[] = [
  // Smartphones
  {
    id: "pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    sector: "smartphones",
    imageUrl: getImageUrl("pixel-8-pro"),
    imageHint: getImageHint("pixel-8-pro"),
    price: 999,
    goodFor: ["Photography enthusiasts", "Users wanting clean Android", "AI feature lovers"],
    notGoodFor: ["Hardcore gamers", "Users needing 5+ years of updates", "Price-conscious buyers"],
    commonRegrets: ["Battery life could be better under heavy use", "Video recording still lags behind iPhone"],
    specs: { "Display": "6.7\" Super Actua", "Processor": "Google Tensor G3", "RAM": "12GB", "Storage": "128GB/256GB/512GB/1TB" },
    tags: ["camera", "general", "battery"],
    alternatives: ["iphone-15-pro", "samsung-s24-ultra"],
  },
  {
    id: "iphone-15-pro",
    name: "Apple iPhone 15 Pro",
    brand: "Apple",
    sector: "smartphones",
    imageUrl: getImageUrl("iphone-15-pro"),
    imageHint: getImageHint("iphone-15-pro"),
    price: 999,
    goodFor: ["Users in the Apple ecosystem", "Content creators (video)", "Those who value long-term support"],
    notGoodFor: ["Users who like customization", "Budget-conscious buyers", "People who hate dongles (USB-C)"],
    commonRegrets: ["High price for minimal upgrades", "Action button is less useful than hoped"],
    specs: { "Display": "6.1\" Super Retina XDR", "Processor": "A17 Pro", "RAM": "8GB", "Storage": "128GB/256GB/512GB/1TB" },
    tags: ["camera", "gaming", "general"],
    alternatives: ["pixel-8-pro", "samsung-s24-ultra"],
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    sector: "smartphones",
    imageUrl: getImageUrl("samsung-s24-ultra"),
    imageHint: getImageHint("samsung-s24-ultra"),
    price: 1299,
    goodFor: ["Power users who want every feature", "Note-takers (S Pen)", "Users wanting the best zoom camera"],
    notGoodFor: ["Users who prefer small phones", "Those wanting a clean Android experience", "People on a tight budget"],
    commonRegrets: ["So many features it can be overwhelming", "Flat screen is a pro for some, con for others"],
    specs: { "Display": "6.8\" Dynamic AMOLED 2X", "Processor": "Snapdragon 8 Gen 3 for Galaxy", "RAM": "12GB", "Storage": "256GB/512GB/1TB" },
    tags: ["camera", "gaming", "battery", "display"],
    upcomingModel: true,
    alternatives: ["pixel-8-pro", "iphone-15-pro"],
  },
  {
    id: "grand-phone-g1",
    name: "GrandPhone G1",
    brand: "GrandPhone",
    sector: "smartphones",
    imageUrl: getImageUrl("grand-phone-g1"),
    imageHint: getImageHint("grand-phone-g1"),
    price: 199,
    goodFor: ["Senior citizens", "Users needing a simple interface", "Loud speaker for calls"],
    notGoodFor: ["Gamers", "Photographers", "Social media addicts"],
    commonRegrets: ["Slow performance for anything but basic tasks", "Camera is very basic"],
    specs: { "Display": "6.5\" Large Icon Display", "Processor": "Basic Quad-Core", "RAM": "4GB", "Storage": "64GB" },
    tags: ["elderly", "loud_speaker", "battery"],
    alternatives: [],
  },
  // Earphones
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    sector: "earphones",
    imageUrl: getImageUrl("sony-wh1000xm5"),
    imageHint: getImageHint("sony-wh1000xm5"),
    price: 399,
    goodFor: ["Frequent travelers", "Office workers needing focus", "Audiophiles who appreciate detail"],
    notGoodFor: ["Gym users (not sweatproof)", "Users on a budget", "Those who prefer a foldable design"],
    commonRegrets: ["Doesn't fold like previous models", "Can get warm on the ears after hours"],
    specs: { "Type": "Over-ear", "Noise Cancelling": "Industry Leading", "Battery Life": "30 hours" },
    tags: ["travel", "music", "calls"],
    alternatives: ["bose-qc-ultra"],
  },
  {
    id: "bose-qc-ultra",
    name: "Bose QC Ultra Headphones",
    brand: "Bose",
    sector: "earphones",
    imageUrl: getImageUrl("bose-qc-ultra"),
    imageHint: getImageHint("bose-qc-ultra"),
    price: 429,
    goodFor: ["Users prioritizing comfort", "Frequent flyers", "Those needing top-tier noise cancellation"],
    notGoodFor: ["Price-sensitive buyers", "Users who need the longest battery life", "Gym use"],
    commonRegrets: ["Higher price than competitors", "Sound quality good but not as 'fun' as Sony's"],
    specs: { "Type": "Over-ear", "Noise Cancelling": "World Class", "Battery Life": "24 hours" },
    tags: ["travel", "music", "comfort", "calls"],
    alternatives: ["sony-wh1000xm5"],
  },
  {
    id: "jabra-elite-8-active",
    name: "Jabra Elite 8 Active",
    brand: "Jabra",
    sector: "earphones",
    imageUrl: getImageUrl("jabra-elite-8-active"),
    imageHint: getImageHint("jabra-elite-8-active"),
    price: 199,
    goodFor: ["Athletes and gym-goers", "Users needing extreme durability", "Outdoor runners"],
    notGoodFor: ["Critical music listeners", "Users with very sensitive ears", "Those wanting the best possible ANC"],
    commonRegrets: ["ANC is good but not top-tier", "Fit can be too snug for some"],
    specs: { "Type": "In-ear", "Durability": "IP68 rated", "Battery Life": "8 hours + 24 in case" },
    tags: ["gym", "calls"],
    alternatives: [],
  },
  // Laptops
  {
    id: "macbook-air-m3",
    name: "MacBook Air 13\" (M3)",
    brand: "Apple",
    sector: "laptops",
    imageUrl: getImageUrl("macbook-air-m3"),
    imageHint: getImageHint("macbook-air-m3"),
    price: 1099,
    goodFor: ["Students", "General office work", "Users who value portability and battery life"],
    notGoodFor: ["Gamers", "Users needing lots of ports", "Heavy video editors or 3D artists"],
    commonRegrets: ["Base model's 8GB RAM feels limited", "Only two Thunderbolt ports"],
    specs: { "CPU": "Apple M3", "RAM": "8GB/16GB/24GB", "Storage": "256GB-2TB SSD", "Screen": "13.6\" Liquid Retina" },
    tags: ["student", "office", "portability", "battery"],
    alternatives: ["dell-xps-15", "lenovo-thinkpad-x1"],
  },
  {
    id: "lenovo-thinkpad-x1",
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    sector: "laptops",
    imageUrl: getImageUrl("lenovo-thinkpad-x1"),
    imageHint: getImageHint("lenovo-thinkpad-x1"),
    price: 1499,
    goodFor: ["Business professionals", "Writers and programmers", "Road warriors needing durability"],
    notGoodFor: ["Gamers", "Creative professionals needing color accuracy", "Budget buyers"],
    commonRegrets: ["Can get pricey with upgrades", "Speakers are just average"],
    specs: { "CPU": "Intel Core Ultra", "RAM": "16GB/32GB", "Storage": "512GB-2TB SSD", "Screen": "14\" IPS or OLED" },
    tags: ["coding", "office", "portability", "battery"],
    alternatives: ["macbook-air-m3", "dell-xps-15"],
  },
  {
    id: "asus-rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14",
    brand: "ASUS",
    sector: "laptops",
    imageUrl: getImageUrl("asus-rog-zephyrus-g14"),
    imageHint: getImageHint("asus-rog-zephyrus-g14"),
    price: 1599,
    goodFor: ["Gamers wanting portability", "Content creators", "Users wanting a powerful all-rounder"],
    notGoodFor: ["Users needing all-day battery life", "Those who want a quiet machine", "Business users needing enterprise features"],
    commonRegrets: ["Gets hot and loud under load", "Battery life when gaming is very short"],
    specs: { "CPU": "AMD Ryzen 9", "GPU": "NVIDIA GeForce RTX 40-series", "RAM": "16GB/32GB", "Screen": "14\" ROG Nebula Display" },
    tags: ["gaming", "content_creation", "performance"],
    alternatives: [],
  },
];

export const productScores: ProductScores[] = [
  { productId: "pixel-8-pro", comfort: 8, reliability: 9, repurchaseIntent: 85, longevity: 3.5 },
  { productId: "iphone-15-pro", comfort: 8, reliability: 10, repurchaseIntent: 92, longevity: 5 },
  { productId: "samsung-s24-ultra", comfort: 9, reliability: 9, repurchaseIntent: 90, longevity: 4 },
  { productId: "grand-phone-g1", comfort: 9, reliability: 8, repurchaseIntent: 70, longevity: 4 },
  { productId: "sony-wh1000xm5", comfort: 9, reliability: 9, repurchaseIntent: 90, longevity: 4 },
  { productId: "bose-qc-ultra", comfort: 10, reliability: 9, repurchaseIntent: 91, longevity: 4 },
  { productId: "jabra-elite-8-active", comfort: 7, reliability: 10, repurchaseIntent: 88, longevity: 3 },
  { productId: "macbook-air-m3", comfort: 9, reliability: 10, repurchaseIntent: 95, longevity: 6 },
  { productId: "lenovo-thinkpad-x1", comfort: 9, reliability: 10, repurchaseIntent: 93, longevity: 5 },
  { productId: "asus-rog-zephyrus-g14", comfort: 7, reliability: 8, repurchaseIntent: 85, longevity: 4 },
];

export const reviews: Review[] = [
  {
    id: "r1", productId: "pixel-8-pro", author: "User123", scenario: "Photography", durationOfUse: 6, comfortRating: 8, text: "The camera is absolutely stunning for a phone. Point and shoot photos are incredible.", upvotes: 15, isFlagged: false, isApproved: true, createdAt: new Date().toISOString()
  },
  {
    id: "r2", productId: "pixel-8-pro", author: "User456", scenario: "General Use", durationOfUse: 3, comfortRating: 7, text: "Good phone, but battery dies faster than I'd like. The AI features are cool but sometimes feel like gimmicks.", upvotes: 5, isFlagged: false, isApproved: true, createdAt: new Date().toISOString()
  },
  {
    id: "r3", productId: "sony-wh1000xm5", author: "User789", scenario: "Travel", durationOfUse: 12, comfortRating: 9, text: "A must-have for anyone who flies a lot. The noise cancellation is magical. Blocks out engine noise completely.", upvotes: 22, isFlagged: false, isApproved: true, createdAt: new Date().toISOString()
  },
  {
    id: "r4", productId: "macbook-air-m3", author: "UserABC", scenario: "Student", durationOfUse: 4, comfortRating: 10, text: "Perfect for college. It's so light I forget it's in my bag, and the battery lasts through all my classes and then some. The keyboard is great for typing long essays.", upvotes: 18, isFlagged: false, isApproved: true, createdAt: new Date().toISOString()
  },
  {
    id: "r5", productId: "lenovo-thinkpad-x1", author: "DevDude", scenario: "Programming", durationOfUse: 24, comfortRating: 10, text: "Best keyboard on a laptop, period. I can code for 10 hours straight without any fatigue. It's durable and handles all my dev environments with ease.", upvotes: 30, isFlagged: false, isApproved: true, createdAt: new Date().toISOString()
  },
  {
    id: "r6",
    productId: "jabra-elite-8-active",
    author: "GymRat",
    scenario: "Gym/Running",
    durationOfUse: 2,
    comfortRating: 8,
    text: "These things DO NOT fall out. I've used them for HIIT, long runs, everything. They stay put. Sound is good enough for a workout.",
    upvotes: 12,
    isFlagged: false,
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
   {
    id: "r7",
    productId: "bose-qc-ultra",
    author: "FakeReviewer",
    scenario: "Music",
    durationOfUse: 1,
    comfortRating: 10,
    text: "BUY THIS NOW! BEST HEADPHONES EVER MADE! CHANGED MY LIFE! 10/10 WOULD RECOMMEND TO EVERYONE! FLAWLESS PRODUCT!",
    upvotes: 0,
    isFlagged: true,
    isApproved: false,
    flagReason: "The review exhibits overly positive sentiment and lacks specific details, which is a common pattern in fake reviews.",
    createdAt: new Date().toISOString(),
  }
];

export const questionnaires: Questionnaire[] = [
  {
    sector: "smartphones",
    questions: [
      { id: "primaryUse", text: "What's your primary use for the phone?", type: "radio", options: [
        { label: "Photography", value: "camera" },
        { label: "Gaming", value: "gaming" },
        { label: "Work/Online Classes", value: "online_classes" },
        { label: "Long Battery Life", value: "battery" },
        { label: "Just the basics", value: "general" },
        { label: "For an elderly person", value: "elderly" },
        { label: "For a child", value: "child" },
      ]},
      { id: "dailyUsage", text: "How many hours a day will you use it?", type: 'slider', min: 1, max: 12, step: 1, defaultValue: 4, labels: {min: "Light use", max: "Heavy use"} },
      { id: "priority", text: "What's more important?", type: "radio", options: [
        { label: "Comfort & Ease of Use", value: "comfort" },
        { label: "Top Performance", value: "performance" },
      ]},
      { id: "budget", text: "What's your budget?", type: 'slider', min: 200, max: 1500, step: 100, defaultValue: 800, labels: {min: "$200", max: "$1500+"} },
      { id: "mustHave", text: "Any must-haves?", type: "radio", options: [
          { label: "Loud Speaker", value: "loud_speaker" },
          { label: "Big Display", value: "display" },
          { label: "Doesn't matter", value: "none" },
      ]},
    ],
  },
  {
    sector: "earphones",
    questions: [
      { id: "usage", text: "Where will you use them most?", type: "radio", options: [
          { label: "At the gym / running", value: "gym" },
          { label: "For work calls", value: "calls" },
          { label: "Travel / Commuting", value: "travel" },
          { label: "For an elderly person", value: "elderly" },
          { label: "For a child", value: "child" },
          { label: "Just for music", value: "music" },
      ]},
      { id: "sensitivity", text: "Do your ears get sore from earbuds easily?", type: "radio", options: [
        { label: "Yes, comfort is key", value: "yes" },
        { label: "No, I'm fine", value: "no" },
      ]},
      { id: "fit", text: "What's your preferred fit?", type: "radio", options: [
        { label: "In-ear (buds)", value: "in-ear" },
        { label: "Over-ear (headphones)", value: "over-ear" },
        { label: "Neckband", value: "neckband" },
        { label: "Doesn't matter", value: "any" },
      ]},
      { id: "dailyUsage", text: "How long will you wear them daily?", type: 'slider', min: 1, max: 10, step: 1, defaultValue: 3, labels: {min: "1 hour", max: "10+ hours"} },
      { id: "budget", text: "What's your budget?", type: 'slider', min: 50, max: 500, step: 25, defaultValue: 150, labels: {min: "$50", max: "$500+"} },
    ],
  },
  {
    sector: "laptops",
    questions: [
      { id: "usage", text: "What will be its main job?", type: "radio", options: [
          { label: "Student work (notes, research)", value: "student" },
          { label: "Coding / Development", value: "coding" },
          { label: "Office (PPT, Excel)", value: "office" },
          { label: "Gaming", value: "gaming" },
          { label: "Content Creation (Video/Photo)", value: "content_creation" },
          { label: "For an elderly person (web, email)", value: "elderly" },
      ]},
      { id: "portability", text: "Portability vs. Performance?", type: 'slider', min: 1, max: 5, defaultValue: 3, labels: {min: "Carry it all day", max: "Desktop replacement"}},
      { id: "battery", text: "How critical is all-day battery life?", type: "radio", options: [
        { label: "Absolutely essential", value: "critical" },
        { label: "Nice to have", value: "nice" },
        { label: "I'm usually near a plug", value: "not_critical" },
      ]},
      { id: "budget", text: "What's your budget?", type: 'slider', min: 400, max: 2500, step: 100, defaultValue: 1200, labels: {min: "$400", max: "$2500+"} },
    ],
  },
];

// Mock database access functions
export const getProductsBySector = (sector: Sector): Product[] => {
  return products.filter(p => p.sector === sector);
}

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
}

export const getScoresByProductId = (id: string): ProductScores | undefined => {
  return productScores.find(s => s.productId === id);
}

export const getReviewsByProductId = (id: string): Review[] => {
  return reviews.filter(r => r.productId === id && r.isApproved).sort((a, b) => b.upvotes - a.upvotes);
}

export const getQuestionnaireBySector = (sector: Sector): Questionnaire | undefined => {
  return questionnaires.find(q => q.sector === sector);
}

export const getAllFlaggedReviews = (): Review[] => {
    return reviews.filter(r => r.isFlagged && !r.isApproved);
}

// In a real app, these would update a database
export const addReview = (review: Omit<Review, 'id' | 'createdAt' | 'upvotes'>) => {
    const newReview: Review = {
        ...review,
        id: `r${reviews.length + 1}`,
        createdAt: new Date().toISOString(),
        upvotes: 0,
    };
    reviews.push(newReview);
    console.log("New review added (mock):", newReview);
    return newReview;
}

export const approveReview = (id: string) => {
    const review = reviews.find(r => r.id === id);
    if (review) {
        review.isApproved = true;
        console.log("Review approved (mock):", id);
        return true;
    }
    return false;
}

export const rejectReview = (id: string) => {
    const index = reviews.findIndex(r => r.id === id);
    if (index > -1) {
        reviews.splice(index, 1);
        console.log("Review rejected and deleted (mock):", id);
        return true;
    }
    return false;
}
