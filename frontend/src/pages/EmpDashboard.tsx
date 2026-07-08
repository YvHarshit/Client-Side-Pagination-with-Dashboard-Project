
const EmpDashboard = () => {
  return (
    <div>
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-3xl text-green-700"> Employee Dashboard</h2>
            <div className="flex gap-3">

                <div className="w-max"> Emp Id </div>
                <div className="w-max"> Name</div>
                <div className="w-max"> Department </div>
                <div className="w-max"> Salary </div>

            </div>
        </div>
    </div>
  )
}

export default EmpDashboard ;

