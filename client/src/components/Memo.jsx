import { useState, useEffect } from "react";
import "./Memo.css";
const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
      //console.log(memos)
    };
    contract && memosMessage();
  }, [contract]);
  return (
    <div className="container-fluid">
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>Messages</h3>
      <table>
        <tr>
          <td
            style={{
              backgroundColor: "dodgerblue",
              border: "1px solid white",
              borderCollapse: "collapse",
              padding: "7px",
              width: "100px",
              color: "white",
            }}
          >
            Name
          </td>
          <td
            style={{
              backgroundColor: "dodgerblue",
              border: "1px solid white",
              borderCollapse: "collapse",
              padding: "7px",
              width: "800px",
              color: "white",
            }}
          >
            Date and Time
          </td>
          <td
            style={{
              backgroundColor: "dodgerblue",
              border: "1px solid white",
              borderCollapse: "collapse",
              padding: "7px",
              width: "300px",
              color: "white",
            }}
          >
            Message
          </td>
          <td
            className="container-fluid"
            style={{
              backgroundColor: "dodgerblue",
              border: "1px solid white",
              borderCollapse: "collapse",
              padding: "7px",
              width: "400px",
              color: "white",
            }}
          >
            Address
          </td>
        </tr>
        <tbody>
          {memos.map((memo) => {
            return (
              <tr>
                <td
                  style={{
                    backgroundColor: "dodgerblue",
                    border: "1px solid white",
                    borderCollapse: "collapse",
                    padding: "7px",
                    width: "100px",
                    color: "white",
                  }}
                >
                  {memo.name}
                </td>
                <td
                  style={{
                    backgroundColor: "dodgerblue",
                    border: "1px solid white",
                    borderCollapse: "collapse",
                    padding: "7px",
                    width: "800px",
                    color: "white",
                  }}
                >
                  {new Date(memo.timestamp * 1000).toLocaleString()}
                </td>
                <td
                  style={{
                    backgroundColor: "dodgerblue",
                    border: "1px solid white",
                    borderCollapse: "collapse",
                    padding: "7px",
                    width: "300px",
                    color: "white",
                  }}
                >
                  {memo.message}
                </td>
                <td
                  className="container-fluid"
                  style={{
                    backgroundColor: "dodgerblue",
                    border: "1px solid white",
                    borderCollapse: "collapse",
                    padding: "7px",
                    width: "400px",
                    color: "white",
                  }}
                >
                  {memo.from}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Memos;
