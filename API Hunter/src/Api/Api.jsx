

// export default Api;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Style.css';

function Api() {
  const [record, setRecord] = useState([]);
  const [title, setTitle] = useState('');
  const [filed, setFiled] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      let response = await axios.get("http://localhost:1000/posts");
      setRecord(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async () => {
    try {
      let id = record.length + 1
      let addData = await axios.post("http://localhost:1000/posts", { 
        id: id.toString(),
        title, 
        filed, 
        subject, 
        marks, 
        grade 
      });
      setRecord([...record, addData.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/posts/${id}`);
      setRecord(record.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async () => {
    if (selectedId !== null) {
      try {
        let updatedData = await axios.put(`http://localhost:1000/posts/${selectedId}`, { 
          title, 
          filed, 
          subject, 
          marks, 
          grade 
        });
        setRecord(record.map(item => item.id === selectedId ? updatedData.data : item));
        resetForm();
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedId(item.id);
    setTitle(item.title);
    setFiled(item.filed);
    setSubject(item.subject);
    setMarks(item.marks);
    setGrade(item.grade);
  };

  const resetForm = () => {
    setSelectedId(null);
    setTitle('');
    setFiled('');
    setSubject('');
    setMarks('');
    setGrade('');
  };

  return (
    <div>
      <center><h1>Students Marks</h1></center>
      <hr />
      <div className="c-1">
        <div className="c-11">
          <input
            type="text"
            placeholder="Student Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Student Field"
            value={filed}
            onChange={(e) => setFiled(e.target.value)}
          />
          <input
            type="text"
            placeholder="Student Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
          <input
            type="text"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <button onClick={selectedId ? handleUpdate : handleAdd}>
            {selectedId ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
      <div className="row a-1">
        <div className="b">
          <div className="c">
            {record.length > 0 ? (
              <table className="record-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Field</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Grade</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {record.map((e, i) => (
                    <tr key={i}>
                      <td>{e.id}</td>
                      <td>{e.title}</td>
                      <td>{e.filed}</td>
                      <td>{e.subject}</td>
                      <td>{e.marks}</td>
                      <td>{e.grade}</td>
                      <td>
                        <button onClick={() => handleEdit(e)}>Edit</button>
                        <button onClick={() => handleDelete(e.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Api;
