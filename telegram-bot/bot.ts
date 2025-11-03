import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";
import { UMKM, UserState } from "./types/botTypes";
import { extractCoordinates } from "./utils/extractCoords";

const TOKEN = "8275854980:AAHxB0MTn9Oli2EQE49cAxDreJF1jVvi0gE"; // ganti api key telegram yang sudah dibuat di bot father
const API_URL = "http://localhost:5000/api/umkm";

const userStates = new Map<number, UserState>();
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("Bot running...");

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  userStates.set(chatId, { step: 1 });

  bot.sendPhoto(chatId, "https://drive.google.com/uc?export=view&id=1i76EhpXvBy1iU_zqXxzo02mCIVP7J5t3", {
    caption: "Selamat datang di BraniMulai UMKM!\nSilakan isi form berikut langkah demi langkah.\n\nContoh pengisian Form BraniMulai UMKM :"
  }).then(() => {
    bot.sendMessage(chatId, "Nama UMKM :");
  });
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text) return;

  const state = userStates.get(chatId);
  if (!state) return;

  try {
    switch (state.step) {
      case 1:
        state.name = text;
        state.step++;
        bot.sendMessage(chatId, "Kategori : Makanan, Minuman, Jasa, Kerajinan");
        break;
      case 2:
        state.category = text;
        state.step++;
        bot.sendMessage(chatId, "Deskripsi :");
        break;
      case 3:
        state.description = text;
        state.step++;
        bot.sendMessage(chatId, "Alamat :");
        break;
      case 4:
        state.address = text;
        state.step++;
        bot.sendMessage(chatId, "Link Google Maps :");
        break;
      case 5:
        state.mapsLink = text;
        const coords = extractCoordinates(state.mapsLink!);
        if (!coords) {
          bot.sendMessage(chatId, "Link Google Maps tidak valid. Masukkan kembali:");
          return;
        }
        state.step++;
        bot.sendMessage(chatId, "URL Foto UMKM :");
        break;
      case 6:
        state.photoUrl = text;
        state.photos = [state.photoUrl];
        state.step++;
        bot.sendMessage(chatId, "Nomor Telepon :");
        break;
      case 7:
        state.phone = text;
        state.step++;
        bot.sendMessage(chatId, "WhatsApp :");
        break;
      case 8:
        state.whatsapp = text;

        const newUMKM: UMKM = {
          name: state.name!,
          category: state.category!,
          description: state.description!,
          address: state.address!,
          coordinates: extractCoordinates(state.mapsLink!)!,
          photos: state.photos!,
          phone: state.phone,
          whatsapp: state.whatsapp,
          mapsLink: state.mapsLink!,
          status: "pending",
          message: "",
        };

        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUMKM),
        });

        const data = (await res.json()) as UMKM | { message: string };

        if (!res.ok) {
          const errMsg = "message" in data ? data.message : res.statusText;
          bot.sendMessage(chatId, `Gagal menambahkan UMKM: ${errMsg}`);
        } else {
          bot.sendMessage(chatId, `✅ UMKM berhasil ditambahkan!\nStatus: pending\nSilakan tunggu persetujuan admin.`);
        }

        userStates.delete(chatId);
        break;
      default:
        bot.sendMessage(chatId, "Perintah tidak dikenali. Gunakan /start untuk memulai.");
        break;
    }
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "Terjadi error. Silakan coba lagi.");
  }

  userStates.set(chatId, state);
});
