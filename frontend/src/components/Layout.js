function Layout({ children, participants }) {
  return (
    <div className="layout">

      <div className="sidebar">
        <h2>Participants</h2>
        <ul>
          {participants.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>

      <div className="main-area">
        {children}
      </div>

    </div>
  );
}

export default Layout;