import React, { useEffect, useState } from "react";
import "./App.css";

import { MdDeleteForever } from "react-icons/md";

export default function App() {
  const [curBal, setCurBal] = useState(0.0);
  const [curExp, setCurExp] = useState(0.0);
  const [curInc, setCurInc] = useState(0.0);
  const [history, setHistory] = useState([]); // { desc: string, amt: ± number }
  const [transType, setTransType] = useState("exp");

  // method 1
  // const [inputDesc, setInputDesc] = useState("");
  // const [inputAmt, setInputAmt] = useState(0);
  //method 2
  const [input, setInput] = useState({ desc: "", amt: 0 });

  // const a = {x: 0, y:"abc"}
  // a.x == a["x"] --- will give you true
  // a.y == a["y"] --- will give you true

  useEffect(() => {
    var inLocal = localStorage.getItem("history");
    if (inLocal != null) {
      setHistory(JSON.parse(inLocal));
    }
  }, []);

  useEffect(() => {
    let tempCB = 0;
    let tempCE = 0;
    let tempCI = 0;
    history.forEach((elem) => {
      tempCB += elem.amt;
      if (elem.amt < 0) {
        tempCE += elem.amt;
      } else {
        tempCI += elem.amt;
      }
    });
    setCurBal(tempCB);
    setCurExp(tempCE * -1);
    setCurInc(tempCI);
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  function removeFromHistory(index) {
    var tempHistory = history;
    var newHistory = [];
    tempHistory.forEach((element, oldIndex) => {
      if (oldIndex !== index) {
        newHistory.push(element);
      }
    });
    setHistory(newHistory);
  }

  function onChange(str) {
    var xyz = document.querySelectorAll("form .btn-chg button");
    // for(int i=0;i<xyz.length();i++)
    xyz.forEach((e) => {
      //e is xyz[i]
      e.classList.remove("changer");
      if (e.classList.contains(str)) {
        e.classList.add("changer");
      }
    });
    setTransType(str);
  }

  return (
    <div id="home">
      <h1>Expense Tracker</h1>
      <div className="expense">
        <span>YOUR BALANCE</span>
        <h2>₹ {curBal}</h2>
      </div>
      <div className="trans-box">
        <div style={{ textAlign: "center", width: "48%" }}>
          <span>INCOME</span>
          <p>₹ {curInc}</p>
        </div>
        <div className="v-rule"></div>
        <div style={{ textAlign: "center", width: "48%" }}>
          <span>EXPENSE</span>
          <p>₹ {curExp}</p>
        </div>
      </div>
      <div className="history">
        <h3>History</h3>
        {history.map((oneTrans, index) => {
          return (
            <div className={oneTrans.amt < 0 ? "neg" : "pos"} key={index}>
              <button
                onClick={() => {
                  removeFromHistory(index);
                }}
              >
                <MdDeleteForever />
              </button>
              <span>{oneTrans.desc}</span>
              <span>{oneTrans.amt}</span>
            </div>
          );
        })}
      </div>
      <div className="trans">
        <h3>Add new Transactions</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            var amount = input.amt * (transType === "exp" ? -1 : 1);
            setHistory([...history, { amt: amount, desc: input.desc }]);
            e.target.reset();
          }}
        >
          <label htmlFor="form_desc">Descripton</label>
          <input
            required={true}
            type="text"
            id="form_desc"
            placeholder="Enter Description"
            onChange={(e) => {
              // setInputDesc(e.target.value);
              setInput({ ...input, desc: e.target.value });
            }}
          />
          <label htmlFor="amt">Amount</label>
          <input
            required={true}
            type="number"
            min={1}
            id="amt"
            placeholder="Enter Amount"
            onChange={(a) => {
              // setInputAmt(parseInt(a.target.value));
              setInput({ ...input, amt: parseInt(a.target.value) });
            }}
          />
          <div className="btn-chg">
            <button
              className="inc"
              onClick={(e) => {
                e.preventDefault();
                onChange("inc");
              }}
            >
              Income
            </button>
            <button
              className="exp changer"
              onClick={(e) => {
                e.preventDefault();
                onChange("exp");
              }}
            >
              Expense
            </button>
          </div>
          <small>Green or Red is the selected one</small>
          <button type="submit" disabled={input.desc == ""}>
            Add transaction
          </button>
        </form>
      </div>
    </div>
  );
}
// import React, { useEffect, useState } from "react";

// export default function App() {
//   const [curBal, cngCurBal] = useState(0.0);
//   const [curInc, cngCurInc] = useState(0.0);
//   const [curExp, cngCurExp] = useState(0.0);
//   const [inp, cngInput] = useState({ desc: "", amt: 0 });
//   const [history, cngHistory] = useState([]);
//   const [trans, cngTransTyp] = useState("exp");

//   useEffect(() => {
//     console.log("this is hist", history);
//   }, [history]);
//   function onChange(str) {
//     var xyz = document.querySelectorAll("form .btn-chg button");
//     xyz.forEach((e) => {
//       e.classList.remove("changer");
//       if (e.classList.contains(str)) {
//         e.classList.add("changer");
//       }
//     });
//     cngTransTyp(str);
//   }

//   return (
//     <div id="home">
//       <h1>Expense Tracker</h1>
//       <div>
//         <span>YOUR BALANCE</span>
//         <h2>₹ {curBal}</h2>
//       </div>
//       <div className="trans-box">
//         <div>
//           <span>INCOME</span>
//           <p>₹ {curInc}</p>
//         </div>
//         <div></div>
//         <div>
//           <span>EXPENSE</span>
//           <p>₹ {curExp}</p>
//         </div>
//       </div>
//       <div className="history">
//         <h3>History</h3>
//       </div>
//       <div className="trans">
//         <h3>Add new Transactions</h3>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             // if (trans == "exp") {
//             //   cngInput({ ...inp, amt: inp.amt * -1 });
//             // }
//             // if (trans == "inc") {
//             //   cngInput({ ...inp, amt: inp.amt * 1 });
//             // }
//             // cngHistory([...history, inp]);
//             cngHistory([
//               ...history,
//               { ...inp, amt: inp.amt * (trans == "exp" ? -1 : 1) },
//             ]);

//             e.target.reset();
//           }}
//         >
//           <label htmlFor="form-desc">Description</label>
//           <input
//             required={true}
//             type="text"
//             id="form-desc"
//             placeholder="Description"
//             onChange={(e) => {
//               cngInput({ ...inp, desc: e.target.value });
//             }}
//           />
//           <label htmlFor="amt">Amount</label>
//           <input
//             type="number"
//             min={1}
//             id="amt"
//             placeholder=" Enter Amount"
//             onChange={(e) => {
//               cngInput({ ...inp, amt: parseInt(e.target.value) });
//             }}
//           />
//           <div className="btn-chg">
//             <button
//               className="inc"
//               onClick={(e) => {
//                 e.preventDefault();
//                 onChange("inc");
//               }}
//             >
//               Income
//             </button>
//             <button
//               className="exp changer"
//               onClick={(e) => {
//                 e.preventDefault();
//                 onChange("exp");
//               }}
//             >
//               Expense
//             </button>
//           </div>
//           <small>Green or Red is the Selected one</small>
//           <button type="submit">Add transaction</button>
//         </form>
//       </div>
//     </div>
//   );
// }
