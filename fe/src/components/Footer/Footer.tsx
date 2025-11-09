export function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="text-gray-700">
          <h3 className="font-semibold text-lg">Kontak</h3>
          <p className="text-sm">Email: <a className="text-primary underline" href="mailto:info@branimulai.example">info@branimulai.example</a></p>
          <p className="text-sm">Tel: 0812-3456-7890</p>
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-lg">Daftarkan UMKM Anda</h3>
          <p className="text-sm text-gray-600 mb-2">Daftarkan sekarang lewat Telegram untuk proses cepat.</p>

          <a
            href="http://t.me/branimulai_bot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi via Telegram"
            className="inline-flex items-center gap-2 bg-white border rounded px-3 py-2 hover:bg-blue-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-blue-500"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22.5 2.2c-.3-.2-.7-.2-1 .1L2.3 12.1c-.6.3-.6 1.2.1 1.5l4 1.6 1.8 5.7c.2.6 1 .8 1.4.4l3.1-2.9 4.7 3.5c.5.3 1.3.1 1.6-.5.2-.3.3-.6.2-.9L23 3.2c0-.4-.1-.7-.4-1zM9.7 15.6l-.9-3.1 8-6.1-7.1 9.2z" />
            </svg>
            <span className="text-sm text-gray-800 ">Hubungi via Telegram</span>
          </a>
        </div>

        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} BraniMULAI
        </div>
      </div>
    </footer>
  );
}