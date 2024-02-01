import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { useSelector } from "react-redux";
import { UserReducer } from "../../../types/reducer-types";
import { usePieQuery } from "../../../redux/api/dashboardApi";
import toast from "react-hot-toast";
import { CustomError } from "../../../types/api-types";
import { Skeleton } from "../../../components/loader";

const PieCharts = () => {

  const {user} = useSelector((state : {userReducer:UserReducer}) => state.userReducer);

  const {isLoading,data,error,isError} = usePieQuery(user?._id!);
  
  if(isError){
    toast.error((error as CustomError).data.message);
  }
  const charts = data?.charts!;

  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? <Skeleton /> : (
        <main className="chart-container">
          <h1>Pie & Doughnut Charts</h1>
          <section>
            <div>
              <PieChart
                labels={["Processing", "Shipped", "Delivered"]}
                data={[charts.orderRatio.processing, charts.orderRatio.shipped, charts.orderRatio.delivered]}
                backgroundColor={[
                  `hsl(110,80%, 80%)`,
                  `hsl(110,80%, 50%)`,
                  `hsl(110,40%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
            <h2>Order Fulfillment Ratio</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={charts?.productCategories.map((i) => Object.keys(i)[0])}
                data={charts?.productCategories.map((i) => Object.values(i)[0])}
                backgroundColor={charts.productCategories.map(
                  (i) => {
                    const value = Object.values(i)[0]
                    return (`hsl(${value * Math.floor(Math.random()*100) * 4}, ${value}%, 50%)`)
                  }
                )}
                legends={false}
                offset={[0, 0, 0, 80]}
              />
            </div>
            <h2>Product Categories Ratio(In %)</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={["In Stock", "Out Of Stock"]}
                data={[charts.stockAvailability.inStock, charts.stockAvailability.outOfStock]}
                backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                legends={false}
                offset={[0, 80]}
                cutout={"70%"}
              />
            </div>
            <h2> Stock Availability</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={[
                  "Marketing Cost",
                  "Discount",
                  "Burnt",
                  "Production Cost",
                  "Net Margin",
                ]}
                data={[charts.revenueDist.marketingCost, charts.revenueDist.discount, charts.revenueDist.burnt, charts.revenueDist.productionCost, charts.revenueDist.netMargin]}
                backgroundColor={[
                  "hsl(110,80%,40%)",
                  "hsl(19,80%,40%)",
                  "hsl(69,80%,40%)",
                  "hsl(300,80%,40%)",
                  "rgb(53, 162, 255)",
                ]}
                legends={false}
                offset={[20, 30, 20, 30, 80]}
              />
            </div>
            <h2>Revenue Distribution</h2>
          </section>

          <section>
            <div>
              <PieChart
                labels={[
                  "Teenager(Below 20)",
                  "Adult (20-40)",
                  "Older (above 40)",
                ]}
                data={[charts.userAge.teen, charts.userAge.adult, charts.userAge.old]}
                backgroundColor={[
                  `hsl(10, ${80}%, 80%)`,
                  `hsl(10, ${80}%, 50%)`,
                  `hsl(10, ${40}%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
            <h2>Users Age Group</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={["Admin", "Customers"]}
                data={[charts.adminCust.admin,charts.adminCust.customers]}
                backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                offset={[0, 50]}
              />
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default PieCharts;
