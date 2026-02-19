/*
 * @Author: Kapil Chauhan
 * @Problem: 
 * @Started: Do not edit
 * @LastEdited: Do not edit
 */
/*
 * @Author: Kapil Chauhan
 * @Problem: 
 * @Started: Do not edit
 * @LastEdited: Do not edit
 */
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

export default function EmployeesPage() {
  return (
    <>
      <EmployeeForm refresh={() => window.location.reload()} />
      <EmployeeList />
    </>
  );
}
