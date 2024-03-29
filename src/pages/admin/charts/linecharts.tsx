import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { UserReducer } from "../../../types/reducer-types";
import { useLineQuery } from "../../../redux/api/dashboardApi";
import toast from "react-hot-toast";
import { CustomError } from "../../../types/api-types";
import { getLastMonths } from "../../../utils/features";
import { Skeleton } from "../../../components/loader";

const {lastTwelveMonths : months} = getLastMonths();


const Linecharts = () => {
  const {user} = useSelector((state : {userReducer:UserReducer}) => state.userReducer);

  const {isLoading,data,error,isError} = useLineQuery(user?._id!);

  
  if(isError){
    toast.error((error as CustomError).data.message);
  }
  const charts = data?.charts!;

  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? <Skeleton /> : (
        <main className="chart-container">
          <h1>Line Charts</h1>
          <section>
            <LineChart
              data={charts.users || []}
              label="Users"
              borderColor="rgb(53, 162, 255)"
              labels={months}
              backgroundColor="rgba(53, 162, 255, 0.5)"
            />
            <h2>Active Users</h2>
          </section>

          <section>
            <LineChart
              data={charts.products||[]}
              backgroundColor={"hsla(269,80%,40%,0.4)"}
              borderColor={"hsl(269,80%,40%)"}
              labels={months}
              label="Products"
            />
            <h2>Total Products (SKU)</h2>
          </section>

          <section>
            <LineChart
              data={charts.revenue || []}
              backgroundColor={"hsla(129,80%,40%,0.4)"}
              borderColor={"hsl(129,80%,40%)"}
              label="Revenue"
              labels={months}
            />
            <h2>Total Revenue </h2>
          </section>

          <section>
            <LineChart
              data={charts.discount || []}
              backgroundColor={"hsla(29,80%,40%,0.4)"}
              borderColor={"hsl(29,80%,40%)"}
              label="Discount"
              labels={months}
            />
            <h2>Discount Allotted </h2>
          </section>
        </main>
      )}
    </div>
  );
};

export default Linecharts;
