import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DraftPatient, Patient } from "../types";

export type PatientsState = {
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
};

function createPatient(patient: DraftPatient): Patient {
  return { ...patient, id: uuidv4() };
}

export const usePatientStore = create<PatientsState>()(
  devtools(
    persist(
      function (set) {
        return {
          patients: [],
          activeId: "",
          addPatient: function (data) {
            console.log(data);
            set(function (state) {
              return {
                patients: [...state.patients, createPatient(data)],
              };
            });
          },
          deletePatient: function (id: Patient["id"]) {
            console.log(`deleting... ${id}`);
            set(function (state) {
              return {
                patients: state.patients.filter((patient) => patient.id !== id),
              };
            });
          },
          getPatientById: function (id: Patient["id"]): void {
            set(function () {
              return {
                activeId: id,
              };
            });
          },
          updatePatient: function (data) {
            set(function (state) {
              return {
                patients: state.patients.map((patient) => {
                  if (patient.id === state.activeId) {
                    return { ...data, id: patient.id };
                  }
                  return patient;
                }),
                activeId: "",
              };
            });
          },
        };
      },
      {
        name: "patient-storage",
        // storage: createJSONStorage(() => localStorage),
        // storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
