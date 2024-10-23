import { Patient } from "../types";

type PatientDetailItemProps = {
  label: string;
  data: Patient[keyof Patient];
};
export default function PatientDetailItem({
  label,
  data,
}: PatientDetailItemProps) {
  return (
    <p className="font-bold mb-3 text-gray-500 uppercase">
      {label}: {""}
      <span className="font-normal normal-case">{data}</span>
    </p>
  );
}
