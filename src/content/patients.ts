import patient1Img from "@/assets/patient-1.jpg";
import patient2Img from "@/assets/patient-2.jpg";
import patient3Img from "@/assets/patient-3.jpg";
import patient4Img from "@/assets/patient-4.jpg";

export type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  disease: string;
  hospital: string;
  urgent: boolean;
  image: string;
};

export const URGENT_PATIENTS: Patient[] = [
  {
    id: 1,
    name: "Mohammed Salim",
    age: 62,
    gender: "Male",
    disease: "Severe Pneumonia with Respiratory Failure",
    hospital: "Patna Medical College & Hospital, Patna, Bihar",
    urgent: true,
    image: patient1Img,
  },
  {
    id: 2,
    name: "Shakuntala Devi",
    age: 58,
    gender: "Female",
    disease: "Acute Heart Failure",
    hospital: "AIIMS Patna, Phulwari Sharif, Patna, Bihar",
    urgent: true,
    image: patient2Img,
  },
  {
    id: 3,
    name: "Ramesh Kumar",
    age: 47,
    gender: "Male",
    disease: "Liver Cirrhosis with GI Bleed",
    hospital: "Paras HMRI Hospital, Patna, Bihar",
    urgent: true,
    image: patient3Img,
  },
  {
    id: 4,
    name: "Abdul Rahman",
    age: 66,
    gender: "Male",
    disease: "Kidney Failure",
    hospital: "Medanta Hospital, Patna, Bihar",
    urgent: true,
    image: patient4Img,
  },
];
