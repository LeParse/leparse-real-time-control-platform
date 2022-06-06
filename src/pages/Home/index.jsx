import { useState, useEffect } from "react";
import api from "../../services/api";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useAuth } from "../../contexts/auth";

import { Container } from "./styles";

const Home = () => {
  const { verifyUser } = useAuth();
  const [clients, setClients] = useState([]);

  async function getData() {
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }

    function formatDate(date) {
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/");
    }

    let { data: clientsData } = await api.get("/web-relatorios/clients");

    clientsData = clientsData.map((a) => {
      return {
        ...a,
        createdAt: formatDate(new Date(a.createdAt)),
      };
    });

    let groups = [];

    clientsData.map((c) => {
      groups.indexOf(c.createdAt) === -1 && groups.push(c.createdAt);
    });

    groups = groups.map((g) => {
      return {
        date: g,
        Users: 0,
      };
    });

    clientsData.map((c) => {
      let index = groups.findIndex((g) => g.date === c.createdAt);
      groups[index].Users += 1;
    });

    setClients(groups);
  }

  useEffect(() => {
    verifyUser();
    getData();
  }, []);

  return (
    <Container>
      <div className="content">
        <LineChart width={window.innerWidth / 2} height={300} data={clients}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            angle={-32.5}
            fontSize={"0.8rem"}
            fontWeight={"bold"}
          />
          <YAxis allowDecimals={false} dataKey="Users" />
          <Line
            type="linear"
            dataKey="Users"
            stroke="#00710d"
            activeDot={{ r: 8 }}
          />
          <Tooltip />
        </LineChart>
      </div>
    </Container>
  );
};

export default Home;
