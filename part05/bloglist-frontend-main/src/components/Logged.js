const Logged = (props) => (
    <>
        <p>{props.user} logged in</p>
        <button
            id='logout-button'
            onClick={props.handleLogout}>
                logout
        </button>
    </>
)

export default Logged