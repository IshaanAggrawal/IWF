import { Patient } from "../models/Patient.js";

const INITIAL_PATIENTS = [
  {
    slug: "mohammed-salim",
    name: "Mohammed Salim",
    age: 62,
    gender: "Male",
    disease: "Severe Pneumonia & Respiratory Failure",
    diagnosis:
      "A life-threatening infection causing severe inflammation in the lungs. Patient requires continuous oxygen and intensive ICU monitoring.",
    hospital: "Patna Medical College & Hospital (PMCH)",
    hospitalAddress: "Ashok Rajpath, Patna, Bihar - 800004",
    ward: "Medical ICU, Bed 14",
    admissionDate: "2026-06-28",
    condition: "Critical",
    urgent: true,
    neededAmount: 85000,
    raisedAmount: 21000,
    donorsCount: 34,
    costBreakdown: [
      { label: "ICU Charges (10 days)", amount: 35000 },
      { label: "Medicines & Antibiotics", amount: 22000 },
      { label: "Ventilator Support", amount: 18000 },
      { label: "Diagnostic Tests", amount: 10000 },
    ],
    verificationId: "Islah-CLS-2026-001",
    verifiedBy: "Dr. Anjum Ara, Chief Medical Officer, PMCH",
    verificationDate: "2026-06-29",
    status: "Active",
  },
  {
    slug: "shakuntala-devi",
    name: "Shakuntala Devi",
    age: 58,
    gender: "Female",
    disease: "Acute Heart Failure",
    diagnosis:
      "A condition where the heart suddenly cannot pump enough blood to meet the body's needs. Requires immediate medical intervention and cardiac monitoring.",
    hospital: "AIIMS Patna",
    hospitalAddress: "Phulwari Sharif, Patna, Bihar - 801505",
    ward: "Cardiology ICU",
    admissionDate: "2026-06-25",
    condition: "Serious",
    urgent: true,
    neededAmount: 125000,
    raisedAmount: 43500,
    donorsCount: 61,
    costBreakdown: [
      { label: "Cardiac ICU & Monitoring (14 days)", amount: 55000 },
      { label: "Cardiac Medications & Injections", amount: 28000 },
      { label: "Echocardiography & Diagnostic Tests", amount: 20000 },
      { label: "Emergency Procedures", amount: 15000 },
      { label: "Nursing Care & Attendant", amount: 7000 },
    ],
    verificationId: "Islah-CLS-2026-002",
    verifiedBy: "Dr. Rakesh Sharma, Cardiologist, AIIMS Patna",
    verificationDate: "2026-06-26",
    status: "Active",
  },
  {
    slug: "ramesh-kumar",
    name: "Ramesh Kumar",
    age: 47,
    gender: "Male",
    disease: "Liver Cirrhosis with GI Bleed",
    diagnosis:
      "Advanced chronic liver disease with internal bleeding. Requires emergency endoscopic band ligation and blood transfusions.",
    hospital: "IGIMS Patna",
    hospitalAddress: "Sheikhpura, Patna, Bihar - 800014",
    ward: "Gastroenterology ICU",
    admissionDate: "2026-06-30",
    condition: "Critical",
    urgent: true,
    neededAmount: 110000,
    raisedAmount: 31000,
    donorsCount: 44,
    costBreakdown: [
      { label: "Endoscopic Procedures & Banding", amount: 38000 },
      { label: "Blood Transfusions & Albumin", amount: 32000 },
      { label: "ICU Care & Specialist Fees", amount: 25000 },
      { label: "Diagnostic Imaging & Labs", amount: 15000 },
    ],
    verificationId: "Islah-CLS-2026-003",
    verifiedBy: "Dr. Sanjay Gupta, IGIMS Patna",
    verificationDate: "2026-07-01",
    status: "Active",
  },
  {
    slug: "baby-ayesha",
    name: "Baby Ayesha",
    age: 3,
    gender: "Female",
    disease: "Severe Dengue with Thrombocytopenia",
    diagnosis:
      "Severe dengue hemorrhagic fever with dangerously low platelet count. Requires emergency pediatric intensive care and platelet transfusions.",
    hospital: "Nalanda Medical College & Hospital (NMCH)",
    hospitalAddress: "Agam Kuan, Patna, Bihar - 800007",
    ward: "Pediatric ICU, Bed 04",
    admissionDate: "2026-07-03",
    condition: "Critical",
    urgent: true,
    neededAmount: 65000,
    raisedAmount: 27500,
    donorsCount: 52,
    costBreakdown: [
      { label: "PICU Stay & Monitoring (7 days)", amount: 28000 },
      { label: "Platelet Concentrates & Blood Products", amount: 18000 },
      { label: "IV Fluids & Critical Medications", amount: 12000 },
      { label: "Daily CBC & Serology Panels", amount: 7000 },
    ],
    verificationId: "Islah-CLS-2026-004",
    verifiedBy: "Dr. Priyamvada Roy, NMCH Patna",
    verificationDate: "2026-07-04",
    status: "Active",
  },
];

export async function seedInitialPatients(): Promise<void> {
  try {
    const count = await Patient.countDocuments();
    if (count === 0) {
      await Patient.insertMany(INITIAL_PATIENTS);
      console.log(`[Database Seed] Populated ${INITIAL_PATIENTS.length} initial urgent patient cases.`);
    }
  } catch (error) {
    console.error("[Database Seed] Error seeding patients:", error);
  }
}
