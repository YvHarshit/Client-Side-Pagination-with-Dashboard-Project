import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { leaveSchema, type LeaveFormData } from "../utils/zodValidation"
import { createLeave } from "../services/leaveServices"
import { LEAVE_TYPE } from "../utils/constants"

const ApplyLeave = () => {

    const {register,handleSubmit,reset,formState: { errors }} = useForm<LeaveFormData>({
        resolver: zodResolver(leaveSchema) });

    const onSubmit = async (data: LeaveFormData) => {
        if (new Date(data.toDate) < new Date(data.fromDate)) {
        toast.error("To Date cannot be earlier than From Date");
        return;
      }

        try {
            const response = await createLeave(data);
            toast.success(response.message);
            reset();
        }
        catch (error) {
            toast.error("Unable to submit leave");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 flex justify-center pt-10 font-serif ">
            <div className="bg-[#232f20] h-full w-full max-w-xl rounded-lg p-8 mt-6 border-3 border-lime-700">
                <h2 className="text-3xl text-lime-400 mb-8">   Apply Leave  </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block mb-2">  Leave Type  </label>
                        <select {...register("leaveType")} className="w-full p-3 rounded bg-[#161915] border border-[#3a5035]">
                            <option value=""> Select Leave </option>
                            {Object.values(LEAVE_TYPE).map(type => (
                                <option key={type} value={type}                                >
                                    {type}
                                </option>
                            ))}
                        </select>

                        <p className="text-red-500 text-sm">  {errors.leaveType?.message}   </p>
                    </div>
                 <div>

                        <label className="block mb-2"> Reason  </label>

                        <textarea rows={4}  {...register("reason")}
                            className="w-full rounded p-3 bg-[#161915] border border-[#3a5035] border border-[#3a5035]" />
                        <p className="text-red-500 text-sm">   {errors.reason?.message}  </p>
                    </div>

                    <div>
                        <label> From Date  </label>

                        <input  type="date" {...register("fromDate")}
                            className="w-full rounded p-3 bg-[#161915] border border-[#3a5035]" />
                        <p className="text-red-500 text-sm"> {errors.fromDate?.message}  </p>
                    </div>

                    <div>
                        <label>  To Date  </label>
                        <input  type="date"  {...register("toDate")} 
                        className="w-full rounded p-3 bg-[#161915] border border-[#3a5035]"/>
                        <p className="text-red-500 text-sm">  {errors.toDate?.message}  </p>
                    </div>
                    <button className="bg-lime-500 text-black px-8 py-3 rounded hover:scale-105 transition " > Submit Request </button>
                </form>
            </div>
        </div>
    );

};

export default ApplyLeave;