import "./AdminDash.css"

const AdminDash = () => {
    return (
        <div className="AdminDash-Main">
            <h1>Welcome back, Admin!</h1>

            <div className="AdminDash-Cards flex gap05">
                <div className="AdminDash-Card flex col">
                    <h2>Faculty</h2>
                    <div className="flex">
                        <h3>24</h3>
                        <p>Faculties</p>
                    </div>
                </div>
                <div className="AdminDash-Card flex col">
                    <h2>Institutes</h2>
                    <div className="flex">
                        <h3>5</h3>
                        <p>Institutes Registered</p>
                    </div>
                </div>
                <div className="AdminDash-Card flex col">
                    <h2>Courses</h2>
                    <div className="flex">
                        <h3>31</h3>
                        <p>Courses in total</p>
                    </div>
                </div>
                <div className="AdminDash-Card flex col">
                    <h2>Documents</h2>
                    <div className="flex">
                        <h3>78</h3>
                        <p>PDFs uploaded</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDash