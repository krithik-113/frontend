import { useContext, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import EditContext from "../Context API/EditionContext";
import { Link } from "react-router-dom";

const Reports = () => {
  const { user, Details } = useContext(EditContext)
  useEffect(() => {
   Details();
 },[])
    
  
  
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Link to="/admin" style={{textDecoration:"none"}}>
          <button className="btn btn-primary">Back</button>
        </Link>
      </div>
      <div className="charts">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={user}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="firstName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="yearsOfExp"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="salary"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={user}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="firstName" />
          <YAxis />

          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="yearsOfExp"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="salary" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
