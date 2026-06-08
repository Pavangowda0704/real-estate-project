function Agents() {
  const agents = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Property Agent",
      location: "Whitefield, Bangalore",
      phone: "+91 98765 43210",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Mehta",
      role: "Real Estate Consultant",
      location: "Indiranagar, Bangalore",
      phone: "+91 87654 32109",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Arjun Reddy",
      role: "Builder",
      location: "Sarjapur Road, Bangalore",
      phone: "+91 76543 21098",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  return (
    <div className="section">
      <h2>Agents & Builders</h2>

      <div className="agent-grid">
        {agents.map((agent) => (
          <div className="agent-card" key={agent.id}>
            <img src={agent.image} alt={agent.name} />

            <h3>{agent.name}</h3>
            <p>{agent.role}</p>
            <p>{agent.location}</p>
            <p>{agent.phone}</p>

            <button>Contact Agent</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agents;