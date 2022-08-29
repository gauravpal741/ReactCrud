import React, { useEffect, useState } from 'react'

export const Form2 = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/;
    const getdata = () => {
        let data1 = localStorage.getItem("data");
        if (data1) {
            return JSON.parse(localStorage.getItem("data"))
        }
        else {
            return [];
        }
    }
    const [inputvalue, setInputvalue] = useState({
        name: "",
        eid: ""
    })

    const [flag, setFlag] = useState(false)
    const [store, setStore] = useState()
    const [inputdata, setInputdata] = useState(getdata())
    const inputhandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputvalue({ ...inputvalue, [name]: value })
    }


    const formhandler = (event) => {
        event.preventDefault();
        if(inputvalue.name == ""){
            alert("please enter name")
        }
        else if(inputvalue.eid == ""){
            alert("please enter email")
        }
        else if(!regEx.test(inputvalue.eid)){
            alert("please enter valid email")
        }
        else{
            setInputdata([...inputdata, { ...inputvalue }])
            setInputvalue({
                name: "",
                eid: ""
            })
        }
       
    }
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(inputdata))
    }, [inputdata])

    const deletedata = (id) => {
        let newarray = inputdata.filter((items, index) => {
            return id != index;
        })
        setInputdata(newarray)
    }


    const editdata = (id) => {
        setFlag(true)
        setStore(id);
        let editdata = inputdata.filter((items, index) => {
            return id == index
        })
        setInputvalue(editdata[0])
    }

    const updatedata = () => {
        setFlag(false)
        console.log(inputvalue);
        inputdata[store] = inputvalue;
        localStorage.setItem("data", JSON.stringify(inputdata))
        setInputdata(getdata())
        setInputvalue({
            name: "",
            eid: ""
        })
    }
    return (
        <>
            <div className="container">
                <div class="form-group">
                    <label for="Name">Name:</label>
                    <input id='Name' type="text" className='form-control' name="name" value={inputvalue.name} onChange={inputhandler} />
                </div>

                <div class="form-group">
                    <label for="eid">Email :</label>
                    <input id='eid' type="text" className='form-control' name="eid" value={inputvalue.eid} onChange={inputhandler} />
                </div>
                {flag == false ? <button className='btn btn-info' onClick={formhandler} >submit</button> :
                    <button className='btn btn-danger' onClick={() => {
                        updatedata()
                    }}>update</button>
                }

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                        <tbody>
                    {
                        inputdata.map((items, index) => {
                            return (
                                        <tr key={index}>
                                            <th> {items.name}</th>
                                            <th>{items.eid}</th>
                                            <th>
                                           <button className='btn btn-danger' onClick={() => {
                                            deletedata(index)
                                        }}> delete </button>
                                            </th>
                                        <th> <button className='btn btn-primary' onClick={() => {
                                            editdata(index)
                                        }}>edit</button> </th>
                                        </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}
