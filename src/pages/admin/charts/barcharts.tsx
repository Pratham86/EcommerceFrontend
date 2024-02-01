import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { UserReducer } from "../../../types/reducer-types";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../../components/loader";
import { getLastMonths } from "../../../utils/features";

const {lastSixMonths , lastTwelveMonths} = getLastMonths();

const Barcharts = () => {
  const {user} = useSelector((state : {userReducer:UserReducer}) => state.userReducer);

  const {isLoading,data,error,isError} = useBarQuery(user?._id!);
  
  if(isError){
    toast.error((error as CustomError).data.message);
  }
  const charts = data?.charts!;

  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? <Skeleton /> : (
        <main className="chart-container">
          <h1>Bar Charts</h1>
          <section>
            <BarChart
              data_1={charts.products || []}
              data_2={charts.users || []}
              title_1="Products"
              title_2="Users"
              bgColor_1={`hsl(260, 50%, 30%)`}
              bgColor_2={`hsl(360, 90%, 90%)`}
              labels={lastSixMonths}
            />
            <h2>Top Products & Top Customers</h2>
          </section>

          <section>
            <BarChart
              horizontal={true}
              data_1={charts.orders || []}
              data_2={[]}
              title_1="Orders"
              title_2=""
              bgColor_1={`hsl(180, 40%, 50%)`}
              bgColor_2=""
              labels={lastTwelveMonths}
            />
            <h2>Orders throughout the year</h2>
          </section>
        </main>
      )}
    </div>
  );
};

export default Barcharts;
