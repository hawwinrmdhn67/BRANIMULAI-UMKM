import express from "express";
import umkmRoutes from "./routes/umkmRoutes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/umkm", umkmRoutes);

// Serve API Test Interface at root
app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Test - BRANIMULAI UMKM</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #008236 0%, #00a644 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #008236;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #008236;
        }
        .endpoint {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 4px solid #008236;
        }
        .endpoint-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
        }
        .method {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: bold;
            margin-right: 10px;
        }
        .get { background: #61affe; color: white; }
        .post { background: #49cc90; color: white; }
        .put { background: #fca130; color: white; }
        .delete { background: #f93e3e; color: white; }
        .url {
            font-family: 'Courier New', monospace;
            background: white;
            padding: 8px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 5px;
        }
        button {
            background: #008236;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s;
            margin-top: 10px;
        }
        button:hover {
            background: #00a644;
        }
        .result {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            max-height: 400px;
            overflow-y: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .loading {
            color: #fca130;
        }
        .success {
            color: #49cc90;
        }
        .error {
            color: #f93e3e;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        input[type="number"] {
            padding: 8px;
            margin-top: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 200px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 BRANIMULAI UMKM API Tester</h1>
            <p>Test endpoint API untuk sistem manajemen UMKM</p>
        </div>

        <div class="content">
            <div class="section">
                <h2>📡 Base URL</h2>
                <div class="url" id="baseUrl">http://localhost:${PORT}/api/umkm</div>
                <button onclick="changeBaseUrl()">Ubah Base URL</button>
            </div>

            <div class="section">
                <h2>📊 Statistik API</h2>
                <div class="stats">
                    <div class="stat-card">
                        <div class="stat-value" id="totalUMKM">-</div>
                        <div class="stat-label">Total UMKM</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="pendingUMKM">-</div>
                        <div class="stat-label">Pending</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="approvedUMKM">-</div>
                        <div class="stat-label">Approved</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="rejectedUMKM">-</div>
                        <div class="stat-label">Rejected</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>🔌 Endpoints</h2>

                <div class="endpoint">
                    <div class="endpoint-title">
                        <span class="method get">GET</span>
                        <span>Ambil Semua UMKM</span>
                    </div>
                    <div class="url">/api/umkm</div>
                    <button onclick="testGetAll()">Test</button>
                    <div class="result" id="result-getAll" style="display:none;"></div>
                </div>

                <div class="endpoint">
                    <div class="endpoint-title">
                        <span class="method post">POST</span>
                        <span>Tambah UMKM Baru</span>
                    </div>
                    <div class="url">/api/umkm</div>
                    <button onclick="testAddUMKM()">Test dengan Sample Data</button>
                    <div class="result" id="result-add" style="display:none;"></div>
                </div>

                <div class="endpoint">
                    <div class="endpoint-title">
                        <span class="method put">PUT</span>
                        <span>Approve UMKM</span>
                    </div>
                    <div class="url">/api/umkm/:id/approve</div>
                    <input type="number" id="approveId" placeholder="ID UMKM">
                    <button onclick="testApprove()">Test</button>
                    <div class="result" id="result-approve" style="display:none;"></div>
                </div>

                <div class="endpoint">
                    <div class="endpoint-title">
                        <span class="method put">PUT</span>
                        <span>Reject UMKM</span>
                    </div>
                    <div class="url">/api/umkm/:id/reject</div>
                    <input type="number" id="rejectId" placeholder="ID UMKM">
                    <button onclick="testReject()">Test</button>
                    <div class="result" id="result-reject" style="display:none;"></div>
                </div>

                <div class="endpoint">
                    <div class="endpoint-title">
                        <span class="method delete">DELETE</span>
                        <span>Hapus UMKM</span>
                    </div>
                    <div class="url">/api/umkm/:id</div>
                    <input type="number" id="deleteId" placeholder="ID UMKM">
                    <button onclick="testDelete()">Test</button>
                    <div class="result" id="result-delete" style="display:none;"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let baseUrl = 'http://localhost:${PORT}/api/umkm';

        function changeBaseUrl() {
            const newUrl = prompt('Masukkan Base URL baru:', baseUrl);
            if (newUrl) {
                baseUrl = newUrl;
                document.getElementById('baseUrl').textContent = baseUrl;
            }
        }

        function showResult(elementId, data, type = 'success') {
            const element = document.getElementById(elementId);
            element.style.display = 'block';
            element.className = \`result \${type}\`;
            element.textContent = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
        }

        async function testGetAll() {
            showResult('result-getAll', 'Loading...', 'loading');
            try {
                const response = await fetch(baseUrl);
                const data = await response.json();
                showResult('result-getAll', data, 'success');
                updateStats(data);
            } catch (error) {
                showResult('result-getAll', \`Error: \${error.message}\`, 'error');
            }
        }

        async function testAddUMKM() {
            showResult('result-add', 'Loading...', 'loading');
            const sampleData = {
                name: "Test UMKM " + Date.now(),
                category: "Makanan",
                description: "Ini adalah test UMKM dari API tester",
                address: "Jl. Test No. 123, Jakarta",
                locationLink: "https://www.google.com/maps?q=-6.2088,106.8456",
                photos: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836"],
                phone: "081234567890",
                whatsapp: "6281234567890",
                status: "pending"
            };

            try {
                const response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sampleData)
                });
                const data = await response.json();
                showResult('result-add', data, response.ok ? 'success' : 'error');
                if (response.ok) testGetAll();
            } catch (error) {
                showResult('result-add', \`Error: \${error.message}\`, 'error');
            }
        }

        async function testApprove() {
            const id = document.getElementById('approveId').value;
            if (!id) {
                alert('Masukkan ID UMKM');
                return;
            }
            showResult('result-approve', 'Loading...', 'loading');
            try {
                const response = await fetch(\`\${baseUrl}/\${id}/approve\`, { method: 'PUT' });
                const data = await response.json();
                showResult('result-approve', data, response.ok ? 'success' : 'error');
                if (response.ok) testGetAll();
            } catch (error) {
                showResult('result-approve', \`Error: \${error.message}\`, 'error');
            }
        }

        async function testReject() {
            const id = document.getElementById('rejectId').value;
            if (!id) {
                alert('Masukkan ID UMKM');
                return;
            }
            showResult('result-reject', 'Loading...', 'loading');
            try {
                const response = await fetch(\`\${baseUrl}/\${id}/reject\`, { method: 'PUT' });
                const data = await response.json();
                showResult('result-reject', data, response.ok ? 'success' : 'error');
                if (response.ok) testGetAll();
            } catch (error) {
                showResult('result-reject', \`Error: \${error.message}\`, 'error');
            }
        }

        async function testDelete() {
            const id = document.getElementById('deleteId').value;
            if (!id) {
                alert('Masukkan ID UMKM');
                return;
            }
            if (!confirm(\`Yakin ingin menghapus UMKM dengan ID \${id}?\`)) return;
            
            showResult('result-delete', 'Loading...', 'loading');
            try {
                const response = await fetch(\`\${baseUrl}/\${id}\`, { method: 'DELETE' });
                const data = await response.json();
                showResult('result-delete', data, response.ok ? 'success' : 'error');
                if (response.ok) testGetAll();
            } catch (error) {
                showResult('result-delete', \`Error: \${error.message}\`, 'error');
            }
        }

        function updateStats(data) {
            document.getElementById('totalUMKM').textContent = data.length;
            document.getElementById('pendingUMKM').textContent = data.filter(u => u.status === 'pending').length;
            document.getElementById('approvedUMKM').textContent = data.filter(u => u.status === 'approved').length;
            document.getElementById('rejectedUMKM').textContent = data.filter(u => u.status === 'rejected').length;
        }

        testGetAll();
    </script>
</body>
</html>`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
