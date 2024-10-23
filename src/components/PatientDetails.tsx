import { usePatientStore } from "../store/store";
import { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";
import { toast } from "react-toastify";

type PatientDetailsProps = {
  patient: Patient;
};
export default function PatientDetails({ patient }: PatientDetailsProps) {
  //   const deletePatient = usePatientStore((state) => state.deletePatient);
  const { getPatientById, deletePatient } = usePatientStore();
  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem data={patient.id} label={"ID"} />
      <PatientDetailItem data={patient.name} label={"Nombre"} />
      <PatientDetailItem data={patient.caretaker} label={"Propietario"} />
      <PatientDetailItem data={patient.email} label={"Email"} />
      <PatientDetailItem data={patient.date} label={"Fecha Alta"} />
      <PatientDetailItem data={patient.symptoms} label={"Síntomas"} />
      <div className="flex flex-col lg:flex-row gap-y-2 justify-between mt-10 ">
        <button
          onClick={() => {
            getPatientById(patient.id);
          }}
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
        >
          Editar
        </button>
        <button
          onClick={() => {
            deletePatient(patient.id);
            toast.error("Paciente eliminado correctamente", {
              position: "top-center",
            });
          }}
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
