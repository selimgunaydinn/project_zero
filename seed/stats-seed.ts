
import StatsWidgetData from "@/app/models/Stats";
import mongoose from "mongoose";


const { MONGODB_URI } = process.env;

const data = {
  containerClass: "bg-white pb-12 sm:py-4 sm:pb-24",
  innerContainerClass: "mx-auto max-w-7xl px-6 lg:px-8",
  gridClass: "grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3",
  itemClass: "mx-auto flex max-w-xs flex-col gap-y-4",
  statData: [
    {
      id: 1,
      name: "Transactions every 24 hours",
      value: "44 million",
      nameClass: "text-base/7 text-gray-600",
      valueClass:
        "order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl",
    },
    {
      id: 2,
      name: "Assets under holding",
      value: "$119 trillion",
      nameClass: "text-base/7 text-gray-600",
      valueClass:
        "order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl",
    },
    {
      id: 3,
      name: "New users annually",
      value: "46,000",
      nameClass: "text-base/7 text-gray-600",
      valueClass:
        "order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl",
    },
  ],
};

const seedDatabase = async () => {
  try {
    // MongoDB bağlantısı
    console.log("Başladı");
    await mongoose.connect(MONGODB_URI as string);
    console.log("MongoDB bağlantısı başarılı!");

    // Eski verileri temizleme
    await StatsWidgetData.deleteMany({});
    console.log("Eski Hero verileri temizlendi.");

    // Yeni veriler ekleme
    await StatsWidgetData.create(data);
    console.log("Hero verisi başarıyla eklendi.");

    // Bağlantıyı kapatma
    mongoose.connection.close();
    console.log("MongoDB bağlantısı kapatıldı.");
  } catch (error) {
    console.error("Veritabanı işlemi sırasında bir hata oluştu:", error);
  }
};

// Seed fonksiyonunu çağırma
seedDatabase();
