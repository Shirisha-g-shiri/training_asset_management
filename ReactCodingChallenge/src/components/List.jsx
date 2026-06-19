import { useEffect, useState } from "react";
import { getAll } from "../store/action/listAction";
import { useDispatch, useSelector } from "react-redux";

function List() {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);

    const { list } = useSelector(state => state.list);

    useEffect(() => {
        dispatch(getAll(currentPage + 1));
    }, [currentPage, dispatch]);

    return (
        <div>
            <h1>List with Pagination</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Species</th>
                        <th>Origin</th>
                        <th>Location</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        list?.results?.map((i, index) => (
                            <tr key={index}>
                                <td>{index + 1 + currentPage * 20}</td>
                                <td>{i.name}</td>
                                <td>{i.status}</td>
                                <td>{i.species}</td>
                                <td>{i.origin.name}</td>
                                <td>{i.location.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <nav>
                <ul className="pagination justify-content-center">

                    <li className="page-item">
                        <button
                            className="page-link"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>

                    {
                        Array.from({ length: list?.info?.pages || 0 })
                            .map((_, index) => (
                                <li className="page-item" key={index}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(index)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))
                    }

                    <li className="page-item">
                        <button
                            className="page-link"
                            disabled={
                                currentPage === (list?.info?.pages - 1)
                            }
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>

                </ul>
            </nav>
        </div>
    );
}

export default List;