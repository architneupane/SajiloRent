import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Docs from "../components/Docs";
import Navbar from "../components/Navbar";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "./Helper";

function Home() {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);

  const [data, setdata] = useState([]);
  const [title, setTitle] = useState("");
  const [setError] = useState("");

  const navigate = useNavigate();

  const createDocs = () => {
    if (title === "") {
      setError("Please enter title");
    } else {
      fetch(api_base_url + "/createDocs", {
        mode: "cors",
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          docName: title,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data); // Check what data looks like
          if (data.success) {
            setIsCreateModelShow(false);
            navigate(`/createDocs/${data.docId}`);
          } else {
            setError(data.message);
          }
        });
  
    }
  };

  const getData = () => {
    fetch(`${api_base_url}/getAllDocs`,{
      mode: 'cors',
      method: 'post',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      })
    })
    .then((res)=>res.json())
    .then((data=>{
      setdata(data.docs)
    }))
  }

  useEffect(()=>{
    getData();
  },[])


  

  return (
    <div className="w-full h-screen bg-zinc-800 text-white">
      <Navbar />
      {/* All documents and create button */}
      <div className="flex justify-between px-28 py-10">
        {/* text all documents */}
        <h1 className="text-5xl">All Documents</h1>
        {/* create new document button */}
        <button
          className="text-base bg-blue-600 w-[250px] rounded-md flex items-center justify-center"
          // on click of Create new document button it sets isCreateModelShow true which shows title box
          onClick={() => {
            setIsCreateModelShow(true);
            // it directly gives user to type in tile box without click on title box
            setTimeout(() => {
              const titleInput = document.getElementById('title');
              if (titleInput) {
                titleInput.focus();
              } else {
                console.error('Title input not found');
              }
            }, 0);
          }}
        >
          {" "}
          <span className="mr-2">
            {" "}
            <FaPlus />{" "}
          </span>{" "}
          Create New Document
        </button>
      </div>

      {/* all documents */}
      <div>
  {
    data ? data.map((el, index) => {
      return (
        <Docs key={el.id || index} docs={el} id={`doc-${index + 1}`} />
      );
    }) : ""
  }
</div>



      {/* ternary operator that do, if isCreateModelShow true then show title box if false then nothing  */}
      {isCreateModelShow ? (
        <>
          {/* main background transparent div */}
          <div className=" fixed top-0 left-0 right-0 bottom-0 bg-zinc-800/60 w-screen h-screen flex items-center justify-center ">
            {/* div containing all content */}
            <div className="w-[500px] h-[220px] bg-zinc-900 rounded-[20px] px-[30px] py-[30px]">
              <h3 className="text-2xl">Create New Document</h3>
              <p className="text-sm mt-2">Enter a title</p>
              {/* div containing title box */}
              <div className="flex items-center bg-zinc-950 pr-10 border-solid border-gray-600 border rounded-md pl-2 mb-4 ">
                <i>
                  <FaSearch />
                </i>
                <input
                  // gets the data typed in title box
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  className="h-9 w-[350px] bg-transparent outline-none pl-2 "
                  type="text"
                  placeholder="Enter a title here"
                  name="title"
                  id="title"
                />
              </div>

              {/* containing create and cancel buttons */}
              <div className="flex ">
                <button
                  className="text-base bg-blue-600 w-1/2  h-9 rounded-md flex items-center justify-center "
                  // it triggers api createDoc above
                  onClick={createDocs}
                >
                  {" "}
                  <span className="mr-2">
                    {" "}
                    <FaPlus />{" "}
                  </span>{" "}
                  Create New Document
                </button>
                <button
                  className="w-1/2 bg-black ml-2 rounded-md "
                  // on click of cancel it set creaetmodelshow false which closes the titlebox
                  onClick={() => setIsCreateModelShow(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}


    </div>
  );
}

export default Home;
