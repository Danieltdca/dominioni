import { useEffect, useState } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://dominioni.page.gd/get-weather.php");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do tempo:", error);
        setError("Falha ao carregar dados do tempo. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const refreshWeather = () => {
    setWeatherData(null);
    setLoading(true);
    setError(null);
    
    async function fetchWeather() {
      try {
        const response = await fetch("http://localhost:8000/get-weather.php?latitude=-30.0105&longitude=-50.1522");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do tempo:", error);
        setError("Falha ao carregar dados do tempo. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  };

  if (loading) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #e2e8f0"
      }}>
        <div style={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          border: "3px solid #e2e8f0",
          borderTop: "3px solid #3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}></div>
        <p style={{ marginTop: "1rem", color: "#64748b" }}>Carregando previsão do tempo...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: "2rem",
        backgroundColor: "#fef2f2",
        borderRadius: "12px",
        border: "1px solid #fecaca",
        textAlign: "center"
      }}>
        <p style={{ color: "#dc2626", marginBottom: "1rem" }}>❌ {error}</p>
        <button
          onClick={refreshWeather}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#b91c1c"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#dc2626"}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #e2e8f0"
      }}>
        <p style={{ color: "#64748b" }}>Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "2rem",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        borderBottom: "1px solid #e2e8f0",
        paddingBottom: "1rem"
      }}>
        <h2 style={{ 
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#1e293b",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          🌦️ Previsão do Tempo
        </h2>
        <button
          onClick={refreshWeather}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
        >
          🔄 Atualizar
        </button>
      </div>

      {/* Previsão do Tempo */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ 
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          ⏰ Próximas Horas
        </h3>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {weatherData.previsaotempo?.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "1rem",
                backgroundColor: "#f1f5f9",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.2s ease",
                cursor: "pointer"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#e2e8f0";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#f1f5f9";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem"
                }}>
                  🌧️
                </div>
                <strong style={{ fontSize: "1rem", color: "#1e293b" }}>
                  {item.hora}
                </strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ 
                  fontSize: "1.5rem", 
                  fontWeight: "700", 
                  color: "#3b82f6" 
                }}>
                  {item.temperatura}°C
                </span>
                <span style={{ 
                  fontSize: "0.875rem", 
                  color: "#64748b",
                  backgroundColor: "#cbd5e1",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "12px"
                }}>
                  {item.chuva}mm
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movimento Solar */}
      <div>
        <h3 style={{ 
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          🌄 Movimento Solar
        </h3>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {weatherData.movimentoSolar?.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "1rem",
                backgroundColor: "#fef3c7",
                borderRadius: "10px",
                border: "1px solid #fbbf24",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#fde68a";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#fef3c7";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#f59e0b",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    🌅
                  </div>
                  <div>
                    <p style={{ 
                      margin: 0, 
                      fontSize: "0.75rem", 
                      color: "#92400e",
                      fontWeight: "500"
                    }}>
                      Nascer
                    </p>
                    <p style={{ 
                      margin: 0, 
                      fontSize: "1rem", 
                      fontWeight: "600",
                      color: "#1e293b"
                    }}>
                      {item.nasce}
                    </p>
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#f59e0b",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    🌇
                  </div>
                  <div>
                    <p style={{ 
                      margin: 0, 
                      fontSize: "0.75rem", 
                      color: "#92400e",
                      fontWeight: "500"
                    }}>
                      Pôr do sol
                    </p>
                    <p style={{ 
                      margin: 0, 
                      fontSize: "1rem", 
                      fontWeight: "600",
                      color: "#1e293b"
                    }}>
                      {item.por}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;