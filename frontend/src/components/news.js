import { useEffect, useState } from "react";

function News() {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://scheming-swimmable-playing.ngrok-free.dev/dominioni/backend/get-news.php");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle potential error response from PHP
      if (data.error) {
        throw new Error(data.error);
      }
      
      setNewsData(data);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      setError(error.message || "Falha ao carregar notícias. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = () => {
    setNewsData(null);
    fetchNews();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Data inválida';
    }
  };

  const getSourceName = (source) => {
    if (!source) return 'Fonte não disponível';
    if (typeof source === 'object' && source.name) {
      return source.name;
    }
    return typeof source === 'string' ? source : 'Fonte não disponível';
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
        <p style={{ marginTop: "1rem", color: "#64748b" }}>Carregando notícias...</p>
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
          onClick={refreshNews}
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

  if (!newsData || newsData.length === 0) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #e2e8f0"
      }}>
        <p style={{ color: "#64748b" }}>Nenhuma notícia disponível</p>
        <button
          onClick={refreshNews}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem",
            marginTop: "1rem"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
        >
          Tentar Carregar
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "2rem",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      maxWidth: "900px",
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
        <div>
          <h2 style={{ 
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1e293b",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.25rem"
          }}>
            📰 Últimas Notícias
          </h2>
          <p style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "#64748b"
          }}>
            Trump • Impostos • {newsData.length} {newsData.length === 1 ? 'notícia' : 'notícias'}
          </p>
        </div>
        <button
          onClick={refreshNews}
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

      {/* Lista de Notícias */}
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {newsData.map((item, index) => (
          <article
            key={index}
            style={{
              padding: "1.5rem",
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              transition: "all 0.2s ease",
              cursor: "pointer",
              position: "relative"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8fafc";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            {/* Indicador de novidade */}
            <div style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              width: "8px",
              height: "8px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
              animation: "pulse 2s infinite"
            }}></div>

            {/* Imagem da notícia (se disponível) */}
            {item.imagem && (
              <div style={{
                width: "100%",
                height: "200px",
                backgroundColor: "#e2e8f0",
                borderRadius: "8px",
                marginBottom: "1rem",
                overflow: "hidden"
              }}>
                <img 
                  src={item.imagem} 
                  alt={item.titulo || 'Imagem da notícia'}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Título da notícia */}
            <h3 style={{
              margin: "0 0 1rem 0",
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#1e293b",
              lineHeight: "1.4",
              paddingRight: "1rem"
            }}>
              {item.titulo || 'Título não disponível'}
            </h3>

            {/* Conteúdo/Descrição */}
            {item.conteudo && (
              <p style={{
                margin: "0 0 1rem 0",
                fontSize: "0.875rem",
                color: "#4b5563",
                lineHeight: "1.5"
              }}>
                {truncateText(item.conteudo)}
              </p>
            )}

            {/* Metadados */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "1rem"
            }}>
              {/* Fonte */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem"
                }}>
                  📡
                </div>
                <span style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  backgroundColor: "#dbeafe",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "12px"
                }}>
                  {getSourceName(item.fonte)}
                </span>
              </div>

              {/* Autor */}
              {item.autor && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#8b5cf6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem"
                  }}>
                    ✍️
                  </div>
                  <span style={{
                    fontSize: "0.875rem",
                    color: "#374151",
                    backgroundColor: "#ede9fe",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px"
                  }}>
                    {item.autor}
                  </span>
                </div>
              )}

              {/* Data */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#64748b",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem"
                }}>
                  📅
                </div>
                <span style={{
                  fontSize: "0.875rem",
                  color: "#64748b",
                  backgroundColor: "#f1f5f9",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "12px"
                }}>
                  {formatDate(item.publicado)}
                </span>
              </div>
            </div>

            {/* Linha decorativa */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "3px",
              background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
              borderRadius: "0 0 12px 12px"
            }}></div>
          </article>
        ))}
      </div>

      {/* Footer com estatísticas */}
      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        textAlign: "center"
      }}>
        <p style={{
          margin: 0,
          fontSize: "0.875rem",
          color: "#64748b"
        }}>
          📊 Total de {newsData.length} {newsData.length === 1 ? 'notícia carregada' : 'notícias carregadas'} • 
          Última atualização: {new Date().toLocaleTimeString('pt-BR')}
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default News;