import React from 'react'

const AmountPop = () => {
    const [data, setData] = useState([]);
    const [auto_slider, setAuto_slider] = useState({
      id: "",
      text: "",
      image: null,
    });
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      axios
        .get("http://localhost:4000/auto_slider")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log("Get Data", error);
        });
    };
  
    const navigate = useNavigate();
    
    const saveProduct = () => {
      const formData = new FormData();
      formData.append("id", auto_slider.id);
      formData.append("text", auto_slider.text);
      formData.append("image", auto_slider.image);
    
      axios
        .post("http://localhost:4000/auto_slider", formData)
        .then((response) => {
          if (response.status === 200) {
            fetchData();
            setAuto_slider({ text: "", image: null });
            navigate("/dashboard");
          } else {
            console.log("Error:", response.data); 
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };
  
    return (
      <>
        <div className=" main">
          <button
            type="button"
            className="product_btn_add"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add New
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form method="post" action="#">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 text-dark"
                    id="exampleModalLabel"
                  >
                    ADD PRODUCT
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {" "}
                      Id:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter id..."
                      value={auto_slider.id}
                      onChange={(e) =>
                        setAuto_slider({ ...auto_slider, id: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {" "}
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name..."
                      value={auto_slider.text}
                      onChange={(e) =>
                        setAuto_slider({ ...auto_slider, text: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {" "}
                      Middle Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Middle Name..."
                      value={auto_slider.text}
                      onChange={(e) =>
                        setAuto_slider({ ...auto_slider, text: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {" "}
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Last Name..."
                      value={auto_slider.text}
                      onChange={(e) =>
                        setAuto_slider({ ...auto_slider, text: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {" "}
                      Mobile Number:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Mobile Number..."
                      value={auto_slider.text}
                      onChange={(e) =>
                        setAuto_slider({ ...auto_slider, text: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {" "}
                      Joining Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Joining Date..."
                      value={auto_slider.text}
                      onChange={(e) =>
                        setAuto_slider({ ...auto_slider, text: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveProduct}
                  >
                    Save{" "}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
}

export default AmountPop
