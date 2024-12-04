import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import axios from 'axios'

const Git = () => {
    const [repo, setRepo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //git 레포지토리 가져오기
    const getRepos = async ()=> {
        setLoading(true);
        setError(null);
        try{
            const res = await axios.get("https://api.github.com/users/parkminjung-als/repos");
            console.dir(res.data);
            setRepo(res.data);
        }catch(err){
            setError("에러가 발생했습니다.");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getRepos();
    }, []);
  return (
    <Container>
        <Row>
            <Col>
            <ul>
            {repo.map((r)=> (
                <li key={r.id}>
                    <a href={r.html_url} target="_blank">
                        {r.name}
                    </a>
                </li>
            ))}
            </ul>
            </Col>
        </Row>
    </Container>
  )
}

export default Git