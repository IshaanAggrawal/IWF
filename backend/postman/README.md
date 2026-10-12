# ISLAH Backend API — Postman Collection

This directory contains the ready-to-import Postman Collection and Environment files for the **ISLAH (Islah Welfare Foundation)** backend API.

## 📁 Files Included

1. **[`ISLAH_API.postman_collection.json`](file:///c:/Users/ishaa/iwf/backend/postman/ISLAH_API.postman_collection.json)**
   * Postman Collection v2.1.0 specification.
   * Categorized into 7 folders:
     * `Health Check` (`GET /api/health`)
     * `Donations & 80G Receipts` (`POST /api/donations`, `GET /api/donations`, `GET /api/donations/:receiptNo`)
     * `Memberships` (`POST /api/members`, `GET /api/members/status/:memberNo`, `GET /api/members`)
     * `Patients (Emergency Medical Cases)` (`GET /api/patients`, `GET /api/patients/:slug`, `POST /api/patients`)
     * `Document Verification Centre` (`GET /api/verify/:documentNo`)
     * `Applications (Get Involved)` (`POST /api/applications`, `GET /api/applications`)
     * `Contact & Quick Messages` (`POST /api/contact`)
   * Pre-configured JSON request bodies matching all Zod and Mongoose validation requirements.

2. **[`ISLAH_Local.postman_environment.json`](file:///c:/Users/ishaa/iwf/backend/postman/ISLAH_Local.postman_environment.json)**
   * Pre-configured environment variable:
     * `baseUrl`: `http://localhost:5000/api`

---

## 🚀 How to Import into Postman

1. Open Postman.
2. Click the **Import** button (top-left).
3. Drag & drop or browse both files:
   * `backend/postman/ISLAH_API.postman_collection.json`
   * `backend/postman/ISLAH_Local.postman_environment.json`
4. In the top right corner of Postman, select the environment: **ISLAH Local Environment**.
5. Start testing your endpoints against `http://localhost:5000`!

---

## 🔄 How We Keep It Updated

Whenever a new model, route, or controller is added or modified in `backend/src/routes/` and `backend/src/controllers/`, this collection file will be updated simultaneously so your API testing workspace is always in sync.
