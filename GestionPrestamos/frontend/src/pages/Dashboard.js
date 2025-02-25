import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { authData, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  /*const [loans, setLoans] = useState([]);
  const [payments, setPayments] = useState([]);*/

  useEffect(() => {
    console.log("Usuario en Dashboard:", authData); // Debería ser authData, no user
    if (!authData) {
      navigate("/login");
    }
  }, [authData, navigate]);
  
  

  return (
    <div>
     <h2>Bienvenido, {authData?.usuario?.nombre || "Usuario"}</h2>

      <div>
        <h3>Solicitar Préstamo</h3>
        {/* Formulario para solicitar préstamo */}
      </div>
      <div>
        <h3>Mis Préstamos</h3>
        {/* Lista de préstamos */}
      </div>
      <div>
        <h3>Mis Pagos</h3>
        {/* Lista de pagos */}
      </div>
      <button onClick={() => { logout(); navigate("/login"); }}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
